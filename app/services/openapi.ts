import swagger from '#config/swagger'

type Endpoint = Record<string, unknown>
const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` })
const bearer = [{ BearerAuth: [] }]
const idParam = { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
const studentParam = { name: 'student_id', in: 'path', required: true, schema: { type: 'integer' } }
const response = (description: string) => ({ description })
const item = (tag: string, model: string, summary: string, params: object[] = []) => ({
  tags: [tag], summary, parameters: params,
  responses: { '200': response(`${model} retourné`), '404': response('Introuvable'), '401': response('Token requis') },
  security: bearer,
})
const body = (schema: string) => ({
  required: true,
  content: { 'application/json': { schema: ref(schema) } },
})

/** Swagger / OpenAPI is served at /swagger, Swagger UI at /docs.
 *  Explicit schemas avoid relying on the obsolete AdonisJS 6 autoswagger parser.
 */
export function openApiDocument() {
  const paths: Record<string, Record<string, Endpoint>> = {}
  for (const [route, tag, model] of [
    ['/api/students', 'Students', 'Student'],
    ['/api/teachers', 'Teachers', 'Teacher'],
    ['/api/classGroups', 'ClassGroups', 'ClassGroup'],
  ]) {
    paths[route] = {
      get: item(tag, model, `Lister les ${tag.toLowerCase()}`),
      post: { ...item(tag, model, `Créer ${model}`), requestBody: body(model),
        responses: { '201': response('Création réussie'), '422': response('Validation échouée'), '401': response('Token requis') } },
    }
    paths[`${route}/{id}`] = {
      get: item(tag, model, `Afficher ${model}`, [idParam]),
      put: { ...item(tag, model, `Modifier ${model}`, [idParam]), requestBody: body(model),
        responses: { '200': response('Mis à jour'), '404': response('Introuvable'), '422': response('Validation échouée') } },
      delete: { ...item(tag, model, `Supprimer ${model}`, [idParam]),
        responses: { '204': response('Supprimé'), '403': response('Accès interdit'), '404': response('Introuvable') } },
    }
  }
  paths['/api/students'].get = {
    ...paths['/api/students'].get,
    parameters: [
      { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
      { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 } },
      { name: 'sort', in: 'query', schema: { type: 'string', enum: ['name', 'firstname', 'created_at'] } },
      { name: 'order', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] } },
      { name: 'search', in: 'query', schema: { type: 'string' } },
      { name: 'classGroupId', in: 'query', schema: { type: 'integer' } },
    ],
  }
  paths['/api/students/{student_id}/comments'] = {
    get: item('Comments', 'Comment', 'Commentaires de cet élève', [studentParam]),
    post: { ...item('Comments', 'Comment', 'Ajouter un commentaire', [studentParam]), requestBody: body('CommentInput'),
      responses: { '201': response('Commentaire créé'), '401': response('Token requis'), '403': response('Accès refusé') } },
  }
  paths['/api/students/{student_id}/comments/{id}'] = {
    get: item('Comments', 'Comment', 'Afficher un commentaire', [studentParam, idParam]),
    put: { ...item('Comments', 'Comment', 'Modifier son commentaire', [studentParam, idParam]), requestBody: body('CommentInput'),
      responses: { '200': response('Modifié'), '403': response('Commentaire appartenant à un autre enseignant') } },
    delete: { ...item('Comments', 'Comment', 'Supprimer son commentaire', [studentParam, idParam]),
      responses: { '204': response('Supprimé'), '403': response('Commentaire appartenant à un autre enseignant') } },
  }
  const loginInput = { type: 'object', required: ['email', 'password'], properties: {
    email: { type: 'string', format: 'email' }, password: { type: 'string', format: 'password' },
  } }
  const signupInput = { type: 'object', required: ['email', 'password', 'passwordConfirmation'], properties: {
    fullName: { type: 'string', nullable: true }, email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }, passwordConfirmation: { type: 'string' },
  } }
  for (const prefix of ['/api/v1/auth', '/api/user']) {
    paths[`${prefix}/${prefix.endsWith('/auth') ? 'signup' : 'register'}`] = {
      post: { tags: ['Authentication'], summary: 'Créer un compte enseignant', requestBody: {
        required: true, content: { 'application/json': { schema: signupInput } } },
        responses: { '200': response('Compte créé et token émis'), '422': response('Validation échouée') } },
    }
    paths[`${prefix}/login`] = {
      post: { tags: ['Authentication'], summary: 'Se connecter', requestBody: {
        required: true, content: { 'application/json': { schema: loginInput } } },
        responses: { '200': response('Token OAT délivré'), '400': response('Identifiants invalides') } },
    }
  }
  paths['/api/user/logout'] = { post: { tags: ['Authentication'], summary: 'Déconnexion', security: bearer,
    responses: { '200': response('Token supprimé'), '401': response('Token requis') } } }
  paths['/api/v1/account/profile'] = { get: { tags: ['Authentication'], summary: 'Profil utilisateur', security: bearer,
    responses: { '200': response('Profil'), '401': response('Token requis') } } }
  paths['/api/v1/account/logout'] = { post: { tags: ['Authentication'], summary: 'Déconnexion', security: bearer,
    responses: { '200': response('Token supprimé'), '401': response('Token requis') } } }
  paths['/test'] = { get: { tags: ['Utility'], summary: 'Test de disponibilité / CORS', responses: { '200': response('API is working!') } } }
  return {
    openapi: '3.0.3',
    info: { title: swagger.title, version: swagger.version, description: swagger.description },
    servers: [{ url: 'http://localhost:3333' }],
    tags: ['Authentication', 'Students', 'Teachers', 'ClassGroups', 'Comments', 'Utility'].map((name) => ({ name })),
    paths,
    components: {
      securitySchemes: { BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'OAT' } },
      schemas: {
        Student: { type: 'object', required: ['name', 'firstname'], properties: {
          id: { type: 'integer', readOnly: true }, name: { type: 'string', minLength: 2 }, firstname: { type: 'string', minLength: 2 }, classGroupId: { type: 'integer', nullable: true },
        } },
        Teacher: { type: 'object', required: ['name', 'firstname', 'email', 'userId'], properties: {
          id: { type: 'integer', readOnly: true }, name: { type: 'string' }, firstname: { type: 'string' },
          email: { type: 'string', format: 'email' }, userId: { type: 'integer' },
        } },
        ClassGroup: { type: 'object', required: ['name'], properties: {
          id: { type: 'integer', readOnly: true }, name: { type: 'string' }, teacherId: { type: 'integer', nullable: true },
        } },
        Comment: { type: 'object', properties: { id: { type: 'integer' }, content: { type: 'string' }, studentId: { type: 'integer' }, teacherId: { type: 'integer', nullable: true } } },
        CommentInput: { type: 'object', required: ['content'], properties: { content: { type: 'string', minLength: 2 } } },
      },
    },
  }
}
