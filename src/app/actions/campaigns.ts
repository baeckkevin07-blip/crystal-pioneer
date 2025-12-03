'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function sendConsentRequests(campaignId: string) {
    // 1. Get all active pharmacies
    const pharmacies = await prisma.pharmacy.findMany({
        where: { status: 'ACTIVE' }
    })

    // 2. Create consent records for each pharmacy if not exists
    let count = 0
    for (const pharmacy of pharmacies) {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        try {
            await prisma.consent.create({
                data: {
                    campaignId,
                    pharmacyId: pharmacy.id,
                    token,
                    status: 'PENDING'
                }
            })
            count++

            // Send actual email
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
            const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } })

            if (campaign) {
                const { sendConsentEmail } = await import('@/lib/email')
                await sendConsentEmail({
                    pharmacyName: pharmacy.name,
                    pharmacyEmail: pharmacy.email,
                    campaignName: campaign.name,
                    campaignDescription: campaign.description || '',
                    consentLink: `${baseUrl}/consent/${token}`
                })
            }
        } catch (_e) {
            // Ignore duplicates
        }
    }

    // 3. Update campaign status
    await prisma.campaign.update({
        where: { id: campaignId },
        data: { status: 'ACTIVE' }
    })


    revalidatePath(`/admin/campaigns/${campaignId}`)
    return { success: true, count }
}

export async function createCampaign(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const month = formData.get('month') as string

    if (!name || !month) {
        return { error: 'Nom et Mois sont requis' }
    }

    try {
        const campaign = await prisma.campaign.create({
            data: {
                name,
                description,
                month,
                status: 'DRAFT'
            }
        })

        revalidatePath('/admin/campaigns')
        return { success: true, id: campaign.id }
    } catch (_error) {
        return { error: 'Une erreur est survenue' }
    }
}

export async function sendBulkConsentRequests(campaignId: string, pharmacyIds: string[]) {
    if (pharmacyIds.length === 0) {
        return { success: false, error: 'Aucune pharmacie sélectionnée' }
    }

    let count = 0
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } })

    if (!campaign) {
        return { success: false, error: 'Campagne introuvable' }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    for (const pharmacyId of pharmacyIds) {
        const pharmacy = await prisma.pharmacy.findUnique({ where: { id: pharmacyId } })
        if (!pharmacy) continue

        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        try {
            await prisma.consent.create({
                data: {
                    campaignId,
                    pharmacyId: pharmacy.id,
                    token,
                    status: 'PENDING'
                }
            })
            count++

            // Send actual email
            const { sendConsentEmail } = await import('@/lib/email')
            await sendConsentEmail({
                pharmacyName: pharmacy.name,
                pharmacyEmail: pharmacy.email,
                campaignName: campaign.name,
                campaignDescription: campaign.description || '',
                consentLink: `${baseUrl}/consent/${token}`
            })
        } catch (_e) {
            // Ignore duplicates
        }
    }

    // Update campaign status if it was DRAFT
    if (campaign.status === 'DRAFT') {
        await prisma.campaign.update({
            where: { id: campaignId },
            data: { status: 'ACTIVE' }
        })
    }

    revalidatePath(`/admin/campaigns/${campaignId}`)
    return { success: true, count }
}
