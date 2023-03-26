const chatWindow = document.querySelector('.chat-window');
const messageBox = document.querySelector('.chat-messages');
const messageList = document.querySelector('.chat-messages ul');
const chatForm = document.querySelector('#chat');
const dateForm = document.querySelector('#date-form');
const inputBox = document.querySelector('.chat-input input[type="text"]');
const sendButton = document.querySelector('.chat-input button');
const spinner = document.querySelector('#loader');
let userMessages = [];
let assistantMessages = [];
let myDateTime = '';

chatForm.addEventListener('submit', sendMessage);
dateForm.addEventListener('submit', sendDate);

async function sendDate(e) {
  e.preventDefault();
  let formData = new FormData(dateForm);
  const date = formData.get('date');
  const time = formData.get('time');

  if (!date || date === '') {
    alert('생년월일을 입력해주세요');
  } else if (!time || time === '') {
    alert('태어난 시간을 입력해주세요');
  }
  myDateTime = `생년월일:${date},태어난시:${time.split(':')[0]}`;

  dateForm.style.display = 'none';
  chatForm.style.display = 'flex';
}
async function sendMessage(e) {
  e.preventDefault();

  let messageText = inputBox.value;
  const newMessage = document.createElement('li');
  newMessage.textContent = messageText;
  messageList.appendChild(newMessage);
  userMessages.push(messageText);
  inputBox.value = '';

  try {
    spinner.style.display = 'flex';
    sendButton.disabled = true;
    const response = await fetch(
      'https://p2zlk9ywce.execute-api.ap-northeast-2.amazonaws.com/prod/fortuneTell',
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
    console.log(data);
    assistantMessages.push(data.assistant);
    const newResponse = document.createElement('li');
    newResponse.textContent = data.assistant;
    newResponse.classList.add('answer');
    spinner.style.display = 'none';
    messageList.appendChild(newResponse);
    sendButton.disabled = false;
  } catch (error) {
    console.error(error);
  }
}
