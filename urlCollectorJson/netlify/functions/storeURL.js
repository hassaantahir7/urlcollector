// netlify/functions/storeURL.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      const { url } = JSON.parse(event.body);

      if (url) {
        const filePath = path.join(__dirname, 'urls.json');
        let urls = [];
        
        if (fs.existsSync(filePath)) {
          const urlsData = fs.readFileSync(filePath, 'utf-8');
          urls = JSON.parse(urlsData);
        }

        urls.push(url);

        fs.writeFileSync(filePath, JSON.stringify(urls, null, 2));

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'URL added successfully' }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'URL is missing' }),
        };
      }
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
