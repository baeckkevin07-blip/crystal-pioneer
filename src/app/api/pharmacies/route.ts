import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const pharmacies = await prisma.pharmacy.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(pharmacies)
    } catch (_error) {
        return NextResponse.json({ error: 'Error fetching pharmacies' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, address } = body

        const pharmacy = await prisma.pharmacy.create({
            data: {
                name,
                email,
                phone,
                address,
            },
        })
        return NextResponse.json(pharmacy)
    } catch (_error) {
        return NextResponse.json({ error: 'Error creating pharmacy' }, { status: 500 })
    }
}
