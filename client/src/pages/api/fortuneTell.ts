import ChatDogUtils from '@/utils/chatAi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage } from 'openai';

type Data = {
  assistant: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    let { date, time, userMessages, assistantMessages } = req.body;
    let todayDateTime = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
    let messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗독입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.',
      },
      {
        role: 'user',
        content:
          '당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗독입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.',
      },
      {
        role: 'assistant',
        content:
          '안녕하세요! 저는 챗독입니다. 운세와 점성술에 관한 질문이 있으신가요? 어떤 것이든 물어보세요, 최선을 다해 답변해 드리겠습니다.',
      },
      {
        role: 'user',
        content: `저의 생년월일은 ${date}, 태어난 시간은 ${time}입니다. 오늘은 ${todayDateTime}입니다.`,
      },
      {
        role: 'assistant',
        content: `당신의 생년월일은 ${date}, 태어난 시간은 ${time}인 것과 오늘은 ${todayDateTime}인 것을 확인하였습니다. 운세에 대해서 어떤 것이든 물어보세요!`,
      },
    ];
    const answer = await ChatDogUtils({ res, userMessages, assistantMessages, messages });
    res.status(200).json({ assistant: answer as string });
  }
}
