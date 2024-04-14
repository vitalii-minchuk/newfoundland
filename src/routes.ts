/**
 * The array of routes accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
    '/auth/new-verification'
]

/**
 * The array of routes that are used for authentication
 * These routes redirect user
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
]

/**
 * The prefix for API authentication routes
 * These routes are used for auth purposes
 * @type {string[]}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'