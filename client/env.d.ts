/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    /** Public base URL of the site (used for sitemap, OG images, etc.) */
    readonly NEXT_PUBLIC_SITE_URL: string;
    /** Public API base URL — set to your backend root */
    readonly NEXT_PUBLIC_API_URL: string;
    /** Session cookie secret (used if implementing custom JWT) */
    readonly SESSION_SECRET?: string;
    /** NextAuth secret */
    readonly NEXTAUTH_SECRET?: string;
    readonly NEXTAUTH_URL?: string;
  }
}
