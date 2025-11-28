import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#1C3656]">Politique de Confidentialité</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-blue max-w-none text-gray-600">
                        <p className="text-sm text-gray-400">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

                        <h3>1. Collecte des données</h3>
                        <p>
                            Dans le cadre de nos campagnes de sensibilisation, nous collectons les informations suivantes concernant les pharmacies partenaires :
                        </p>
                        <ul>
                            <li>Nom de la pharmacie</li>
                            <li>Adresse email professionnelle</li>
                            <li>Adresse postale (pour l'envoi des kits)</li>
                            <li>Historique des participations aux campagnes</li>
                        </ul>

                        <h3>2. Utilisation des données</h3>
                        <p>
                            Ces données sont utilisées exclusivement pour :
                        </p>
                        <ul>
                            <li>Vous proposer de participer à nos campagnes de santé publique.</li>
                            <li>Vous envoyer le matériel promotionnel (kits) si vous acceptez.</li>
                            <li>Gérer le suivi logistique.</li>
                        </ul>

                        <h3>3. Protection des données</h3>
                        <p>
                            Vos données sont stockées de manière sécurisée sur des serveurs situés en Europe.
                            Elles ne sont jamais vendues à des tiers. Seules les équipes logistiques d'iDklic y ont accès.
                        </p>

                        <h3>4. Vos droits (RGPD)</h3>
                        <p>
                            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                            Pour exercer ce droit, contactez-nous à : <strong>privacy@idklic.com</strong>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
