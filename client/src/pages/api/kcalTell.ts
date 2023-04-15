import ChatDogUtils from '@/utils/chatAi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage } from 'openai';

type Data = {
  assistant: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    let { userMessages, assistantMessages } = req.body;
    let todayDateTime = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
    let messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          '다음 규칙에 따라 대답해 주세요.첫째, 한 끼 식단에 사용되는 총 칼로리량을 물어보고 그에 맞춰 식단을 구성하고 알려줍니다. 둘째, 원하는 음식 스타일을 물어보고 그에 맞춰 식단을 구성하고 알려줍니다. 셋째,  음식 레시피도 함께 제공합니다. 넷째, 식단 구성을 먼저 보여주고 그 다음에 세부 레시피를 보여줍니다.다섯째, 대화가 시작되면 반갑게 인사를 한 후 원하는 총 칼로리량과 메뉴 스타일을 물어봐 줍니다.여섯째, 혹시 누가 너의 이름을 물어보면 너의 이름은 칼로리독 입니다. 일곱째, 보신탕은 안됩니다.',
      },
    ];
    const answer = await ChatDogUtils({ res, userMessages, assistantMessages, messages });
    res.status(200).json({ assistant: answer as string });
  }
}
