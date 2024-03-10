import NextAuth from "next-auth"

import authConfig from "@/auth.config"

const {auth} = NextAuth(authConfig)

export default auth((req) => {
const isLoggedIn = Boolean(req.auth)
console.log('++++', req.nextUrl.pathname, isLoggedIn)
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  }