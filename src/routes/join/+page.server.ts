import type { Actions } from './$types';

// TODO: Replace this with your deployed Google Apps Script Web App URL
// Tutorial: 
// 1. Create a Google Sheet.
// 2. Extensions > Apps Script.
// 3. Paste code to handle doPost(e) -> sheet.appendRow(...).
// 4. Deploy > New Deployment > Type: Web App > Who has access: Anyone.
// 5. Copy URL here.
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26158398/uqzg29v/';

export const actions = {
    default: async ({ request }) => {
        // ... (data extraction) ...

        try {
            if (ZAPIER_WEBHOOK_URL.includes('REPLACE_ME')) {
                // ...
            }

            const response = await fetch(ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            // ...