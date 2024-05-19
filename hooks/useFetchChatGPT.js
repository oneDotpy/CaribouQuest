import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchChatGPT = (prompt, retries = 3, delay = 1000) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'sk-proj-RORiyOP9a0U5YcX23sYqT3BlbkFJWtKpcFcz9QUXWH19w2iZ';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

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

  const fetchData = async (attempt = 0) => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      const responseData = response.data.choices[0].message.content;
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429 && attempt < retries) {
        console.error(`Rate limit exceeded, retrying in ${delay}ms... (attempt ${attempt + 1}/${retries})`);
        setTimeout(() => fetchData(attempt + 1), delay);
      } else {
        setError(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (prompt) {
      fetchData();
    }
  }, [prompt]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetchChatGPT;
