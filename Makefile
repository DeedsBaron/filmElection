dev:
	pm2 start ecosystem.config.js --only nuxt-dev
	pm2 save
prod:
	npm run build && pm2 start ecosystem.config.js --only nuxt-prod
	pm2 save
