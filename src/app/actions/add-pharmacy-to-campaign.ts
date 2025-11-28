'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { sendConsentEmail } from "@/lib/email"

export async function addPharmacyToCampaign(campaignId: string, pharmacyId: string) {
    try {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        // Get pharmacy and campaign info for email
        const pharmacy = await prisma.pharmacy.findUnique({ where: { id: pharmacyId } })
        const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } })

        if (!pharmacy || !campaign) {
            return { error: 'Pharmacie ou campagne non trouvée' }
        }

        await prisma.consent.create({
            data: {
                campaignId,
                pharmacyId,
                token,
                status: 'PENDING'
            }
        })

        // Send email
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        await sendConsentEmail({
            pharmacyName: pharmacy.name,
            pharmacyEmail: pharmacy.email,
            campaignName: campaign.name,
            campaignDescription: campaign.description || '',
            consentLink: `${baseUrl}/consent/${token}`
        })

        revalidatePath(`/admin/campaigns/${campaignId}`)
        return { success: true }
    } catch (error) {
        console.error('Erreur:', error)
        return { error: 'Cette pharmacie est déjà dans la campagne' }
    }
}
