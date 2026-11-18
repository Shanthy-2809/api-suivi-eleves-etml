import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'students.index': { paramsTuple?: []; params?: {} }
    'students.store': { paramsTuple?: []; params?: {} }
    'students.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.comments.index': { paramsTuple: [ParamValue]; params: {'student_id': ParamValue} }
    'students.comments.store': { paramsTuple: [ParamValue]; params: {'student_id': ParamValue} }
    'students.comments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'students.comments.update': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'students.comments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'teachers.index': { paramsTuple?: []; params?: {} }
    'teachers.store': { paramsTuple?: []; params?: {} }
    'teachers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'teachers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'teachers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.index': { paramsTuple?: []; params?: {} }
    'class_groups.store': { paramsTuple?: []; params?: {} }
    'class_groups.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'students.index': { paramsTuple?: []; params?: {} }
    'students.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.comments.index': { paramsTuple: [ParamValue]; params: {'student_id': ParamValue} }
    'students.comments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'teachers.index': { paramsTuple?: []; params?: {} }
    'teachers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.index': { paramsTuple?: []; params?: {} }
    'class_groups.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'students.index': { paramsTuple?: []; params?: {} }
    'students.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.comments.index': { paramsTuple: [ParamValue]; params: {'student_id': ParamValue} }
    'students.comments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'teachers.index': { paramsTuple?: []; params?: {} }
    'teachers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.index': { paramsTuple?: []; params?: {} }
    'class_groups.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'students.store': { paramsTuple?: []; params?: {} }
    'students.comments.store': { paramsTuple: [ParamValue]; params: {'student_id': ParamValue} }
    'teachers.store': { paramsTuple?: []; params?: {} }
    'class_groups.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'students.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.comments.update': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'teachers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'students.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.comments.update': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'teachers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'students.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.comments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'student_id': ParamValue,'id': ParamValue} }
    'teachers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'class_groups.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}