
const root_route:any[] = []

const context = require.context("./",true, /routes.ts$/);

context.keys().forEach((path)=>{
    root_route.push(...require(`${path}`).default.routes)
})
export default root_route