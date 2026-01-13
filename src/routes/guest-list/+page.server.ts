import type { PageServerLoad } from './$types';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw_pPYJ8TrIHLHLYGowUdeoOOGtB_ZfbOV7zMtaw-pCxIX6YLky4tN8JAuR3i3NYBKiMA/exec';

export const load: PageServerLoad = async ({ setHeaders }) => {
    try {
        const response = await fetch(ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch attendees: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('Guest list data is not an array:', data);
            return { attendees: [] };
        }

        // Implement 2 hour cache (7200 seconds)
        setHeaders({
            'Cache-Control': 'public, max-age=7200'
        });

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
            const role = getValue(['role', 'test_listener', 'type'], 'LISTENER');
            const streams = getValue(['streams', 'count', 'pledge'], '---');

            return {
                id: (index + 1).toString().padStart(3, '0'),
                name: name,
                role: role,
                streams: streams,
                isAccent: role.toUpperCase() === 'ARTIST'
            };
        });

        return {
            attendees: attendees.reverse() // Newest first
        };
    } catch (err) {
        console.error('Error loading guest list:', err);
        return {
            attendees: [],
            error: 'Could not sync with the registry.'
        };
    }
};
