import type { PageServerLoad } from './$types';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw_pPYJ8TrIHLHLYGowUdeoOOGtB_ZfbOV7zMtaw-pCxIX6YLky4tN8JAuR3i3NYBKiMA/exec';

export const load: PageServerLoad = async ({ setHeaders }) => {
    try {
        const response = await fetch(ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch attendees: ${response.statusText}`);
        }

        const data = await response.json();

        // Implement 2 hour cache (7200 seconds)
        setHeaders({
            'Cache-Control': 'public, max-age=7200'
        });

        const attendees = data.map((row: any, index: number) => ({
            id: (index + 1).toString().padStart(3, '0'),
            name: row.name || 'Unknown',
            role: row.role || 'LISTENER',
            streams: row.streams || '---',
            isAccent: row.role === 'ARTIST'
        }));

        // For the home page, maybe just return the first 5-8 latest entries
        return {
            attendees: attendees.reverse().slice(0, 8)
        };
    } catch (err) {
        console.error('Error loading guest list for home:', err);
        return {
            attendees: []
        };
    }
};
