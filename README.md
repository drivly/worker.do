# worker.do
Generate &amp; Bundle a Cloudflare Worker from any JavaScript Function

<https://worker.do/cube/x=5/x^3>

```javascript
// Generated at https://worker.do/cube/x=5/x^3

// import ctx from 'https://pkg.do/ctx.do@1.0.6'

export const api = {
  icon: '👌',
  name: 'worker.do',
  description: 'Generate a Cloudflare Worker from a Function',
  url: 'https://cube.worker.do/api',
  type: 'https://cube.apis.do/code',
  endpoints: {
    cube: 'https://cube.worker.do/:x',
  },
  site: 'https://cube.worker.do',
  login: 'https://cube.worker.do/login',
  signup: 'https://cube.worker.do/signup',
  subscribe: 'https://cube.worker.do/subscribe',
  repo: 'https://github.com/drivly/worker.do',
}

export default {
  fetch: async (req, ctx) => {
    // const { user, origin, requestId, method, body, time, pathname, pathSegments, pathOptions, url, query, search, hash } = await ctx.fetch(req).then(res => res.json())
    const { hostname, pathname, searchParams } = new URL(req.url)
    const [x = 5] = pathname.split('/')
    const func = ([object Object]) => x^3
    const results = await func(x,query)
    return new Response(JSON.stringify({api,args,query,results,user}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  }
}
```

<https://worker.do/unpkg.com/lodash.map>
