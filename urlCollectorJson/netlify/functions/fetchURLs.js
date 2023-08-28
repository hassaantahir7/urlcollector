// netlify/functions/fetchURLs.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'GET') {
      const filePath = path.join(__dirname, 'urls.json');
      let urls = [];

      if (fs.existsSync(filePath)) {
        const urlsData = fs.readFileSync(filePath, 'utf-8');
        urls = JSON.parse(urlsData);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(urls),
      };
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
