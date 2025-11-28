import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            consents: {
                include: { pharmacy: true }
            }
        }
    })

    if (!campaign) {
        return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    // Generate CSV
    const headers = ['Pharmacie', 'Email', 'Téléphone', 'Ville', 'Statut', 'Répondu le', 'Commentaire']
    const rows = campaign.consents.map(c => [
        c.pharmacy.name,
        c.pharmacy.email,
        c.pharmacy.phone || '',
        c.pharmacy.address || '',
        c.status,
        c.respondedAt ? new Date(c.respondedAt).toLocaleDateString('fr-FR') : '',
        c.comment || ''
    ])

    const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${campaign.name.replace(/[^a-z0-9]/gi, '_')}.csv"`
        }
    })
}
