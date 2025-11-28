'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// --- TAGS ---

export async function createTag(name: string, color: string = "#43B2B3") {
    try {
        const tag = await prisma.tag.create({
            data: { name, color }
        })
        revalidatePath('/admin/pharmacies')
        return { success: true, tag }
    } catch (_error) {
        return { error: 'Erreur lors de la création du tag (existe peut-être déjà ?)' }
    }
}

export async function deleteTag(id: string) {
    try {
        await prisma.tag.delete({ where: { id } })
        revalidatePath('/admin/pharmacies')
        return { success: true }
    } catch (_error) {
        return { error: 'Erreur lors de la suppression du tag' }
    }
}

export async function assignTagToPharmacy(pharmacyId: string, tagId: string) {
    try {
        await prisma.pharmacy.update({
            where: { id: pharmacyId },
            data: {
                tags: {
                    connect: { id: tagId }
                }
            }
        })
        revalidatePath(`/admin/pharmacies/${pharmacyId}`)
        return { success: true }
    } catch (_error) {
        return { error: "Impossible d'assigner le tag" }
    }
}

export async function removeTagFromPharmacy(pharmacyId: string, tagId: string) {
    try {
        await prisma.pharmacy.update({
            where: { id: pharmacyId },
            data: {
                tags: {
                    disconnect: { id: tagId }
                }
            }
        })
        revalidatePath(`/admin/pharmacies/${pharmacyId}`)
        return { success: true }
    } catch (_error) {
        return { error: "Impossible de retirer le tag" }
    }
}

// --- NOTES ---

export async function updatePharmacyNotes(pharmacyId: string, notes: string) {
    try {
        await prisma.pharmacy.update({
            where: { id: pharmacyId },
            data: { notes }
        })
        revalidatePath(`/admin/pharmacies/${pharmacyId}`)
        return { success: true }
    } catch (_error) {
        return { error: "Erreur lors de la mise à jour des notes" }
    }
}
