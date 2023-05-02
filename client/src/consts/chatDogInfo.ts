import { CHAT } from './chatType';
import fortuneImage from '/public/static/images/fortune.png';
import kcalImage from '/public/static/images/kcaldog.png';

export const chatDogList = [
  {
    title: CHAT.FORTUNE,
    sub: '용하다 용해 🔮',
    mainText: ['운세를 알려주는', '신비로운 강아지 포춘독'],
    keyword: '포춘독',
    button: '운세 점치러 가기',
    imgPath: fortuneImage,
    tag: ['#운세', '#사주', '#취업운', '#연애운', '#건강운', '#신년운세'],
    explain: ['생년월일을 알려주시면', '더 정확한 점을 볼 수 있다고 합니다!'],
    detailtext: [
      '포춘독은 당신의 불안한 마음에',
      '평화와 행복의 길을 열어줘요.',
      '귀여운 어택은 덤 🐾',
    ],
    color: {
      point: '#b52e3e',
      active: '#B72C3A',
    },
  },
  {
    title: CHAT.KCAL,
    sub: '빠진다 빠져 🥗',
    mainText: ['식단 짜주는', '건강한 강아지 칼로리독'],
    keyword: '칼로리독',
    button: '다이어트 하러 가기',
    imgPath: kcalImage,
    tag: ['#다이어트', '#음식', '#요리', '#식단관리', '#체중감량', '#칼로리'],
    explain: [''],
    detailtext: [
      '칼로리독은 식단을 조절하고 싶은',
      '당신의 고민을 해결해줍니다.',
      '원하는 칼로리에 맞춰',
      '식단 구성을 한번에! 👩‍🍳',
    ],
    color: {
      point: '#245953',
      active: '#B72C3A',
    },
  },
  {
    title: CHAT.RECIPE,
    sub: '맛있다 맛있어 🍗',
    mainText: ['미슐랭 ⭐️⭐️⭐️', '요리하는 강아지 레시피독'],
    keyword: '레시피독',
    button: '최고의 식사하러 가기',
    imgPath: fortuneImage,
    tag: ['#레시피', '#음식', '#요리', '#오늘 뭐먹지?', '#요리노하우', '#강주부', '#요리연구가'],
    explain: [''],
    detailtext: [
      '레시피독은 단순한 식재료 뿐만 아니라',
      '요리 노하우까지 알려드립니다.',
      '당신의 주방도 이제 미슐랭 ⭐️⭐️⭐️',
    ],
    color: {
      point: '#2A2F4F',
      active: '#B72C3A',
    },
  },

  {
    title: CHAT.DRUNKEN,
    sub: '취한다 취해 🍷',
    mainText: ['나한테 취하나 안취하나?', '낭만 강아지 드렁큰독'],
    keyword: '드렁큰독',
    button: '한껏 취하러 가기',
    imgPath: fortuneImage,
    tag: ['#술', '#칵테일', '#안주', '#분위기', '#낭만', '#꿀조합', '#하이볼'],
    explain: [''],
    detailtext: ['안주부터 칵테일까지', '당신의 드렁큰피디아', '낭만 ✨ 술 🍾 나 👸'],
    color: {
      point: '#4F200D',
      active: '#B72C3A',
    },
  },
];
