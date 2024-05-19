const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "sk-proj-HbTmlJzom9aUXaXe3lqLT3BlbkFJID7bOZUILc9nqUc3Skf4",
});

const openai = new OpenAIApi(configuration);

const runPrompt = async (lat, long) => {
  const prompt = `
    Tell me 5 interesting things to do near ${lat}, ${long}. Return response in the following parsable JSON format:

    [
        {
            "Loc": "location name",
            "Latitude": "Latitude",
            "Longitude": "Longitude"
        },
        ...
    ]
  `;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2048,
      temperature: 1,
    });

    const parsableJSONresponse = response.data.choices[0].message.content.trim();
    const parsedResponse = JSON.parse(parsableJSONresponse);
    return parsedResponse;
  } catch (error) {
    console.error("Error parsing response: ", error);
    return null;
  }
};

module.exports = runPrompt;
