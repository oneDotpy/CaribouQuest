const fs = require('fs');
const path = require('path');
const axios = require('axios');

const apiKey = 'sk-proj-RORiyOP9a0U5YcX23sYqT3BlbkFJWtKpcFcz9QUXWH19w2iZ';
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const prompt = `
    Tell me 5 interesting things and fun things to do near 43.474979, -80.529302 that you have not given me. Return response in the following JSON format: [{"Loc": "Victoria Park", "Latitude": "43.451262", "Longitude": "-80.503207", "Distance": "2.6 km"}...]`;

const fetchChatGPTData = async () => {
  const options = {
    method: 'POST',
    url: apiUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2048,
      temperature: 1
    }
  };

  try {
    const response = await axios.request(options);
    const responseData = response.data.choices[0].message.content;
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const saveDataToFile = (data) => {
  const filePath = path.join(__dirname, 'output.json');
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing file', err);
    } else {
      console.log('JSON output written to', filePath);
    }
  });
};

const main = async () => {
  const data = await fetchChatGPTData();
  if (data) {
    // Assuming the data is a string, parse it to JSON
    try {
      const parsedData = JSON.parse(data);
      saveDataToFile(parsedData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  } else {
    console.error('Failed to fetch data.');
  }
};

main();
