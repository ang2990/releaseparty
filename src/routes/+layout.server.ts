import type { LayoutServerLoad } from './$types';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw_pPYJ8TrIHLHLYGowUdeoOOGtB_ZfbOV7zMtaw-pCxIX6YLky4tN8JAuR3i3NYBKiMA/exec';

export const load: LayoutServerLoad = async () => {
    try {
        const response = await fetch(ENDPOINT);
        
        if (!response.ok) {
            console.error(`Failed to fetch ticker data: ${response.statusText}`);
            return { tickerData: [] };
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('Ticker data is not an array:', data);
            return { tickerData: [] };
        }

        // robust extraction logic
        const attendees = data.map((row: any) => {
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

            return { name, role, streams };
        });

        // Return the latest 20 entries for the ticker
        return {
            tickerData: attendees.reverse().slice(0, 20)
        };

    } catch (err) {
        console.error('Error loading ticker data:', err);
        // Fallback to static data on error to keep the site looking alive
        return {
            tickerData: [
                { name: "RAY BULL", role: "ARTIST", streams: "12,450,000" },
                { name: "DIIV", role: "ARTIST", streams: "45,200,000" },
                { name: "MITSKI", role: "ARTIST", streams: "150,000,000" },
                { name: "BIG THIEF", role: "ARTIST", streams: "85,000,000" }
            ]
        };
    }
};
