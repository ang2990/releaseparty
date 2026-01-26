import type { LayoutServerLoad } from './$types';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';

export const load: LayoutServerLoad = async ({ platform }) => {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable configuration missing');
        return { tickerData: [] };
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?maxRecords=100&view=viwZwgmbZkeoHjbWG`;
    let response;

    try {
        // Try to get from Cloudflare Cache first
        if (platform && platform.caches) {
            const cache = platform.caches.default;
            const cacheKey = new Request(url); // Cache key must be a Request object
            const cachedResponse = await cache.match(cacheKey);
            
            if (cachedResponse) {
                response = cachedResponse;
            }
        }

        // If not in cache, fetch from Airtable
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
                // We must clone the response before reading it, but here we can just clone for the cache put
                // Re-construct response to add Cache-Control header for Cloudflare to respect
                const responseToCache = new Response(response.clone().body, response);
                responseToCache.headers.set('Cache-Control', 's-maxage=60');
                
                // Use waitUntil to not block the response
                platform.context.waitUntil(cache.put(cacheKey, responseToCache));
            }
        }
        
        if (!response.ok) {
            console.error(`Failed to fetch ticker data: ${response.statusText}`);
            return { tickerData: [] };
        }

        const data = await response.json();
        const records = data.records || [];

        // Map Airtable records
        const attendees = records.map((record: any) => {
            const f = record.fields;
            
            // Robust field mapping
            const getF = (keys: string[]) => {
                for (const k of keys) {
                    if (f[k] !== undefined) return f[k];
                }
                return null;
            };

            const name = getF(['Name', 'name', 'Artist Name', 'Name / artist name', 'Artist']) || 'Unknown';
            const role = (getF(['Role', 'role', 'Type', 'Participation Type']) || 'LISTENER').toString().toUpperCase();
            const streams = (getF(['Streams', 'streams', 'Count', 'Pledge', '2025 total streams (estimate)']) || '---').toString();

            return { name, role, streams };
        });

        // Return the latest 20 entries for the ticker
        return {
            tickerData: attendees.slice(0, 20)
        };

    } catch (err) {
        console.error('Error loading ticker data:', err);
        return {
            tickerData: []
        };
    }
};
