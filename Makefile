dev:
	pm2 start ecosystem.config.js --only nuxt-dev
prod:
	npm run build && pm2 start ecosystem.config.js --only nuxt-prod
