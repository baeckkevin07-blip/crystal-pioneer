import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const rawData = `PHARMACIE DES ACACIAS 69400	2175696	33474687129	Arnaud LANTERNIER (arnolesacacias@yahoo.fr)
PHARMACIE DE L'AMBRE 69004	2035447	33478296291	Nathalie CANTENEUR (pharmaciedelambre@yahoo.fr)
PHARMACIE CHARLEMAGNE 69002	2177913	33478371003	Théo LEFEVRE (selarl.pharmacie.charlemagne@gmail.com)
PHARMACIE DE BELLEROCHE 69400	2034160	33474680667	(Galia SEKKAI (pharmacie.belleroche@perso.alliadis.net))
PHARMACIE DE CERCIE 69220	2175345	33474668899	Mail pharmacie (Aurélie FOILLARD (pharmacie.cercie@gmail.com))
PHARMACIE DES MARRONNIERS 69270	2257684	33478231023	(Christophe BOURINET (pharmaciedesmarronniers@perso.alliadis.net))
PHARMACIE DES ORFEVRES 01600	2002728	33474001245	Hervé LEUDET DE LA VALLÉE (pharmaciedesorfevres@gmail.com)
PHARMACIE DU JAYON 69520	2175717	33478734355	(Elise VIBERT (pharmacie.jayon@gmail.com))
PHARMACIE ROSSET 77470	2039038	699736590	(titulaire@pharmacierosset.fr)
PHARMACIE DE L'ESPLANADE 69570	2179622	33478661956	Mail pharmacie (pharmaciedeesplanade@yahoo.fr)
PHARMACIE JOURNE 69650	2176045	33478911416	(Florence JOURNÉ (pharmacie.journe@yahoo.fr))
PHARMACIE DE L EUROPE 71000	2181537	33385382486	(Caroline CHARDIGNY (selarleurope@gmail.com))
PHARMACIE DE SAINT GEORGES 38790	2116520	33474590221	(Marie-Pierre BERTOIA (pharmaciedesaintgeorges@gmail.com))
PHARMACIE DES OLLIERES 69290	2179507	33478570443	Agnès VERPILLAT (phieduvillage@gmail.com)
PHARMACIE DU VERNAY 69300	2175303	33478232367	(Thuc-Cam BOISSY (phieduvernay@gmail.com))
PHARMACIE CÔTÉ GOLF 69680	2262851	33478909470	Stéphanie KOCHOWSKI (pharmacotegolf@gmail.com)
PHARMACIE SAVIGNY 69400	2176904	33474683083	Barbara Noury (pharmaciedesavigny69400@gmail.com)
PHARMACIE PILLON 38780	2115218	33474580214	(Pierre PILLON (pharmacie.pillon@gmail.com))
PHARMACIE DE REYRIEUX 01600	2000409	33474000897	(Catherine MARMONIER (pharmaciedereyrieux@gmail.com))
PHARMACIE D'ARNAS 69400	2034679	33474620723	Mathieu PARET (pharmaciedarnas@wanadoo.fr)
PHARMACIE DES COLLONGES 69230	2176286	FALSE	Anne-Sophie REVILLET (pharmaciedescollonges@gmail.com)
PHARMACIE DES SPORTS 53600	2139621	33243017111	Christelle Lalaire (pharmaciedessports.evron@gmail.com)
PHARMACIE DE LA POSTE 45000	2023672	33238533982	Jean marc Franchi (pharmaciefranchi@wanadoo.fr)
PHARMACIE DE L'AQUARIUS 75019	2195576	33142022009	Demander Amira pour la partie régie et vitrine (ph.aquarius@wanadoo.fr)(phiechirico@hotmail.fr)
GRANDE PHARMACIE D'AUTEUIL 75016	2192947	33142880771	Alexandre DE COURVAL (grandepharmacieauteuil@gmail.com)
PHARMACIE DU 13E BANDAK 75013	2191236	33145828660	BANDAK Sofyen (pharmacie.bandak@gmail.com)
PHARMACIE DE L'HORLOGE 14800	2074952		 Roy Salet. pharmacie.horloge01@gmail.com  -  royt@hotmail.com
PHARMACIE FAURE - TAGUET 30129	2266018	33466200483	Patrice FAURE (pharmaciefauretaguet@gmail.com)
PHARMACIE DE LA CROIX ROUGE 66100	2248748	33468503950	Nicolas BORG (phiecroixrouge@offisecure.com)
PHARMACIE DU CYGNE 57780	2026264		Idris Issad (direction@pharma-cygne-rosselange.fr)
PHARMACIE DE LA GARE 94200	2236109	33146720199	Lamia BENMESSAOUD (pdlg94200@gmail.com)
PHARMACIE DU VILLAGE (EX PRINCIPAL) 83670	2211257	33494770037	Léon Blanchet (pharmaciebarjols@gmail.com)
PHARMACIE DE LA MALADRERIE 78300	2204700	33139650867	rnb@pharmaladrerie.fr
PHARMACIE DU CHENE MAILLARD 45770	2129901	33681809594 / 02 38 73 39 29	Christelle Mazeau (ph.chenemaillard@orange.fr)
PHARMACIE DE PAHIN 31170	2101163	33677192327	HERVE GUILLOT (admi.pahin@gmail.com)
PHARMACIE PRINCIPALE 89000	2046176	33386521970	(Sébastien MORISSET (pharmacie.principale.auxerre@gmail.com))
PHARMACIE SUD CANAL 78180	2205971	33130600015	(Sabine LECLERC (pharmaciesudcanal@wanadoo.fr))
PHARMACIE DES CEZEAUX 63000	2248549	33473915044	(Thomas BARRAUX (pharmaciedescezeaux@orange.fr))
PHARMACIE FLOURY (prignac et marcamps) 33710	2104782	33557683360	Gwendeline DUPUIS (pharmaciE.prignac@gmail.com)
PHARMACIE ROME BATIGNOLLES 75017	2193469	33186900930	(rudypartouche9@gmail.com)
PHARMACIE FLOTTE 72430	2036676	33243957023	Camille FLOTTE (camille.flotte@gmail.com)
GRANDE PHARMACIE DU TALABOT 30000	2014280	33466679942	(Gaultier CABANEL (pharmacietalabot@gmail.com))
PHARMACIE CLEMENCEAU 51100	2137336	33326852270	(Caroline HUREAUX (pharmacie.clemenceau.reims@gmail.com))
PHARMACIE CENTRALE BOUVRESSE 77570	2199921	33621930256	Vincent Bouvresse (vbouvresse@gmail.com)
PHARMACIE DES CHATILLONS 51100	2025051	33326860848	Vincent Bouvresse (vbouvresse@gmail.com)
PHARMACIE DE LA MAIRIE 35770	2111229	33299628996	(Ronan Bourdon (bourdon.ronan@gmail.com))
PHARMACIE SUDRE 13500	2258358	33442073098	Sudre Pierre (epp700@yahoo.fr)
PHARMACIE SAUTEL 17000	2078810	33546271077	Christophe HURTEAUD (pharmaciesautel@offisecure.com)
PHARMACIE DE L'ABBAYE 37320	2112898	33247434004	(pharmaciedelabbaye37@gmail.com)
PHARMACIE GOUDON 89210	2005509	33386561203	(Valerie Goudon (pharmaciegoudon@orange.fr))
PHARMACIE CENTRE DES MOURINOUX 92600	2000979	33147945940	(Emmanuel ZOK A MOUBEKE (zokgeorgesemmanuel@gmail.com))
GRANDE PHARMACIE DU MARCHE 95230	2240843	33139890270	(David KNAFO (david.knafo@hotmail.fr)
PHARMACIE DU SOLEIL 95140	2262233	33139850077	Teddy RASOANAIVO (teddy.rasoanaivo@outlook.fr)
PHARMACIE DE L’EGLISE 91460	2046951	33169010450	Guillaume Robert (pharmacieeglise91@gmail.com)
PHARMACIE DE LA BOISSIÈRE 78190 	2205201	33134828323	Edmond KAZE (pharmaciedelaboissiere@hotmail.com)
PHARMACIE RAMBUTEAU DES MUSEES 75003	2187350	33142720755	ALEXANDRE MYLLE adresse temporaire (pharmaciedesmusees.commande@gmail.com)
PHARMACIE DU FOIRAIL 64000	2168364	33559301110	(christophe.poueymidou6@orange.fr)
PHARMACIE ROBINSON 92290	2226347	33146608814	
PHARMACIE DE L'OCTROI 06230	2062769	33493017010	carlyne Polge (phieoctroi@gmail.com)
PHARMACIE LE FORESTIER 44140	2277559	33240066105	Service Comptabilité (phie.leforestier@orange.fr)
PHARMACIE DE NAINTRE 86530	2217348	33549902775	Mr Rousseau (titu.naintre@gmail.com)
PHARMACIE PARISIENNE 75007	2188375	33147058395	Philippe BRAS (lapharmacieparisienne7@gmail.com) (appeler cette aprem)
PHARMACIE CENTRALE MIRABEAU 75015	2053445	33145778523	Ariane Valizadeh (phcentralemirabeau@gmail.com)
PHARMACIE DU GEANT LVMC 13800	2005941	33442560604	Hervé Renucci (pharmaciedugeant@hotmail.fr)
PHARMACIE DU PONT DE PIERRE 47520	2271049	33553967119	Mélissa DEILHES (pharmaciepontdepierre@yahoo.com)
PHARMACIE DES TROIS GARES 95800	2241412	33134321115	odile  (odile@jtm.fr)
PHARMACIE NATIONALE 75013	2191000	33145833822	Zouari (pharmacienationale@gmail.com)
PHARMACIE TANGUY (PENMARCH) 29760	2285376	33298586180	(pharmaciedepenmarch@gmail.com)
PHARMACIE DU LION 57100	2013572	33382538665	Sébastien VILLAUME (pharmaciedulionthionville@gmail.com)
PHARMACIE SAINT NIEL 56300	2255975	33297255046	(direction@sanevoo-pharmacie.fr)
PHARMACIE DE PONTLIEUE 72100	2036854	33243842147	(Fatimé Mahamath (pharmacie.pontlieue@wanadoo.fr))
PHARMACIE KHIN 77860	2201579	33160041767	(Sam KHIN (pharmaciekhin@yahoo.fr))
PHARMACIE DE LA MAIRIE 93160	2232628	33143033130	(pharmaciedelamairie@hotmail.com)
PHARMACIE DE LA GARE DE SCEAUX 92330	2229395	663461132	Tarick LARID (ltarick@hotmail.fr)
PHARMACIE ITALIE SUD_TAN MENNETEAU 75013	2190960	33145821907	ravine.menneteau@gmail.com
PHARMACIE TOLBIAC 75013	2053199	33144241972	Thierry Trinh (npharmatolbiac@gmail.com)
PHARMACIE DAOUDI 02200	2057413	33323535589	Azeddine DAOUDI (yas.daoudi60@gmail.com) / pharmaciedaoudi@yahoo.fr
PHARMACIE MODERNE 78500a	2006326	33139140232	Maxime NOUCHI (maxime_nouchi@icloud.com)
PHARMACIE D'ATLANTIS 44800	2022485	33240922028	Mael mael.birien@gmail.com
PHARMACIE DE PARC LANN 56000	2256151	33297465454 - 33615757106 (juliette)	MICHELE ANGOGNA (pharmacie-meal@offisecure.com)
PHARMACIE LABBE DUTILLEUL 69008	2272985	33478376788	Virginie DUTILLEUL (pharmacield69@gmail.com)
PHARMACIE DU GARET 69400	2270401	33474681928	Vincent AMOUROUX (pharmaciedugaret@yahoo.fr)
PHARMACIE JEAN MACE 69007	2035227	33478724433	Lionel DUDOUIT (pharmacie.jmpro@gmail.com)
PHARMACIE DUQUESNE 69006	2264733	33478937096	(Françoise Simon (pharmacieduquesne@perso.alliadis.net))
PHARMACIE REPUBLIQUE 69100	2176946	33478935151	(Laurent GRIMAND (villeurbanne.republique@gmail.com))
PHARMACIE DE LA CROISEE 69220	2001176	33474661038	Cécile RENARD (contact@pharmaciedelacroisee.fr)
GRANDE PHARMACIE DU PROMENOIR 69400	2004470	476502564	Nathalie & Sylvie CAMUS & FLORES (phcievieuxbourg@perso.alliadis.net)
PHARMACIE DE RUY 38300	2020577	33474932235	(Lyse-Marie CARRON (lmc@pharmaciederuy.com))
PHARMACIE DE TREVOUX 01600	2003774	33474009691	Nicolas MARCHAND (pharmaciedetrevoux@gmail.com)
PHARMACIE DU VAL D AZERGUES 69380	2287698	33478437538	Marie-Pierre MANIN (marie.pierre.manin@free.fr)
PHARMACIE REGIONALE 69400	2278369	33474652255	(Judith POIGET (judithpoiget@perso.alliadis.net))
PHARMACIE DES PIERRES BLANCHES 69290	2034417	04 78 57 09 57	(Nicolas DELPON (pharmaciedespierresblanches@gmail.com))`

