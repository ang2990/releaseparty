import type { PageServerLoad } from './$types';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';

export const load: PageServerLoad = async ({ setHeaders, platform }) => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable configuration missing');
        return { attendees: [], totalStreams: 0, totalListenerValue: 0 };
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

        if (records.length > 0) {
            console.log('DEBUG: First record fields:', JSON.stringify(records[0].fields, null, 2));
        }

        // Implement cache
        setHeaders({
            'Cache-Control': 'public, max-age=60'
        });

        // Calculate total streams and revenue
        let totalStreams = 0;
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
            let streamsCount = 0;
            let streamsStr = '---';

            if (typeof rawStreams === 'number') {
                streamsCount = rawStreams;
                streamsStr = rawStreams.toLocaleString();
            } else if (rawStreams) {
                streamsStr = rawStreams.toString();
                streamsCount = parseInt(streamsStr.replace(/[^0-9]/g, '')) || 0;
            }

            const subscriptionRaw = getF(['SUBSCRIPTION', 'Subscription', 'subscription', 'Plan']);
            const subscriptionStr = (unpack(subscriptionRaw) || 'Unknown Plan').toString();
            const monthlyAmountVal = parseFloat(getF(['MONTHLY AMOUNT', 'Monthly Amount', 'monthly_amount', 'Amount']) || 0);

            let formattedDisplay = streamsStr;

            // Add to total if artist
            if (role === 'ARTIST') {
                totalStreams += streamsCount;
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
                streamsCount: streamsCount,
                isAccent: role === 'ARTIST'
            };
        });

        // Split into Artists and Listeners
        const artists = attendees
            .filter(a => a.role === 'ARTIST')
            .sort((a, b) => (b.streamsCount || 0) - (a.streamsCount || 0))
            .slice(0, 20);
        
        const listeners = attendees
            .filter(a => a.role === 'LISTENER')
            .sort(() => 0.5 - Math.random()) // Random shuffle
            .slice(0, 10);

        // Combine for the home page preview
        const previewAttendees = [...artists, ...listeners];

        return {
            attendees: previewAttendees,
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

