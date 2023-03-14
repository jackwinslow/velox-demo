let thread = []

document.addEventListener('DOMContentLoaded', function () {

    // Sends message on Enter key
    document.getElementById('chat-input').addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            sendMessage()
        }
    })

})

function sendMessage() {
    let msg = document.getElementById('chat-input').value

    if (msg == "") {
        return
    }

    document.dispatchEvent(new CustomEvent("sc", {detail: {content: msg}}))
    document.getElementById('chat-input').value = ""
    thread.push({from: 'Me', content: msg})
    addNewMessage()
}

function addNewMessage() {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message')
    msgElement.classList.add(thread.length % 2 == 0 ? 'message-even' : 'message-odd')

    const msgUser = document.createElement('span')
    msgUser.classList.add('message-from')
    msgUser.innerText = thread[thread.length - 1].from == "Me" ? "Me:" : `Peer#${thread[thread.length - 1].from.slice(0,4).toUpperCase()}:`

    const msgText = document.createElement('span');
    msgText.classList.add('message-text')
    msgText.innerText = thread[thread.length - 1].content

    msgElement.appendChild(msgUser)
    msgElement.appendChild(msgText)
    document.getElementById('thread').appendChild(msgElement)
    document.getElementById('thread-container').scrollTop = document.getElementById('thread-container').scrollHeight
}

document.addEventListener('rc', (event) => {
    thread.push(event.detail)
    addNewMessage()
})