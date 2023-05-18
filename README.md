# URL Shortener Project

This is a URL shortener project built with Node.js, Express, and EJS. It allows users to generate short URLs for long website links, track visitor analytics, and redirect users to the original website when accessing the short URL.

## Features

- Generate short URLs for long website links.
- Track visitor analytics including total clicks and visit history.
- Custom 404 page for handling invalid short URLs.
- Simple and user-friendly UI.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ashutosh7i/Url-Shortener
   ```
2. Install dependencies:
    ```
    cd url-shortener
    npm install
    ```
3. Start the server:
    ```
    node start index.js
    ```
4. Open your browser and access the URL http://localhost:3000 to use the URL shortener application.

## File Structure

The project has the following file structure:

├── controllers
│   └── url.js
├── models
│   └── url.js
├── routes
│   └── url.js
├── views
│   ├── 404.ejs
│   ├── 500.ejs
│   ├── analytics.ejs
│   ├── generated.ejs
│   └── Home.ejs
├── index.js
└── README.md

* The controllers directory contains the URL controller file responsible for handling requests and responses.
* The models directory contains the URL model file defining the schema for the MongoDB database.
* The routes directory contains the Express Router for routing diffrent requests from / to respective handler.
* The views directory holds the EJS template files for different pages of the application.
* The index.js file is the entry point of the application where the server is initialized and routes are defined.

## Dependencies

The project uses the following major dependencies:

* Express: Fast and minimalist web framework for Node.js.
* EJS: Embedded JavaScript templating engine for generating dynamic HTML pages.
* Mongoose: MongoDB object modeling tool for Node.js.
* Shortid: Library for generating short, non-sequential, URL-friendly unique IDs.
* Moment: Library for parsing, manipulating, and formatting dates and times.

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
