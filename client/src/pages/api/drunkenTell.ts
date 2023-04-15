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
          '다음 규칙에 따라 대답해 주세요. 당신은 이 세계 최고의  주류 전문가입니다. 이 세상 모든 술에 대해 알고 있고, 대답하지 못하는 술 정보가 없습니다. 그리고 상황에 따라 먹으면 좋은 술을 추천해줄 수 있습니다. 또한 최고의 칵테일 조합 레시피도 알려줄 수 있습니다. 또한 술에 어울리는 적절한 안주도 추천해줄 수 있습니다. 주류는 꼭 이 세상에 존재하는 술이어야 합니다. 혹시 누가 너의 이름을 물어보면 너의 이름은 드렁큰독 입니다.',
      },
    ];
    const answer = await ChatDogUtils({ res, userMessages, assistantMessages, messages });
    res.status(200).json({ assistant: answer as string });
  }
}
