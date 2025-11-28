'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteCampaign(id: string) {
    try {
        // Delete all consents associated with this campaign first
        await prisma.consent.deleteMany({
            where: { campaignId: id }
        })

        // Then delete the campaign
        await prisma.campaign.delete({
            where: { id }
        })

        revalidatePath('/admin/campaigns')
        return { success: true }
    } catch (error) {
        console.error('Erreur suppression campagne:', error)
        return { error: 'Une erreur est survenue lors de la suppression' }
    }
}
