import GITHUB_API_KEY from "./auth.js"

const getReqPathName = (req) =>{
  const reqState = req[Reflect.ownKeys(req).find(key => key.toString() === "Symbol(state)")];
  return reqState.url.pathname
}

const getProjName = (pathname) =>{
  return pathname.substring(5)
}

export function GET(req) {
    console.log("--------------------\n")
    const REQ_PATH_NAME = getReqPathName(req)
    const PROJ_NAME = getProjName(REQ_PATH_NAME)

    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  }

