import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { Bouncer } from '@adonisjs/bouncer'
import * as abilities from '#abilities/main'
import { policies } from '#generated/policies'

export default class InitializeBouncerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.bouncer = new Bouncer(
      () => ctx.auth.user || null,
      abilities,
      policies
    ).setContainerResolver(ctx.containerResolver)
    return next()
  }
}
