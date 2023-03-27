Kakao.init('b9b626cfbad2404b7f996d689899b956');
Kakao.isInitialized();

function kakaoShare() {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '운세 알려주는 강아지 챗독',
      description: '운세를 알려주는 AI 강아지 챗독 입니다',
      imageUrl:
        'https://github.com/Jiyun1937/chatDog/blob/master/client/image/doge.png?raw=true',
      link: {
        webUrl: 'https://aichatdog.com/',
      },
    },
  });
}
