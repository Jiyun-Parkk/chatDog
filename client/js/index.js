'use strict';

const messageBox = document.querySelector('.chat-messages');
const messageList = document.querySelector('.chat-messages ul');
const chatForm = document.querySelector('#chat');
const dateForm = document.querySelector('#date-form');
const inputBox = document.querySelector('.chat-input input[type="text"]');
const sendButton = document.querySelector('.chat-input button');
const dim = document.querySelector('#dim');
const title = document.querySelector('#title');
const main = document.querySelector('main');
let userMessages = [];
let assistantMessages = [];
let myDateTime = '';

const createChatDogAnswer = (answerText) => {
  const newResponse = document.createElement('li');
  const ResponseText = document.createElement('p');
  const profile = document.createElement('img');
  profile.classList.add('profile');
  profile.src =
    'https://github.com/Jiyun1937/chatDog/blob/master/client/image/doge.png?raw=true';
  profile.alt = 'chatdog profile';
  newResponse.appendChild(profile);
  newResponse.appendChild(ResponseText);
  newResponse.classList.add('answer');
  ResponseText.textContent = answerText;
  messageList.appendChild(newResponse);
  return ResponseText;
};

const sendDate = async (e) => {
  e.preventDefault();
  let formData = new FormData(dateForm);
  const date = formData.get('date');
  const time = formData.get('time');

  if (!date || date === '') {
    alert('생년월일을 입력해주세요');
  } else if (!time || time === '') {
    alert('태어난 시간을 입력해주세요');
  } else if (new Date(date) > new Date()) {
    alert('생년월일이 오늘보다 미래입니다!');
  } else {
    myDateTime = `생년월일:${date},태어난시:${time.split(':')[0]}`;
    dateForm.style.display = 'none';
    chatForm.style.display = 'flex';
    title.style.display = 'none';
    main.style.width = '100%';
    main.style.padding = 0;
    const chatdog = createChatDogAnswer(
      `당신의 생년월일은${date}, 태어난 시간은 ${
        time.split(':')[0]
      }시 군요! 운세에 대해서 어떤 것이든 물어보세요!`,
    );
    chatdog.scrollIntoView();
  }
  window.scrollTo({ top: 0, left: 0 });
};

const sendMessage = async (e) => {
  e.preventDefault();

  let messageText = inputBox.value;
  const newMessage = document.createElement('li');

  newMessage.textContent = messageText;
  messageList.appendChild(newMessage);
  userMessages.push(messageText);
  inputBox.value = '';
  newMessage.scrollIntoView();

  try {
    dim.style.display = 'flex';
    sendButton.disabled = true;
    const response = await fetch(
      `https://p2zlk9ywce.execute-api.ap-northeast-2.amazonaws.com/prod/fortuneTell`,
      {
        method: 'POST',
        body: JSON.stringify({
          myDateTime,
          userMessages,
          assistantMessages,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    assistantMessages.push(data.assistant);
    dim.style.display = 'none';
    const chatdog = createChatDogAnswer(data.assistant);
    sendButton.disabled = false;
    chatdog.scrollIntoView();
  } catch (error) {
    console.error(error);
    dim.style.display = 'none';
    const chatdog = createChatDogAnswer(
      '요청시간이 초과되었어요! 새로고침 해주세요',
    );
    sendButton.disabled = true;
    chatdog.scrollIntoView();
  }
};

chatForm.addEventListener('submit', sendMessage);
dateForm.addEventListener('submit', sendDate);
