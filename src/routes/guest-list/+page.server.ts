import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
    return {
        attendees: []
    };
};
