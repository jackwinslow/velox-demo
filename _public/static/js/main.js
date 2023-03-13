let p2p = true

function toggleP2p() {
    p2p = (p2p ? false : true)
    if (p2p) {
        document.getElementById('toggle-circle').classList.remove('toggle-slide-down')
        document.getElementById('toggle-circle').classList.add('toggle-slide-up')
    } else {
        document.getElementById('toggle-circle').classList.remove('toggle-slide-up')
        document.getElementById('toggle-circle').classList.add('toggle-slide-down')
    }
    document.getElementById('peer-status').classList.remove('text-fade-in')
    document.getElementById('peer-status').classList.add('text-fade-out')
    setTimeout(() => { 
        document.getElementById('peer-status').innerText = p2p ? "Enabled" : "Disabled"
        document.getElementById('peer-status').classList.remove('text-fade-out')
        document.getElementById('peer-status').classList.add('text-fade-in')
     },200)
}

function tryItOut() {
    document.getElementById('main-text').classList.add('try-it-out')
    document.getElementById('main').classList.add('try-it-out2')
}