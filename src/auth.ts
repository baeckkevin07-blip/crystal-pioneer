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
                console.log("Authorize called for:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    return null
                }

                const email = credentials.email as string
                const password = credentials.password as string

                try {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    })

                    if (!user) {
                        console.log("User not found in DB");
                        return null
                    }

                    console.log("User found:", user.email);

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        console.log("Password match success");
                        return { id: user.id, name: user.name, email: user.email }
                    } else {
                        console.log("Password match failed");
                    }
                } catch (e) {
                    console.error("Error in authorize:", e);
                }

                return null
            },
        }),
    ],
})
