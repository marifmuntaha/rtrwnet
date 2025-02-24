/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const ChannelsController = () => import('#controllers/channels_controller')
const DevicesController = () => import('#controllers/devices_controller')
const ProductsController = () => import('#controllers/products_controller')
const SubscribesController = () => import('#controllers/subscribes_controller')
const TransactionsController = () => import('#controllers/transactions_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('reset-password', [AuthController, 'reset'])
        router.post('change-password', [AuthController, 'change'])
        router.post('logout', [AuthController, 'logout'])
      })
      .prefix('auth')
    router
      .group(() => {
        router.resource('subscribe', SubscribesController).apiOnly()
        router
          .group(() => {
            router.get('channel', [ChannelsController, 'index'])
            router.get('transaction', [TransactionsController, 'index'])
            router.post('transaction', [TransactionsController, 'store'])
          })
          .prefix('payment')
        router
          .group(() => {
            router.resource('device', DevicesController).apiOnly()
            router.resource('product', ProductsController).apiOnly()
            router.post('device/:id/connect', [DevicesController, 'connect'])
          })
          .prefix('member')
        router.resource('user', UsersController)
      })
      .use(middleware.auth())
  })
  .prefix('api')
