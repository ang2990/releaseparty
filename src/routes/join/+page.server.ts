import type { Actions } from './$types';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26158398/uqzg29v/';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        let name = data.get('name');
        const email = data.get('email');
        const link = data.get('link');
        const role = data.get('role');
        const streams = data.get('streams');
        const subscription = data.get('subscription');
        const anonymous = data.get('anonymous');

        if (anonymous && role === 'LISTENER') {
            name = 'Anonymous Listener';
        }

        // Calculate monthly amount based on subscription
        let monthlyAmount = 0;
        if (role === 'LISTENER' && subscription) {
            const prices: Record<string, number> = {
                'Premium Individual': 12.99,
                'Premium Duo': 18.99,
                'Premium Family': 21.99,
                'Premium Student': 6.99,
                'Free': 0
            };
            monthlyAmount = prices[subscription.toString()] || 0;
        }

        const timestamp = new Date().toISOString();
        // Generate a unique ID for this submission to help filter duplicates
        const submission_id = crypto.randomUUID();

        // payload for Zapier
        const payload = {
            submission_id,
            timestamp,
            role,
            name,
            email,
            link,
            streams,
            subscription,
            monthly_amount: monthlyAmount
        };

        try {
            const response = await fetch(ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Zapier Webhook Error:', response.status, response.statusText, errorText);
                return { success: false, error: 'Failed to record entry. Status: ' + response.status };
            }

            return { success: true };
        } catch (err) {
            console.error('Submission Error:', err);
            return { success: false, error: 'Connection failed.' };
        }
    }
} satisfies Actions;