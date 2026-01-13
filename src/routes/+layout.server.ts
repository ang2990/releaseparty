import type { LayoutServerLoad } from './$types';

// TEMPORARY: Disable external fetch to resolve 500 error loop
export const load: LayoutServerLoad = async () => {
    return {
        tickerData: [
            { name: "RAY BULL", role: "ARTIST", streams: "12,450,000" },
            { name: "DIIV", role: "ARTIST", streams: "45,200,000" },
            { name: "MITSKI", role: "ARTIST", streams: "150,000,000" },
            { name: "BIG THIEF", role: "ARTIST", streams: "85,000,000" }
        ]
    };
};