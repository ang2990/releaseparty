import type { PageServerLoad } from './$types';

const ENDPOINT = 'https://hooks.zapier.com/hooks/catch/26158398/uqzg29v/';

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

        // Implement 2 hour cache (7200 seconds) - DISABLED FOR DEBUGGING
        setHeaders({
            'Cache-Control': 'public, max-age=0'
        });

        let totalListenerValue = 0;

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
            const monthlyAmountStr = getValue(['monthly_amount', 'monthly amount', 'cost'], '');

            let formattedDisplay = streamsStr;
            
            // Format logic based on role
            if (role === 'LISTENER') {
                // Calculation: Use monthly_amount
                let val = parseFloat(monthlyAmountStr);
                if (isNaN(val)) {
                    // Fallback to parsing streams string if monthly_amount is missing
                    val = parseFloat(streamsStr.replace(/[^0-9.]/g, ''));
                }

                if (!isNaN(val)) {
                    totalListenerValue += val;
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
