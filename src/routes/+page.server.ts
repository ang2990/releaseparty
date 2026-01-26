import type { PageServerLoad } from './$types';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';

export const load: PageServerLoad = async ({ setHeaders, platform }) => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable configuration missing');
        return { attendees: [], totalStreams: 0, totalListenerValue: 0 };
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?maxRecords=1000&view=viwZwgmbZkeoHjbWG`;
    let response;

    try {
        // Try to get from Cloudflare Cache first
        if (platform && platform.caches) {
            const cache = platform.caches.default;
            const cacheKey = new Request(url);
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse) response = cachedResponse;
        }

        if (!response) {
            response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`
                }
            });

            // Cache the successful response for 60 seconds
            if (response.ok && platform && platform.caches) {
                const cache = platform.caches.default;
                const cacheKey = new Request(url);
                const responseToCache = new Response(response.clone().body, response);
                responseToCache.headers.set('Cache-Control', 's-maxage=60');
                platform.context.waitUntil(cache.put(cacheKey, responseToCache));
            }
        }
        
        if (!response.ok) {
            throw new Error(`Failed to fetch attendees: ${response.statusText}`);
        }

        const data = await response.json();
        const records = data.records || [];

        // Implement cache
        setHeaders({
            'Cache-Control': 'public, max-age=60'
        });

        // Calculate total streams and revenue
        let totalStreams = 0;
        let totalListenerValue = 0;

        const attendees = records.map((record: any, index: number) => {
            const f = record.fields;
            
            // Robust field mapping
            const getF = (keys: string[]) => {
                for (const k of keys) {
                    if (f[k] !== undefined) return f[k];
                }
                return null;
            };

            const name = getF(['Name', 'name', 'Artist Name']) || 'Unknown';
            const role = (getF(['Role', 'role', 'Type']) || 'LISTENER').toString().toUpperCase();
            const streamsStr = (getF(['Streams', 'streams', 'Count', 'Pledge']) || '---').toString();
            const subscriptionStr = (getF(['Subscription', 'subscription', 'Plan', 'Subscription Plan']) || 'Unknown Plan').toString();
            const monthlyAmountVal = parseFloat(getF(['Monthly Amount', 'monthly_amount', 'Amount', 'Cost']) || 0);

            let formattedDisplay = streamsStr;

            // Add to total if artist
            if (role === 'ARTIST') {
                const count = parseInt(streamsStr.replace(/[^0-9]/g, '')) || 0;
                totalStreams += count;
            } else if (role === 'LISTENER') {
                // Calculate revenue
                if (!isNaN(monthlyAmountVal)) {
                    totalListenerValue += monthlyAmountVal;
                }

                // Display: Use subscription plan name
                formattedDisplay = subscriptionStr !== 'Unknown Plan' ? subscriptionStr : streamsStr;
            }

            return {
                id: (index + 1).toString().padStart(3, '0'),
                name: name,
                role: role,
                streams: formattedDisplay,
                isAccent: role === 'ARTIST'
            };
        });

        // For the home page, maybe just return the first 5-8 latest entries
        // Since Airtable returns them in specific order, we might need to reverse or sort
        return {
            attendees: attendees.reverse().slice(0, 8),
            totalStreams,
            totalListenerValue
        };
    } catch (err) {
        console.error('Error loading guest list for home:', err);
        return {
            attendees: []
        };
    }
};

