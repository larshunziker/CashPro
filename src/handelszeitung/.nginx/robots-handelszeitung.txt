# robots.txt Handelszeitung August 2019
#
# handelszeitung.ch
#
# This file is to prevent the crawling and indexing of certain parts
# of your site by web crawlers and spiders run by sites like Yahoo!
# and Google. By telling these "robots" where not to go on your site,
# you save bandwidth and server resources.
#
# This file will be ignored unless it is at the root of your host:
# Used:    http://example.com/robots.txt
# Ignored: http://example.com/site/robots.txt
#
# For more information about the robots.txt standard, see:
# http://www.robotstxt.org/robotstxt.html

# Bot control
User-agent: Yandex
Disallow: /

User-agent: SeznamBot
Disallow: /

User-agent: *
Disallow: /veranstaltungskalender

# Directories
Disallow: /suche/
Disallow: /authorize/
Disallow: /logout/
Disallow: /profile/
Disallow: /group/*/content/
Disallow: /node/
Disallow: /_/
Disallow: /static/js/
Disallow: /assets/*.js

# Sitemaps
Sitemap: https://www.handelszeitung.ch/sitemap.xml
Sitemap: https://www.handelszeitung.ch/sitemap-authors.xml
Sitemap: https://www.handelszeitung.ch/image-sitemap.xml
Sitemap: https://www.handelszeitung.ch/sitemap-articles-time-limited-index.xml
Sitemap: https://www.handelszeitung.ch/sitemap-articles-evergreen-index.xml
Sitemap: https://www.handelszeitung.ch/sitemap-category.xml
Sitemap: https://www.handelszeitung.ch/sitemap-news.xml

Sitemap: https://www.handelszeitung.ch/insurance/sitemap.xml
Sitemap: https://www.handelszeitung.ch/insurance/sitemap-authors.xml
Sitemap: https://www.handelszeitung.ch/insurance/sitemap-articles-time-limited-index.xml
Sitemap: https://www.handelszeitung.ch/insurance/sitemap-articles-evergreen-index.xml
Sitemap: https://www.handelszeitung.ch/insurance/sitemap-news.xml

# Parameters
Disallow: *?*email_address=
Disallow: *?*form_build_id=
Disallow: *?*form_id=
Disallow: *?*search_form_block=
Disallow: *?*view_dom_id=
Disallow: *?*pkBerichtNr=
Disallow: *?*Version=*
Disallow: *?*Path=*
Disallow: *?*_ptid=*
