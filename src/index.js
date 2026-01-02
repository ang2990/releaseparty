import indexHtml from '../index.html';

export default {
  fetch(request, env, ctx) {
    return new Response(indexHtml, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  },
};
