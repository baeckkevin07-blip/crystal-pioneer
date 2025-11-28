import ConsentForm from "@/components/consent-form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getConsent(token: string) {
    return await prisma.consent.findUnique({
        where: { token },
        include: {
            campaign: true,
            pharmacy: true
        }
    })
}

export default async function ConsentPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params
    const consent = await getConsent(token)

    if (!consent) {
        notFound()
    }

    // We pass translations to the client component via props or use them here
    // For now, let's keep the server component simple and handle translations inside ConsentForm if needed
    // or pass translated strings as props.

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#1C3656] p-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">iDklic</h1>
                    <p className="text-[#43B2B3] font-medium">{consent.campaign.name}</p>
                </div>

                <div className="p-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Bonjour {consent.pharmacy.name}
                        </h2>
                        <p className="text-gray-600">
                            {consent.campaign.description || "Nous souhaitons vous envoyer du matériel promotionnel pour cette campagne."}
                        </p>
                    </div>

                    <ConsentForm
                        token={token}
                        initialStatus={consent.status}
                        initialComment={consent.comment}
                    />
                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
                    Campagne: {new Date(consent.campaign.month).toLocaleDateString()} • ID: {consent.id.slice(0, 8)}
                </div>
            </div>
        </div>
    )
}
