import axios from 'axios';

const apiKey = 'sk-proj-RORiyOP9a0U5YcX23sYqT3BlbkFJWtKpcFcz9QUXWH19w2iZ';
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const prompt = `
    Tell me 5 interesting things and fun things to do near 43.474979, -80.529302 that you have not given me. Return response in the following parsable JSON format:
    [{"Loc": "location name", "Latitude": "Latitude", "Longitude": "Longitude", "Distance": "Distance from given latitude and longitude in km (only the numbers + km)"}]`;
let locationData = null;

export const fetchChatGPTData = async () => {
  const options = {
    method: 'POST',
    url: apiUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2048,
      temperature: 1,
    },
  };

  try {
    const response = await axios.request(options);
    const responseData = response.data.choices[0].message.content;
    locationData = JSON.parse(responseData);
    return locationData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getLocationData = () => {
  return locationData;
};
