import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (lat, long) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const prompt = `
    Tell me 5 interesting things to do near 37.7749, -122.4194. Return response in the following parsable JSON format:
    [{"Loc": "location name", "Latitude": "Latitude", "Longitude": "Longitude"}]`;

  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'c099850f63msh6152e7cf6deedf6p127ac8jsnabab84b04e6c',
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      web_access: false
    }
  };

  const fetchData = async () => {
    setisLoading(true);

    try {
      const response = await axios.request(options);
      const resultText = response.data.result;

      // Custom parsing logic to extract locations
      const locations = parseLocations(resultText);

      setData(locations);
      setisLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error');
    } finally {
      setisLoading(false);
    }
  };

  const parseLocations = (text) => {
    // Define a regex pattern to extract location details
    const pattern = /(?<=\d+\.\s)([^:]+):([^:]+):([^:]+)/g;
    const matches = text.match(pattern);
    if (!matches) return [];

    const locations = matches.map((match) => {
      const [loc, latitude, longitude] = match.split(':').map((str) => str.trim());
      return { Loc: loc, Latitude: latitude, Longitude: longitude };
    });

    return locations;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setisLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
