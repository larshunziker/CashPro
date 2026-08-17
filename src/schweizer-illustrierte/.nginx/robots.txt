# 
# robots.txt - SI/Style - 27.03.19 - V1
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

User-agent: *
Crawl-delay: 10

# CSS, JS, Images
Allow: /static/css/*.css$
Allow: /static/css/*.css?
Allow: /static/js/*.js$
Allow: /static/js/*.js?
Allow: /static/*.gif
Allow: /static/*.jpg
Allow: /static/*.jpeg
Allow: /static/*.png

# Directories
Disallow: /suche/
Disallow: /stichworte/
Disallow: /authorize/
Disallow: /logout/
Disallow: /profile/
# Paths (clean URLs)
Disallow: /taxonomy/term/
Disallow: /group/*/content/
Disallow: /node/
Disallow: /_/
Disallow: /static/js/
Disallow: /assets/*.js

# Sitemaps
Sitemap: https://www.schweizer-illustrierte.ch/sitemap.xml
Sitemap: https://www.schweizer-illustrierte.ch/sitemap-authors.xml
Sitemap: https://www.schweizer-illustrierte.ch/sitemap-articles-time-limited-index.xml
Sitemap: https://www.schweizer-illustrierte.ch/sitemap-articles-evergreen-index.xml
Sitemap: https://www.schweizer-illustrierte.ch/sitemap-articles-seasonal-index.xml
Sitemap: https://www.schweizer-illustrierte.ch/sitemap-category.xml
Sitemap: https://www.schweizer-illustrierte.ch/sitemap-news.xml
Sitemap: https://www.schweizer-illustrierte.ch/image-sitemap.xml

# Parameters
Disallow: *?*email_address=
Disallow: *?*form_build_id=
Disallow: *?*form_id=
Disallow: *?*search_form_block=
Disallow: *?*view_dom_id=
Disallow: *?*pkBerichtNr=
Disallow: *?*$Version=*
Disallow: *?*$Path=*
Disallow: *?*_ptid=*
