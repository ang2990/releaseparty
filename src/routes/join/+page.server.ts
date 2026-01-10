import type { Actions } from './$types';

// TODO: Replace this with your deployed Google Apps Script Web App URL
// Tutorial: 
// 1. Create a Google Sheet.
// 2. Extensions > Apps Script.
// 3. Paste code to handle doPost(e) -> sheet.appendRow(...).
// 4. Deploy > New Deployment > Type: Web App > Who has access: Anyone.
// 5. Copy URL here.
const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwzlowHP4tlMl4A0e4y9wVfknzPPu65X6JArMOUxfT-MdQFPTrk5YgDsj-mRab19IAV6g/exec';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const link = data.get('link');
        const role = data.get('role');
        const streams = data.get('streams');

        const timestamp = new Date().toISOString();

        // payload for Google Sheets
        // Apps Script expects JSON usually if we write the script that way, 
        // or form-data. Simple JSON is easiest.
        const payload = {
            timestamp,
            role,
            name,
            email,
            link,
            streams
        };

        try {
            if (GOOGLE_SHEET_ENDPOINT.includes('REPLACE_ME')) {
                console.log('MOCK SUBMISSION (Endpoint not configured):', payload);
                // Simulate delay
                await new Promise(r => setTimeout(r, 1000));
                return { success: true, message: 'Mock submission successful. Configure Google Sheet URL.' };
            }

            const response = await fetch(GOOGLE_SHEET_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Or 'application/x-www-form-urlencoded' depending on script
                },
                body: JSON.stringify(payload) // Assuming the script handles JSON body
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Google Sheet Error:', response.status, response.statusText, errorText);
                return { success: false, error: 'Failed to record entry. Status: ' + response.status };
            }

            return { success: true };
        } catch (err) {
            console.error('Submission Error:', err);
            return { success: false, error: 'Connection failed.' };
        }
    }
} satisfies Actions;