import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ChatDogUtilsProps {
  res: NextApiResponse;
  userMessages: string[];
  assistantMessages: string[];
  messages: ChatCompletionRequestMessage[];
}

const ChatDogUtils = async ({
  res,
  userMessages,
  assistantMessages,
  messages,
}: ChatDogUtilsProps) => {
  while (userMessages.length !== 0 || assistantMessages.length !== 0) {
    if (userMessages.length !== 0) {
      messages.push(
        JSON.parse(
          `{"role": "user", "content":"${String(userMessages.shift()).replace(/\n/g, '<br/>')}"}`
        )
      );
    }
    if (assistantMessages.length !== 0) {
      messages.push(
        JSON.parse(
          `{"role": "assistant", "content":"${String(assistantMessages.shift()).replace(
            /\n/g,
            '<br />'
          )}"}`
        )
      );
    }
  }
  const maxRetries = 3;
  let retries = 0;
  let completion;
  while (retries < maxRetries) {
    try {
      completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(`Error fetching data, retrying (${retries}/${maxRetries})...`);
      if (error instanceof AxiosError) {
        res.status(Number(error.code)).send(error.message);
      }
    }
  }
  let answer;
  if (completion !== undefined) {
    //@ts-ignore
    answer = completion.data.choices[0].message['content'];
  }

  return answer;
};

export default ChatDogUtils;
