import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
    // TEMPORARY SAFE MODE
    return {
        attendees: [
            { name: "Ray Bull", role: "ARTIST", streams: "12,450,000" },
            { name: "DIIV", role: "ARTIST", streams: "45,200,000" }
        ]
    };
};

