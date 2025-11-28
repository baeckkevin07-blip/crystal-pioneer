'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitConsent(token: string, status: 'ACCEPTED' | 'DECLINED', comment?: string) {
    try {
        await prisma.consent.update({
            where: { token },
            data: {
                status,
                comment,
                respondedAt: new Date()
            }
        })
        revalidatePath(`/consent/${token}`)
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to submit consent' }
    }
}
