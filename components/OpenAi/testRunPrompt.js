const fs = require('fs');
const path = require('path');
const runPrompt = require('./runPrompt');

const testRunPrompt = async () => {
  const lat = 37.7749;  // Example latitude
  const long = -122.4194; // Example longitude

  try {
    const result = await runPrompt(lat, long);
    if (result) {
      const filePath = path.join(__dirname, 'output.json');
      fs.writeFile(filePath, JSON.stringify(result, null, 2), (err) => {
        if (err) {
          console.error('Error writing file', err);
        } else {
          console.log('JSON output written to', filePath);
        }
      });
    } else {
      console.error('No result returned from runPrompt');
    }
  } catch (error) {
    console.error('Error in testRunPrompt:', error);
  }
};

testRunPrompt();
