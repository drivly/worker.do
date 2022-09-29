export default const = ({
  importUrl,
  
}) => importUrl + `
export const api = {
  icon: '👌',
  name: 'worker.do',
  description: 'Generate a Cloudflare Worker from a Function',
  url: 'https://${name}.worker.do/api',
  type: 'https://${name}.apis.do/code',
  endpoints: {
    ${name}: 'https://${name}.worker.do/${args.map(arg => ':' + arg.name).join('/')}',
  },
  site: 'https://${name}.worker.do',
  login: 'https://${name}.worker.do/login',
  signup: 'https://${name}.worker.do/signup',
  subscribe: 'https://${name}.worker.do/subscribe',
  repo: 'https://github.com/drivly/worker.do',
}
export default {
  fetch: async (req, ctx) => {
    // const { user, origin, requestId, method, body, time, pathname, pathSegments, pathOptions, url, query, search, hash } = await ctx.fetch(req).then(res => res.json())
    const { hostname, pathname, searchParams } = new URL(req.url)
    const [${args.map(arg => arg.name + ' = ' + arg.default).join(', ')}] = pathname.split('/')
    const func = (${args}) => ${code}
    const results = await func(${args.map(arg => arg.name).join(', ')},query)
    return new Response(JSON.stringify({api,args,query,results,user}, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  }
}
`
