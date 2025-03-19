import rss from '@astrojs/rss'
import {TITLE, DESCRIPTION} from '../config'

export const get = () =>
	rss({
		description: DESCRIPTION
	, items: import.meta.glob('./blog/**/*.md')
	, site: import.meta.env.SITE
	, title: TITLE
	})
