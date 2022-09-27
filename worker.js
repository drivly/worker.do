export const api = {
  icon: '👌',
  name: 'worker.do',
  description: 'Generate a Cloudflare Worker from a Function',
  url: 'https://worker.do/api',
  type: 'https://apis.do/code',
  endpoints: {
    buildCode: 'https://worker.do/:name/:args/:code',
    buildFile: 'https://worker.do/:name/:args/:url',
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
    const [ name, args ] = pathSegments
    const isCode = decodeURI(pathSegments[2]).includes('=>')
    const code = decodeURI(pathSegments[2])
    const importUrl = `import func from '${url}'`
    const template = importUrl + `
import ctx from 'https://pkg.do/ctx.do@1.0.6'

export const api = {
  icon: '👌',
  name: 'worker.do',
  description: 'Generate a Cloudflare Worker from a Function',
  url: 'https://${name}.worker.do/api',
  type: 'https://${name}.apis.do/code',
  endpoints: {
    ${name}: 'https://${name}.worker.do/${args}',
  },
  site: 'https://${name}.worker.do',
  login: 'https://${name}.worker.do/login',
  signup: 'https://${name}.worker.do/signup',
  subscribe: 'https://${name}.worker.do/subscribe',
  repo: 'https://github.com/drivly/worker.do',
}

export default {
  fetch: async (req, ctx) => {
    const { user, origin, requestId, method, body, time, pathname, pathSegments, pathOptions, url, query, search, hash } = await ctx.fetch(req).then(res => res.json())
    const [args] = pathSegments
    const func = (${args}) => ${code}
    const results = await func([...args],query)
    return new Response(JSON.stringify({api,args,query,results,user}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  }
}
`
    return new Response(template, { headers: { 'content-type': 'application/javascript; charset=utf-8' }})
  },
}
