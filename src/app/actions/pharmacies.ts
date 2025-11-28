'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPharmacy(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string

    if (!name || !email) {
        throw new Error('Nom et Email sont requis')
    }

    try {
        await prisma.pharmacy.create({
            data: {
                name,
                email,
                phone,
                address,
                status: 'ACTIVE'
            }
        })
    } catch (error) {
        console.error('Failed to create pharmacy:', error)
        throw new Error('Une erreur est survenue (Email déjà utilisé ?)')
    }

    revalidatePath('/admin/pharmacies')
    redirect('/admin/pharmacies')
}

export async function updatePharmacy(id: string, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string | null
    const address = formData.get('address') as string | null
    const notes = formData.get('notes') as string | null

    try {
        await prisma.pharmacy.update({
            where: { id },
            data: { name, email, phone, address, notes }
        })

        revalidatePath('/admin/pharmacies')
        revalidatePath(`/admin/pharmacies/${id}`)
    } catch (error) {
        console.error('Failed to update pharmacy:', error)
        throw new Error('Failed to update pharmacy')
    }
}

export async function deletePharmacy(id: string) {
    try {
        // Check if pharmacy has consents
        const consentsCount = await prisma.consent.count({
            where: { pharmacyId: id }
        })

        if (consentsCount > 0) {
            return { error: 'Impossible de supprimer : cette pharmacie a des consentements associés' }
        }

        await prisma.pharmacy.delete({
            where: { id }
        })

        revalidatePath('/admin/pharmacies')
        return { success: true }
    } catch (_error) {
        return { error: 'Une erreur est survenue' }
    }
}
