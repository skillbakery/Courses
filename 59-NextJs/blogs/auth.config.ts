import NextAuth from "next-auth";
import type { NextAuthConfig } from 'next-auth';
import GithubProvider from "next-auth/providers/github";
export const authConfig = {
    pages: {
        signIn: '/auth/signin',
        signOut: '/'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
} satisfies NextAuthConfig;

export const { handlers,auth,signIn,signOut } = NextAuth(authConfig);