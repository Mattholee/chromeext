console.log('hello world');

//create a div that will contain our button and answer
const chatInterface = document.createElement('div');
chatInterface.setAttribute('id', 'chatInterface')
chatInterface.setAttribute('style', 'width: 150px; height: 150px; position: absolute; bottom:16px; right: 16px; border: 1px solid black')
document.body.appendChild(chatInterface);

//create messages that lives on page and when clicked runs ChatGPT 
const chatHistory = document.createElement('p');
chatHistory.setAttribute('id', 'chatHistory')
chatHistory.setAttribute('style', 'width: 100px; height: 100px; border: 1px solid black')
document.querySelector('#chatInterface').appendChild(chatHistory);

//create button that lives on page and when clicked runs ChatGPT 
const chatGPTButton = document.createElement('button');
chatGPTButton.innerText = 'ChatGPT';
chatGPTButton.setAttribute('id', 'chatGPTButton')
chatGPTButton.setAttribute('style', 'width: 50px; height: 50px; position: absolute; bottom:16px; right: 16px')
chatGPTButton.addEventListener('click',() => {
    console.log('button clicked');
    const selectedText = window.getSelection().toString();
    console.log('checking ' + selectedText)
    queryChatGPT(selectedText);
})
document.querySelector('#chatInterface').appendChild(chatGPTButton);




    //implementation: have a event listener that listens to onClick of button, invoking everything below: 

function queryChatGPT(highlight) {
    //ChatGPT Core functionality  
    const OPENAI_API_KEY = ''

    //console.log('This is a popup!');

    const url = 'https://api.openai.com/v1/completions';

    // "prompt": "how do I run node.js in a chrome extension?",
    const body = {
        "model": "text-davinci-003",
        "prompt": "summarize " + highlight,
        "temperature": 0.7,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    }

    console.log('Attempting to fetch from URL');
    console.log('Asking question: ' + body.prompt)
    fetch(url,{
        //todo: what are we passing in
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPENAI_API_KEY},
        body: JSON.stringify(body)
    })
    .then((response) => response.json() )
    .then((data) => {
        //logic goes here after a success
        console.log("Success:", data.choices[0]['text']);
        document.querySelector('#chatHistory').innerHTML = data.choices[0]['text'];
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}