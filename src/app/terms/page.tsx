import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#1C3656]">Conditions Générales d'Utilisation</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-blue max-w-none text-gray-600">
                        <p className="text-sm text-gray-400">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

                        <h3>1. Objet</h3>
                        <p>
                            La plateforme Crystal Pioneer est un outil B2B destiné aux pharmacies partenaires d'iDklic pour la gestion des campagnes de sensibilisation.
                        </p>

                        <h3>2. Accès au service</h3>
                        <p>
                            L'accès à la plateforme est réservé aux pharmacies invitées. L'accès administrateur est strictement réservé au personnel autorisé d'iDklic.
                        </p>

                        <h3>3. Engagements</h3>
                        <p>
                            En acceptant une campagne, la pharmacie s'engage à :
                        </p>
                        <ul>
                            <li>Recevoir et installer le matériel promotionnel fourni.</li>
                            <li>Respecter les dates de la campagne.</li>
                        </ul>

                        <h3>4. Responsabilité</h3>
                        <p>
                            iDklic s'efforce d'assurer la disponibilité de la plateforme mais ne peut être tenu responsable en cas d'indisponibilité temporaire pour maintenance.
                        </p>

                        <h3>5. Contact</h3>
                        <p>
                            Pour toute question relative à ces conditions : <strong>support@idklic.com</strong>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
