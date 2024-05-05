import { Octokit } from "@octokit/core"

const GITHUB_API_KEY = process.env.GITHUB_API_KEY

const authObj = new Octokit ({
  auth: GITHUB_API_KEY
})

const MY_GIT_HUB_USERNAME = "ViniciusLCLima"
const MY_GIT_HUB_URL = `https://github.com/${MY_GIT_HUB_USERNAME}/`

const getRepoData = (repoName)=>{
  const response = authObj.request(`GET /repos/${MY_GIT_HUB_USERNAME}/${repoName}`,{
  owner: MY_GIT_HUB_USERNAME,
  repo: repoName,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
  return response;
}

const getRepoName = (req) =>{
  const reqState = req[Reflect.ownKeys(req).find(key => key.toString() === "Symbol(state)")];
  return reqState.url.searchParams.get('repoName')
}

export async function GET(req) {
    console.log("--------------------\n")
    const REPO_NAME = getRepoName(req)
    const gitAPIResponse = await getRepoData(REPO_NAME)
    return new Response(JSON.stringify(gitAPIResponse.data));
  }

