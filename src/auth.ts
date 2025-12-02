import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const email = credentials.email as string
                const password = credentials.password as string

                try {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    })

                    if (!user) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        return { id: user.id, name: user.name, email: user.email }
                    }
                } catch (e) {
                    console.error("Auth error:", e);
                }

                return null
            },
        }),
    ],
})
