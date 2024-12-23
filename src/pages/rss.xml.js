import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '../config'

export const get = () =>
	rss({
		description: SITE_DESCRIPTION
	, items: import.meta.glob('./blog/**/*.md')
	, site: import.meta.env.SITE
	, title: SITE_TITLE
	})
