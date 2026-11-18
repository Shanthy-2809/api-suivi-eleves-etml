/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  students: {
    index: typeof routes['students.index']
    store: typeof routes['students.store']
    show: typeof routes['students.show']
    update: typeof routes['students.update']
    destroy: typeof routes['students.destroy']
    comments: {
      index: typeof routes['students.comments.index']
      store: typeof routes['students.comments.store']
      show: typeof routes['students.comments.show']
      update: typeof routes['students.comments.update']
      destroy: typeof routes['students.comments.destroy']
    }
  }
  teachers: {
    index: typeof routes['teachers.index']
    store: typeof routes['teachers.store']
    show: typeof routes['teachers.show']
    update: typeof routes['teachers.update']
    destroy: typeof routes['teachers.destroy']
  }
  classGroups: {
    index: typeof routes['class_groups.index']
    store: typeof routes['class_groups.store']
    show: typeof routes['class_groups.show']
    update: typeof routes['class_groups.update']
    destroy: typeof routes['class_groups.destroy']
  }
}
