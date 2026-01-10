import type { PageServerLoad } from './$types';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxip3F7oC0U2ytAbkEapfnyQIpwOKdm0V5KIEqDTfn2QuUntNGA65jHvT4yrBYHL8Q4mQ/exec';

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

        // Map the data to ensure keys match our component expectations
        // Google Sheets data often has headers as lowercase keys if mapped correctly
        const attendees = data.map((row: any, index: number) => ({
            id: (index + 1).toString().padStart(3, '0'),
            name: row.name || 'Unknown',
            role: row.role || 'LISTENER',
            streams: row.streams || '---',
            isAccent: row.role === 'ARTIST'
        }));

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
