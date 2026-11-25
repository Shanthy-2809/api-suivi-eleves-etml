import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import swagger from '#config/swagger'
import { openApiDocument } from '#services/openapi'

// Contrôleurs chargés à la demande ; compatibles avec AdonisJS 7 et la documentation.
const StudentsController = () => import('#controllers/students_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const ClassGroupsController = () => import('#controllers/class_groups_controller')
const CommentsController = () => import('#controllers/comments_controller')
const NewAccountController = () => import('#controllers/new_account_controller')
const AccessTokensController = () => import('#controllers/access_tokens_controller')
const ProfileController = () => import('#controllers/profile_controller')

router.get('test', async () => 'API is working!')

// Step 12: conserver les routes du starter pour compatibilité avec Bruno existant.
router.group(() => {
  router.group(() => {
    router.post('signup', [NewAccountController, 'store'])
    router.post('login', [AccessTokensController, 'store'])
  }).prefix('auth')
  router.group(() => {
    router.get('profile', [ProfileController, 'show'])
    router.post('logout', [AccessTokensController, 'destroy'])
  }).prefix('account').use(middleware.auth())
}).prefix('/api/v1')

// Alias d'authentification du Step 16.
router.group(() => {
  router.post('register', [NewAccountController, 'store'])
  router.post('login', [AccessTokensController, 'store'])
  router.post('logout', [AccessTokensController, 'destroy']).use(middleware.auth())
}).prefix('/api/user')

// Steps 12 et 16: toutes les ressources métier sont protégées par un token OAT.
router.group(() => {
  router.resource('students', StudentsController).apiOnly()
  router.resource('teachers', TeachersController).apiOnly()
  router.resource('classGroups', ClassGroupsController).apiOnly()
  router.group(() => {
    router.resource('comments', CommentsController).apiOnly()
  }).prefix('students/:student_id')
}).prefix('/api').use(middleware.auth())

// Step 16: OpenAPI 3 + Swagger UI, sans dépendre du parser AdonisJS 6 archivé.
router.get('/swagger', async ({ response }) => response.ok(openApiDocument()))
router.get('/docs', async ({ response }) => {
  response.type('html')
  // La documentation HTML se charge depuis CDN; la définition /swagger reste locale.
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${swagger.title}</title>
    <link rel="stylesheet" href="${swagger.swaggerUiUrl}swagger-ui.css" />
    </head><body><div id="swagger-ui"></div>
    <script src="${swagger.swaggerUiUrl}swagger-ui-bundle.js"></script>
    <script>SwaggerUIBundle({url:'/swagger',dom_id:'#swagger-ui',persistAuthorization:true,deepLinking:true})</script>
    </body></html>`
})
