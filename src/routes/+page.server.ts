import type { PageServerLoad } from './$types';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxAO-MusSsH3uBM56KgRXRXvQIYlIHJ9kM9LEUnIDADyHvo88PP5f8jeOZX4RuF81YxPw/exec';

export const load: PageServerLoad = async ({ setHeaders }) => {
    try {
        const response = await fetch(ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch attendees: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('Home page data is not an array:', data);
            return { attendees: [] };
        }

        // Implement 2 hour cache (7200 seconds) - DISABLED FOR DEBUGGING
        setHeaders({
            'Cache-Control': 'public, max-age=0'
        });

        // Calculate total streams
        let totalStreams = 0;

        const attendees = data.map((row: any, index: number) => {
            // Robust extraction logic
            const getValue = (possibleKeys: string[], defaultValue: string) => {
                for (const key of possibleKeys) {
                    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
                        return row[key].toString();
                    }
                }
                const lowerKeys = Object.keys(row).map(k => k.toLowerCase());
                for (const search of possibleKeys) {
                    const foundKey = Object.keys(row).find(k => k.toLowerCase().includes(search.toLowerCase()));
                    if (foundKey && row[foundKey]) return row[foundKey].toString();
                }
                return defaultValue;
            };

            const name = getValue(['name', 'artist', 'gemini test'], 'Unknown');
            const role = getValue(['role', 'test_listener', 'type'], 'LISTENER').toUpperCase();
            const streamsStr = getValue(['streams', 'count', 'pledge'], '---');
            const subscriptionStr = getValue(['subscription', 'plan'], 'Unknown Plan');

            let formattedDisplay = streamsStr;

            // Add to total if artist
            if (role === 'ARTIST') {
                const count = parseInt(streamsStr.replace(/[^0-9]/g, '')) || 0;
                totalStreams += count;
            } else if (role === 'LISTENER') {
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
        return {
            attendees: attendees.reverse().slice(0, 8),
            totalStreams
        };
    } catch (err) {
        console.error('Error loading guest list for home:', err);
        return {
            attendees: []
        };
    }
};

