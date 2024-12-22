export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  content: { documentDriven: true },
  devtools: { enabled: true },
  extends: ['@crearis/theme'],
  imports: { transform: { exclude: [/\/packages\/ui\//] } },
  modules: ['@nuxt/content', '@nuxt/image', 'nuxt-viewport'],
  routeRules: { '/': { prerender: true } },
  nitro: {
    plugins: ['plugins/content.ts'],
    prerender: {
      crawlLinks: true,
      routes: ['/blog/theaterpaedagogik-demokratie-10/', '/blog', '/agenda'],
      ignore: ['/api', '/details', '/cart'],
    },
  },
})
