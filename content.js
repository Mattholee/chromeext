//create a div that will contain our button and answer
const chatContainer = document.createElement('div');
chatContainer.setAttribute('id', 'chatContainer');
chatContainer.setAttribute(
  'style',
  'width: 85%; height: 30%; position: fixed; bottom:16px; right: 16px;'
);
document.body.appendChild(chatContainer);

const chatInterface = document.createElement('div');
chatInterface.setAttribute('id', 'chatInterface');
chatInterface.setAttribute(
  'style',
  'width: 80%; height: 30%; position: fixed; bottom:16px; right: 16px; background-Color: white; border: 1px solid black; border-radius: 10px 10px 10px 10px; overflow: scroll; font-size: 32px;'
);
chatContainer.appendChild(chatInterface);

//create a h1 that keeps track of the question being asked
const chatQuestion = document.createElement('h2');
chatQuestion.setAttribute('id', 'chatQuestion');
chatQuestion.setAttribute('style', 'padding:4px');
document.querySelector('#chatInterface').appendChild(chatQuestion);

//create messages that lives on page and when clicked runs ChatGPT
const chatHistory = document.createElement('h4');
chatHistory.setAttribute('id', 'chatHistory');
chatHistory.setAttribute(
  'style',
  'width: 80%; height: 100%; font-size: 20px; padding: 8px'
);
document.querySelector('#chatInterface').appendChild(chatHistory);

const toggleButton = document.createElement('button');
toggleButton.innerText = 'Toggle';
toggleButton.setAttribute('id', 'toggleButton');
toggleButton.setAttribute(
  'style',
  'width: 75px; height: 25px; position:absolute; top:0; right:25px;'
);
toggleButton.addEventListener('click', function () {
  let div = document.getElementById('chatInterface');
  if (div.style.display === 'none') {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
});
chatContainer.appendChild(toggleButton);

//create button that lives on page and when clicked runs ChatGPT
const chatGPTButton = document.createElement('button');
chatGPTButton.innerText = 'Explain';
chatGPTButton.setAttribute('id', 'chatGPTButton');
chatGPTButton.setAttribute(
  'style',
  'width: 100px; height: 50px; position: absolute; bottom:25px; right: 25px'
);
chatGPTButton.addEventListener('click', () => {
  const selectedText = window.getSelection().toString();
  // document.getElementById('chatQuestion').innerText = ('Summarize ' + selectedText);
  // console.log('checking ' + selectedText)
  // document.querySelector('#chatHistory').innerHTML = 'Thinking...'
  document.getElementById('chatInterface').style.display = 'block';
  if (selectedText.length === 0) {
    document.getElementById('chatQuestion').innerText =
      'How to highlight text on your browser:';
    document.querySelector('#chatHistory').innerHTML = 'Thinking...';
    queryChatGPT('How to highlight a text on your browser');
  } else {
    document.getElementById('chatQuestion').innerText =
      'Explain ' + selectedText;
    document.querySelector('#chatHistory').innerHTML = 'Thinking...';
    queryChatGPT('Explain ' + selectedText);
  }
});
document.querySelector('#chatContainer').appendChild(chatGPTButton);

//Second button that gives you examples
const examplesButton = document.createElement('button');
examplesButton.innerText = 'Examples';
examplesButton.setAttribute('id', 'examplesButton');
examplesButton.setAttribute(
  'style',
  'width: 100px; height: 50px; position: absolute; bottom:75px; right: 25px'
);
examplesButton.addEventListener('click', () => {
  const selectedText = window.getSelection().toString();
  // document.getElementById('chatQuestion').innerText = ('Summarize ' + selectedText);
  // console.log('checking ' + selectedText)
  // document.querySelector('#chatHistory').innerHTML = 'Thinking...'
  document.getElementById('chatInterface').style.display = 'block';
  if (selectedText.length === 0) {
    document.getElementById('chatQuestion').innerText =
      'How to highlight text on your browser:';
    document.querySelector('#chatHistory').innerHTML = 'Thinking...';
    queryChatGPT('How to highlight a text on your browser');
  } else {
    document.getElementById('chatQuestion').innerText =
      'Here are examples of ' + selectedText;
    document.querySelector('#chatHistory').innerHTML = 'Thinking...';
    queryChatGPT('Give me examples of ' + selectedText);
  }
});
document.querySelector('#chatContainer').appendChild(examplesButton);

//Third button that explains concepts like a pirate
const piratefy = document.createElement('button');
piratefy.innerText = 'Yer a Pirate';
piratefy.setAttribute('id', 'piratefy');
piratefy.setAttribute(
  'style',
  'width: 100px; height: 50px; position: absolute; bottom:125px; right: 25px'
);
piratefy.addEventListener('click', () => {
  const selectedText = window.getSelection().toString();
  // document.getElementById('chatQuestion').innerText = ('Summarize ' + selectedText);
  // console.log('checking ' + selectedText)
  // document.querySelector('#chatHistory').innerHTML = 'Thinking...'
  document.getElementById('chatInterface').style.display = 'block';
  if (selectedText.length === 0) {
    document.getElementById('chatQuestion').innerText =
      "Arrr, ye lookin' to be highlightin' some text on yer browser?";
    document.querySelector('#chatHistory').innerHTML =
      "Ye'll need to select the text ye want highlighted and then press CTRL+C to copy it and then press CTRL+V to paste it. That'll do the trick!";
    //queryChatGPT('How to highlight a text on your browser');
  } else {
    document.getElementById('chatQuestion').innerText =
      'How a pirate would explain ' + selectedText;
    document.querySelector('#chatHistory').innerHTML = 'Thinking...';
    queryChatGPT('Explain "' + selectedText + '" as if you were a pirate');
  }
});
document.querySelector('#chatContainer').appendChild(piratefy);

//implementation: have a event listener that listens to onClick of button, invoking everything below:

function queryChatGPT(question) {
  //ChatGPT Core functionality
  const OPENAI_API_KEY = '';

  //console.log('This is a popup!');

  const url = 'https://api.openai.com/v1/completions';

  // "prompt": "how do I run node.js in a chrome extension?",
  const body = {
    model: 'text-davinci-003',
    prompt: question,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  fetch(url, {
    //todo: what are we passing in
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + OPENAI_API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      //logic goes here after a success
      document.querySelector('#chatHistory').innerHTML =
        data.choices[0]['text'];
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
