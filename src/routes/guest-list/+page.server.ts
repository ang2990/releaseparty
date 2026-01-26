import type { PageServerLoad } from './$types';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';

export const load: PageServerLoad = async ({ setHeaders, platform }) => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable configuration missing');
        return { attendees: [], totalListenerValue: 0 };
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?maxRecords=1000`;
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

        let totalListenerValue = 0;

        const attendees = records.map((record: any, index: number) => {
            const f = record.fields;
            
            // Robust field mapping helper
            const getF = (keys: string[]) => {
                for (const k of keys) {
                    if (f[k] !== undefined) return f[k];
                }
                return null;
            };

            // Airtable returns some fields as arrays (Select/Link fields)
            const unpack = (val: any) => Array.isArray(val) ? val[0] : val;

            const name = getF(['NAME', 'Name', 'name', 'Artist Name']) || 'Unknown';
            const role = (unpack(getF(['ROLE', 'Role', 'role', 'Type'])) || 'LISTENER').toString().toUpperCase();
            
            // Handle streams
            const rawStreams = getF(['STREAMS', 'Streams', 'streams', 'Count']);
            let streamsStr = '---';

            if (typeof rawStreams === 'number') {
                streamsStr = rawStreams.toLocaleString();
            } else if (rawStreams) {
                streamsStr = rawStreams.toString();
            }

            const subscriptionRaw = getF(['SUBSCRIPTION', 'Subscription', 'subscription', 'Plan']);
            const subscriptionStr = (unpack(subscriptionRaw) || 'Unknown Plan').toString();
            const monthlyAmountVal = parseFloat(getF(['MONTHLY AMOUNT', 'Monthly Amount', 'monthly_amount', 'Amount']) || 0);

            let formattedDisplay = streamsStr;
            
            // Format logic based on role
            if (role === 'LISTENER') {
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

        return {
            attendees: attendees.reverse(), // Newest first
            totalListenerValue
        };
    } catch (err) {
        console.error('Error loading guest list:', err);
        return {
            attendees: [],
            error: 'Could not sync with the registry.'
        };
    }
};
