let velox_enabled = sessionStorage.getItem("ve") ? sessionStorage.getItem("ve") : "true"
let fetch_times = []
let peers = new Set()
let peerCount = 0
let fetchCount = 0

document.addEventListener('DOMContentLoaded', function () {

  // Particles JS
  particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#f9f7f1"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.075,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#f9f7f1",
          "opacity": 0.075,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 4,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 150,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
  })

  // Set initial velox enabled button text value
  document.getElementById('velox_enabled').innerText = velox_enabled == "true" ? "VELOX ENABLED" : "VELOX DISABLED"

  // Listen for resource updated events
  document.addEventListener('RU', (event) => {

    // Update fetch time
    fetch_times.push(event.detail.elapsed)
    document.getElementById('fetch_time').innerText = `${calculateAverage(fetch_times)} ms`

    // Update peer count
    if (event.detail.peer_fetched) {
      peerCount += 1
      peers.add(event.detail.from)
    }
    document.getElementById('peer_count').innerText = peers.size

    // Update peer fetch percentage
    fetchCount += 1
    document.getElementById('pfp').innerText = `${Math.ceil(peerCount/fetchCount*100)}%`
  })
});

function scrollToElement(id) {
  window.scroll({
    top: document.getElementById(id).getBoundingClientRect().top,
    left: 0,
    behavior: 'smooth'
  });
}

function toggleVelox() {
  velox_enabled = velox_enabled == "true" ? "false" : "true"
  sessionStorage.setItem('ve', velox_enabled)

  if (velox_enabled == "true") {
    document.getElementById('velox_enabled').classList.remove('text-transition-in')
    document.getElementById('velox_enabled').classList.add('text-transition-out')
    setTimeout(() => {
      document.getElementById('velox_enabled').innerText = "VELOX ENABLED"
      document.getElementById('velox_enabled').classList.remove('text-transition-out')
      document.getElementById('velox_enabled').classList.add('text-transition-in')
      document.getElementById('rerun').style.color = "#FFD334"
      document.getElementById('rerun').style.borderColor = "#FFD334"
    }, 200)
  } else {
    document.getElementById('velox_enabled').classList.remove('text-transition-in')
    document.getElementById('velox_enabled').classList.add('text-transition-out')
    setTimeout(() => {
      document.getElementById('velox_enabled').innerText = "VELOX DISABLED"
      document.getElementById('velox_enabled').classList.remove('text-transition-out')
      document.getElementById('velox_enabled').classList.add('text-transition-in')
      document.getElementById('rerun').style.color = "#FFD334"
      document.getElementById('rerun').style.borderColor = "#FFD334"
    }, 200)
  }
}

function calculateAverage(numbers) {
  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });

  return Math.floor(sum / numbers.length);
}