async function main() {
    console.log('Importing pharmacies...')

    const lines = rawData.split('\n').filter(line => line.trim() !== '')
    let count = 0
    let skipped = 0

    for (const line of lines) {
        // Extract email, phone, and name using regex patterns
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
        const emailMatch = line.match(emailRegex)
        const email = emailMatch ? emailMatch[0] : null

        if (!email) {
            console.log(`Skipping line (no email): ${line.substring(0, 50)}...`)
            skipped++
            continue
        }

        // Extract phone: look for sequence of digits, maybe starting with +33 or 33 or 0
        // The phones in the list look like "33474687129" or "04 78 57 09 57"
        const phoneRegex = /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}|33\d{9}/
        const phoneMatch = line.match(phoneRegex)
        const phone = phoneMatch ? phoneMatch[0] : null

        // Name is at the start. Let's take everything before the first digit-heavy column or just the first 30-40 chars?
        // Better: The name usually ends with a zipcode.
        // Regex for Name + Zip: ^(.*? \d{5})
        const nameZipRegex = /^(.*? \d{5}[a-zA-Z]?)/
        const nameMatch = line.match(nameZipRegex)
        let name = nameMatch ? nameMatch[1] : line.substring(0, 30) // Fallback

        // Clean up name
        name = name.trim()

        try {
            await prisma.pharmacy.upsert({
                where: { email: email },
                update: {
                    name: name,
                    phone: phone || undefined,
                },
                create: {
                    name: name,
                    email: email,
                    phone: phone,
                    address: name, // Using name+zip as address for now since we don't have full address
                    status: 'ACTIVE'
                }
            })
            count++
        } catch (e) {
            console.error(`Error importing ${email}:`, e)
            skipped++
        }
    }

    console.log(`Import finished. Imported/Updated: ${count}, Skipped: ${skipped}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
