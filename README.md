# Url-Shortener
A simple URL shortener API using node&amp;Express js

This is a simple URL shortener intended to shorten URL provied to it,
also it will log the no. of time someone visited/redirected to the page.

### Routes-
1. ``POST/URL``- Generate a short URL and return the shortened URL in format like ``somesite.com/randomID``.
2. ``GET/:id``- Redirect the user the original URL.
3. ``GET/URL/analytics/:id``- Returns the clicks for the provied short id.

