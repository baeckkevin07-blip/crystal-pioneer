import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { consents: true },
                },
            },
        })
        return NextResponse.json(campaigns)
    } catch (_error) {
        return NextResponse.json({ error: 'Error fetching campaigns' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, description, month } = body

        const campaign = await prisma.campaign.create({
            data: {
                name,
                description,
                month,
                status: 'DRAFT',
            },
        })
        return NextResponse.json(campaign)
    } catch (_error) {
        return NextResponse.json({ error: 'Error creating campaign' }, { status: 500 })
    }
}
