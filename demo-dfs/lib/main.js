import {Velox} from "velox-songbird"

const f = new Map();
const fc = new Map();
const reqd = new Map();
const v = new Velox("ws:139.144.30.74:80/nest", 
    {
        iceServers: [
            {
                urls: [ "stun:fr-turn1.xirsys.com" ]
            }, 
            { 
                username: "Bs15zoaVr90L-hD9N-jTYTbAFEZ_DcEkC1y6HOnO_BAIMga6mzqqHvJexmpK9U9rAAAAAGQImPRwYXJsZW9u",
                credential: "f2dfa7d6-bdbb-11ed-93e2-0242ac120004",
                urls: [
                    "turn:fr-turn1.xirsys.com:80?transport=udp",
                    "turn:fr-turn1.xirsys.com:3478?transport=udp",
                    "turn:fr-turn1.xirsys.com:80?transport=tcp",
                    "turn:fr-turn1.xirsys.com:3478?transport=tcp",
                    "turns:fr-turn1.xirsys.com:443?transport=tcp",
                    "turns:fr-turn1.xirsys.com:5349?transport=tcp"
                ]
            }
        ]
    }
);




document.addEventListener("DOMContentLoaded", () => {

    const toBlob = document.querySelectorAll("[data-src]")
        
    for(var i = 0; i < toBlob.length; i++) {
        const n = i
        const path = toBlob[i].getAttribute("data-src")
        toBlob[n].removeAttribute("data-src")
        fc.set(path, () => {
            const furl = URL.createObjectURL(f.get(path))
            toBlob[n].setAttribute("src", furl)
        })
    }



    v.connect("image-demo");

    v.onchannelopen((peer) => {
            for (const k of fc.keys()) {
                if (!f.has(k) && !reqd.has(k)) {
                    console.log("requested resource:", k, "| Time:", Math.floor(Date.now() / 1000))
                    reqd.set(k)
                    v.requestBlob(k, [peer]).then((b) => {
                        if (!f.has(k)) {
                            console.log("injecting from peer:", k, "| Time:", Math.floor(Date.now() / 1000))
                            f.set(k, b)
                            fc.get(k)()
                        }
                    })
            
                    setTimeout( async () => {
                        if (!f.has(k)) {
                            const response = await fetch(`http://127.0.0.1:8080/${k}`)
                            const nb = await response.blob()
                            const nf = new Blob([nb], {
                                type: nb.type,
                            });
                            f.set(k, nf)
                            fc.get(k)()
                            v.mountBlob(k, nf)
                            console.log("injecting from server:", k, "| Time:", Math.floor(Date.now() / 1000))
                        }
                    }, 5000)
                }
            }
        }
    )
})