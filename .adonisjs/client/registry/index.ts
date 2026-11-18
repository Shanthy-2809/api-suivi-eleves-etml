/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"signup"]],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"login"]],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"profile"]],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"logout"]],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'students.index': {
    methods: ["GET","HEAD"],
    pattern: '/students',
    tokens: [[0,"students"]],
    types: placeholder as Registry['students.index']['types'],
  },
  'students.store': {
    methods: ["POST"],
    pattern: '/students',
    tokens: [[0,"students"]],
    types: placeholder as Registry['students.store']['types'],
  },
  'students.show': {
    methods: ["GET","HEAD"],
    pattern: '/students/:id',
    tokens: [[0,"students"],[1,"id"]],
    types: placeholder as Registry['students.show']['types'],
  },
  'students.update': {
    methods: ["PUT","PATCH"],
    pattern: '/students/:id',
    tokens: [[0,"students"],[1,"id"]],
    types: placeholder as Registry['students.update']['types'],
  },
  'students.destroy': {
    methods: ["DELETE"],
    pattern: '/students/:id',
    tokens: [[0,"students"],[1,"id"]],
    types: placeholder as Registry['students.destroy']['types'],
  },
  'students.comments.index': {
    methods: ["GET","HEAD"],
    pattern: '/students/:student_id/comments',
    tokens: [[0,"students"],[1,"student_id"],[0,"comments"]],
    types: placeholder as Registry['students.comments.index']['types'],
  },
  'students.comments.store': {
    methods: ["POST"],
    pattern: '/students/:student_id/comments',
    tokens: [[0,"students"],[1,"student_id"],[0,"comments"]],
    types: placeholder as Registry['students.comments.store']['types'],
  },
  'students.comments.show': {
    methods: ["GET","HEAD"],
    pattern: '/students/:student_id/comments/:id',
    tokens: [[0,"students"],[1,"student_id"],[0,"comments"],[1,"id"]],
    types: placeholder as Registry['students.comments.show']['types'],
  },
  'students.comments.update': {
    methods: ["PUT","PATCH"],
    pattern: '/students/:student_id/comments/:id',
    tokens: [[0,"students"],[1,"student_id"],[0,"comments"],[1,"id"]],
    types: placeholder as Registry['students.comments.update']['types'],
  },
  'students.comments.destroy': {
    methods: ["DELETE"],
    pattern: '/students/:student_id/comments/:id',
    tokens: [[0,"students"],[1,"student_id"],[0,"comments"],[1,"id"]],
    types: placeholder as Registry['students.comments.destroy']['types'],
  },
  'teachers.index': {
    methods: ["GET","HEAD"],
    pattern: '/teachers',
    tokens: [[0,"teachers"]],
    types: placeholder as Registry['teachers.index']['types'],
  },
  'teachers.store': {
    methods: ["POST"],
    pattern: '/teachers',
    tokens: [[0,"teachers"]],
    types: placeholder as Registry['teachers.store']['types'],
  },
  'teachers.show': {
    methods: ["GET","HEAD"],
    pattern: '/teachers/:id',
    tokens: [[0,"teachers"],[1,"id"]],
    types: placeholder as Registry['teachers.show']['types'],
  },
  'teachers.update': {
    methods: ["PUT","PATCH"],
    pattern: '/teachers/:id',
    tokens: [[0,"teachers"],[1,"id"]],
    types: placeholder as Registry['teachers.update']['types'],
  },
  'teachers.destroy': {
    methods: ["DELETE"],
    pattern: '/teachers/:id',
    tokens: [[0,"teachers"],[1,"id"]],
    types: placeholder as Registry['teachers.destroy']['types'],
  },
  'class_groups.index': {
    methods: ["GET","HEAD"],
    pattern: '/classGroups',
    tokens: [[0,"classGroups"]],
    types: placeholder as Registry['class_groups.index']['types'],
  },
  'class_groups.store': {
    methods: ["POST"],
    pattern: '/classGroups',
    tokens: [[0,"classGroups"]],
    types: placeholder as Registry['class_groups.store']['types'],
  },
  'class_groups.show': {
    methods: ["GET","HEAD"],
    pattern: '/classGroups/:id',
    tokens: [[0,"classGroups"],[1,"id"]],
    types: placeholder as Registry['class_groups.show']['types'],
  },
  'class_groups.update': {
    methods: ["PUT","PATCH"],
    pattern: '/classGroups/:id',
    tokens: [[0,"classGroups"],[1,"id"]],
    types: placeholder as Registry['class_groups.update']['types'],
  },
  'class_groups.destroy': {
    methods: ["DELETE"],
    pattern: '/classGroups/:id',
    tokens: [[0,"classGroups"],[1,"id"]],
    types: placeholder as Registry['class_groups.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
