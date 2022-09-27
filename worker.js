export const api = {
  icon: '👌',
  name: 'worker.do',
  description: 'Generate a Cloudflare Worker from a Function',
  url: 'https://worker.do/api',
  type: 'https://apis.do/code',
  endpoints: {
    buildCode: 'https://worker.do/:code',
    buildFile: 'https://worker.do/:url',
  },
  site: 'https://worker.do',
  login: 'https://worker.do/login',
  signup: 'https://worker.do/signup',
  subscribe: 'https://worker.do/subscribe',
  repo: 'https://github.com/drivly/worker.do',
}

export default {
  fetch: async (req, env) => {
    const { user, origin, requestId, method, body, time, pathname, pathSegments, pathOptions, url, query, search, hash } = await env.CTX.fetch(req).then(res => res.json())
    if (pathname == '/api') return new Response(JSON.stringify({api,user}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
    return fetch('https://esb.denoflare.dev/https://' + pathname + search)
  },
}
