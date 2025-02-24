/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'

/**
 * Delete the following ability to start from
 * scratch
 */

export const storeSubscribe = Bouncer.ability((user: User) => {
  return user.role === '1'
})
export const updateSubscribe = Bouncer.ability((user: User) => {
  return user.role === '1'
})
