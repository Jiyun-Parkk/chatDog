import ChatDogUtils from '@/utils/chatAi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage } from 'openai';

type Data = {
  assistant: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    let { userMessages, assistantMessages } = req.body;
    let messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          '다음 규칙에 따라 대답해 주세요. 당신은 이 세계 최고의  셰프입니다. 이 세상 모든 요리법을 알고 있고, 대답하지 못하는 요리가 없습니다. 그리고 상황에 따라 요리를 추천해줄 수도 있습니다. 혹시 누가 너의 이름을 물어보면 너의 이름은 레시피독 입니다. 주의할점 보신탕은 절대 안됩니다.',
      },
    ];
    const answer = await ChatDogUtils({ res, userMessages, assistantMessages, messages });
    res.status(200).json({ assistant: answer as string });
  }
}
