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
                console.error("DEBUG: Authorize called for:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.error("DEBUG: Missing credentials");
                    return null
                }

                const email = credentials.email as string
                const password = credentials.password as string

                try {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    })

                    if (!user) {
                        console.error("DEBUG: User not found in DB");
                        return null
                    }

                    console.error("DEBUG: User found:", user.email);

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        console.error("DEBUG: Password match success");
                        return { id: user.id, name: user.name, email: user.email }
                    } else {
                        console.error("DEBUG: Password match failed");
                    }
                } catch (e) {
                    console.error("DEBUG: Error in authorize:", e);
                }

                return null
            },
        }),
    ],
})
