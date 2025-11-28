# Guide de Déploiement Vercel + PostgreSQL

## 1. Préparation de la Base de Données (Neon)

1. Allez sur [Neon.tech](https://neon.tech) et créez un compte.
2. Créez un nouveau projet (ex: `crystal-pioneer`).
3. Copiez la **Connection String** (elle ressemble à `postgres://user:pass@...`).

## 2. Déploiement sur Vercel

1. Poussez votre code sur GitHub.
2. Allez sur [Vercel.com](https://vercel.com) et importez votre projet GitHub.
3. Dans la configuration du projet ("Environment Variables"), ajoutez :

| Nom | Valeur |
| --- | --- |
| `DATABASE_URL` | La Connection String de Neon (copiée à l'étape 1) |
| `AUTH_SECRET` | Une longue chaîne aléatoire (ex: générée via `openssl rand -base64 32`) |
| `NEXT_PUBLIC_BASE_URL` | L'URL que Vercel vous donnera (ex: `https://crystal-pioneer.vercel.app`) |
| `RESEND_API_KEY` | Votre clé API Resend (si vous avez configuré les emails) |

4. Cliquez sur **Deploy**.

## 3. Initialisation de la Base de Données

Une fois le déploiement terminé (ou pendant le build), Vercel a besoin de créer les tables.
Allez dans l'onglet **Settings > General** de votre projet Vercel.
Dans **Build & Development Settings**, la commande de build doit être :
`prisma migrate deploy && next build`

Cela assurera que la base de données est toujours à jour lors de chaque déploiement.

## 4. Création de l'Admin

Pour créer le premier utilisateur admin en production, vous pouvez exécuter le script de seed depuis votre machine locale en vous connectant à la base de production :

1. Modifiez votre `.env` local pour mettre la `DATABASE_URL` de production (Neon).
2. Lancez : `npx ts-node prisma/seed.ts`
3. Remettez votre `.env` local comme avant si vous voulez retravailler en local.
