/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/admin-one-vue-tailwind/'
    : '/'
}
