# todo: check if grapeshot user agent is needed!
User-agent: grapeshot
Disallow:

# all robots
User-agent: *
Disallow: /log/
Disallow: /misc/
Disallow: /t3lib/
Disallow: /index.php?*
Disallow: /linkTo_UnCryptMailto*
Disallow: *topics
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
Sitemap: https://www.beobachter.ch/sitemap.xml
Sitemap: https://www.beobachter.ch/sitemap-authors.xml
Sitemap: https://www.beobachter.ch/sitemap-articles-time-limited-index.xml
Sitemap: https://www.beobachter.ch/sitemap-articles-evergreen-index.xml
Sitemap: https://www.beobachter.ch/sitemap-articles-seasonal-index.xml
Sitemap: https://www.beobachter.ch/sitemap-category.xml
Sitemap: https://www.beobachter.ch/sitemap-news.xml
Sitemap: https://www.beobachter.ch/image-sitemap.xml

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
