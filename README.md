This application provides URL shortening services, allowing users to create shortened versions of long URLs, decode shortened URLs, and view statistics for shortened links.

## Features

- Encode long URLs into short links
- Decode short links back to their original URLs
- View statistics for shortened links


To use Short Link Application, follow these steps:

1. Start the development server
npm run dev This will start the server, typically on `http://localhost:4545` (or whatever port you've configured)

2. Use an API client like Postman or curl to interact with the endpoints:
- Encode a URL: `POST /api/v1/shortlink/encode-url`
- Decode a URL: `POST /api/v1/shortlink/decode-url`
- Get stats for a URL: `GET /api/v1/shortlink/stats`

## Running Tests

To run tests, use the following command:
npm run test This will run the test suite and output the results to your console.
