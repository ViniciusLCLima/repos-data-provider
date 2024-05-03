import {authCode as GITHUB_API_KEY} from "./auth.js"
import { Octokit } from "@octokit/core"

const authObj = new Octokit ({
  auth: GITHUB_API_KEY
})

const MY_GIT_HUB_USERNAME = "ViniciusLCLima"
const MY_GIT_HUB_URL = `https://github.com/${MY_GIT_HUB_USERNAME}/`

const getProjLiveUrlAndDescr = async (projRepoName)=>{
  const response = await authObj.request(`GET /repos/${MY_GIT_HUB_USERNAME}/${projRepoName}`,{
  owner: MY_GIT_HUB_USERNAME,
  name: projRepoName,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
  console.log(typeof await response)
return {
      descr: response.data.description,
      liveUrl: response.data.homepage
  };
}

const getRepoName = (req) =>{
  const reqState = req[Reflect.ownKeys(req).find(key => key.toString() === "Symbol(state)")];
  return reqState.url.searchParams.get('repoName')
}

export function GET(req) {
    console.log("--------------------\n")
    const PROJ_REPO_NAME = getRepoName(req)
    console.log(PROJ_REPO_NAME)
    let projData
    getProjLiveUrlAndDescr(PROJ_REPO_NAME).then(x => console.log(x))
    return new Response(JSON.stringify(projData));
  }

