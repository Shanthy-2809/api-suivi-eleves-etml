# Suivi des élèves — étapes 12 à 16

Ce projet contient le travail demandé : authentification OAT, relation User–Teacher, rôles, Bouncer, pagination/tri/filtrage, CORS et documentation Swagger/OpenAPI.

## Installation (Node.js 24 ou supérieur, MySQL démarré)

1. Créez votre `.env` en copiant `.env.example`. Renseignez les variables `DB_*` définies dans `start/env.ts` et une nouvelle `APP_KEY` (commande `node ace generate:key` après installation).
2. `npm install` — **obligatoire** après décompression, pour installer notamment `@adonisjs/bouncer` et actualiser `package-lock.json` (l'environnement de préparation n'avait pas accès au registre npm).
3. `node ace migration:run` — ajoute les colonnes `users.role` et `teachers.user_id` via la migration `7_...`. Ne supprime pas les données existantes.
4. Optionnel en environnement local : `node ace db:seed` pour créer les enseignants et les autres fixtures (attention : les seeders des classes/élèves/commentaires existants ne sont pas tous idempotents). **Ne jamais lancer `migration:fresh --seed` sur une base que vous souhaitez conserver.**
5. `npm run dev` puis vérifier `http://localhost:3333/test` et `http://localhost:3333/docs`.

## Endpoints

- `POST /api/v1/auth/signup` et `POST /api/v1/auth/login` : inscription et connexion existantes du starter.
- `GET /api/v1/account/profile` et `POST /api/v1/account/logout` : profil et déconnexion authentifiés.
- Alias des consignes du Step16 : `POST /api/user/register`, `POST /api/user/login`, `POST /api/user/logout`.
- CRUD authentifiés : `/api/students`, `/api/teachers`, `/api/classGroups`, `/api/students/:student_id/comments`.
- `GET /api/students?page=1&limit=10&sort=name&order=asc&search=dup&classGroupId=1` : pagination, tri, recherche et filtre.
- `GET /swagger` : définition OpenAPI JSON ; `GET /docs` : interface Swagger UI, assets CDN nécessitant une connexion Internet du navigateur.
- `GET /test` : route non protégée pour les tests CORS (`examples/cors-test.html`).

Dans Bruno : pour toutes les routes métier, ajoutez `Authorization: Bearer <token>` (champ `data.token` de la réponse login). Les nouveaux endpoints sont préfixés par `/api` contrairement aux premières étapes.

## Comptes de démonstration

Le seeder enseignant crée quatre comptes fictifs `.example.test` (voir `database/seeders/1_teacher_seeder.ts`), avec un mot de passe de démonstration `0123456789` ou celui de `SEED_TEACHER_PASSWORD`. Ne pas utiliser ces mots de passe en production. Aucun compte administrateur n'est créé automatiquement. Pour tester le rôle admin, créez un compte normal puis mettez `role='admin'` directement en base de développement.

## Conformité et adaptations techniques

- Les PDF ciblent AdonisJS 6, mais le ZIP de départ utilise **AdonisJS 7**. Bouncer v4 est prévu pour AdonisJS 7.
- Le package `adonis-autoswagger` cité au Step16 est destiné à AdonisJS 6 et son dépôt est archivé. Pour éviter de casser AdonisJS 7, le projet fournit une définition OpenAPI 3 explicite (`app/services/openapi.ts`) et la même interface `/swagger` + `/docs`, plutôt que ce package non adapté. Le document ne se met donc pas à jour automatiquement lors de modifications de routes.
- `database/schema.ts` est généré : les ajouts de `role` et `userId` sont fournis comme snapshot dans le ZIP. La commande `migration:run` synchronise le fichier avec votre base locale.
- Les tests réseau et de base MySQL n'ont pas pu être exécutés dans l'environnement de préparation : il faut les lancer sur votre machine.
