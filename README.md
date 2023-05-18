# Url-Shortener
A simple URL shortener API using node&amp;Express js

This is a simple URL shortener intended to shorten URL provied to it,
also it will log the no. of time someone visited/redirected to the page.

### Routes-
1. ``POST/{url:"full url"}``- Generate a short URL and return the shortened URL id.
2. ``GET/:id``- Redirect the user the original URL.
3. ``GET/analytics/:id``- Returns the clicks for the provied short id.

## The backend part is completed

### 11:37PM 02-05-2023
Implementing EJS for server side rendered frontend

## Template engine
engines that help use use server sider rendering in order to make frontend
* Pug.
* Handlebars.
* EJS.- we will be using it.

## Setup-

install-``npm install ejs``
```
//setting EJS view engine
app.set("view engine", "ejs");
const path = require("path");
app.set("views",path.resolve("./views"))
```
Use- now we can render like``res.render("home")``
where "home" is a file in views folder




if get request on / then render homepage
if get request on / with some body after /
    if the body is valid and present in the db, redirect to the website
    if the body id invalid, render a 404.

