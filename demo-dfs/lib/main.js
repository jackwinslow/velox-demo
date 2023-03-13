import {Velox} from "velox-songbird"

const files = new Map();
const file_callbacks = new Map();
const requested = new Map();
const peers = new Map();
let peer_target = 0;
let sr = false;




const v = new Velox(
    "ws:139.144.30.74:80/nest", 
    {
        iceServers: [
            {
                urls: [ "stun:us-turn3.xirsys.com" ]
            }, 
            {
                username: "7XSuZRhbYKu105TrkOEwcH2tPN-zWZDZw_72u2UQNZXq0FAQF8xjpFMP3eYERIicAAAAAGQPSt5wYXJsZW9u",
                credential: "8534c818-c1b9-11ed-987c-0242ac140004",
                urls: [
                    "turn:us-turn3.xirsys.com:80?transport=udp",
                    //"turn:us-turn3.xirsys.com:3478?transport=udp",
                    //"turn:us-turn3.xirsys.com:80?transport=tcp",
                    //"turn:us-turn3.xirsys.com:3478?transport=tcp",
                    //"turns:us-turn3.xirsys.com:443?transport=tcp",
                    //"turns:us-turn3.xirsys.com:5349?transport=tcp"
                ]
            }
        ]
    }
);

v.registerMessage("PC", (m) => {
        console.log(m)
        if (peer_target == 0) {
            peer_target = Math.floor(m.Body/3)+1
        }
        if (peers.size >= peer_target && sr == false) {
            sr == true
            for (const k of file_callbacks.keys()) {    
                if (!files.has(k)) {
                    console.log("requested resource:", k, "| Time:", Math.floor(Date.now() / 1000))
                    requested.set(k)
                    v.requestBlob(k, [[...peers.keys()][[Math.floor(Math.random() * peers.size)]]]).then((b) => {
                        if (!files.has(k)) {
                            console.log("injecting from peer:", k, "| Time:", Math.floor(Date.now() / 1000))
                            files.set(k, b)
                            file_callbacks.get(k)()
                        }
                    })
            
                    setTimeout( async () => {
                        if (!files.has(k)) {
                            const response = await fetch(`http://139.144.30.74:8080/${k}`)
                            const nb = await response.blob()
                            const nf = new Blob([nb], {
                                type: nb.type,
                            });
                            files.set(k, nf)
                            file_callbacks.get(k)()
                            v.mountBlob(k, nf)
                            console.log("injecting from server:", k, "| Time:", Math.floor(Date.now() / 1000))
                        }
                    }, 5000)
                }
            }
        }

})



document.addEventListener("DOMContentLoaded", () => {

    const toBlob = document.querySelectorAll("[data-src]")
        
    for(var i = 0; i < toBlob.length; i++) {
        const n = i
        const path = toBlob[i].getAttribute("data-src")
        toBlob[n].removeAttribute("data-src")
        file_callbacks.set(path, () => {
            const furl = URL.createObjectURL(files.get(path))
            toBlob[n].setAttribute("src", furl)
        })
    }



    v.connect("image-demo");

    v.onchannelopen((peer) => {

            peers.set(peer)

            v.send({Type: "PC", Body:peers.size},[peer])

            console.log(peers.size, peer_target)

        }
    )

    v.onchannelclose((peer) => {
        console.log("closed connection to:", peer)
        peers.delete(peer)
    })
})