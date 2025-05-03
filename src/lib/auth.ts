import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (
                    credentials?.email === "user@example.com" &&
                    credentials?.password === "password123"
                ) {
                    return {
                        id: "1",
                        email: "user@example.com",
                        name: "Test User"
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
        error: "/auth/error"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as { id: string }).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as { id?: string }).id = token.id as string;

            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};

export async function getAuthSession() {
    return await getServerSession(authOptions);
}