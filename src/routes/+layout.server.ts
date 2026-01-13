import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
    // TEMPORARY FIX: Return static empty array to stop 500 error
    return {
        tickerData: []
    };
};