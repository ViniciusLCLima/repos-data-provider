
export function GET(req) {
    console.log("--------------------\n")
    console.log(typeOf(req));
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  }