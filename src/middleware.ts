import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT
} from '@/routes'

const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = Boolean(auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) return

  // TODO fix bug with redirect double "auth"
  // check later if its fixed and remove
  if (isApiAuthRoute) {
    if (
      nextUrl.pathname === '/api/auth/auth/login' &&
      nextUrl.searchParams.get('error')
    ) {
      return Response.redirect(
        new URL(`/auth/error`, nextUrl.origin),
      );
    }

    return;
  }

  if (isAuthRoute && isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (isAuthRoute && !isLoggedIn) return

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(
      `/auth/login`,
      nextUrl
    ));
  }

  return;
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}