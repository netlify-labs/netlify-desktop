module.exports = {
	mode: 'spa',
	head: {title: 'netlify-desktop'}, // Headers of the page
	globalName: 'netlify',
	loading: false, // Disable default loading bar
	build: {
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				// Run ESLint on save
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			// Extend only webpack config for client-bundle
			if (isClient) { config.target = 'electron-renderer' }
		}
	},
	dev: process.env.NODE_ENV === 'DEV',
	css: [
		'@/assets/css/global.css',
  		'@fortawesome/fontawesome-svg-core/styles.css'
	],
	plugins: [
		'~/plugins/fontawesome.js'
	],
	router: {
	    middleware: ['back-button', 'loading']
	}
}
