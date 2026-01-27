import './style.css';
import gsap from 'gsap';
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}


const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const plane = document.getElementById('plane')
const rocket = document.getElementById('rocket')
const boat = document.getElementById('boat')

const modalRocket = document.querySelector('.modal-info.rocket')
const modalPlane = document.querySelector('.modal-info.plane')
const modalBoat = document.querySelector('.modal-info.boat')
const modalCar = document.querySelector('.modal-info.car')

const closeBtns = document.querySelectorAll('.modal-close')
const openBtnPlane = document.querySelector('.open-plane')
const openBtnBoat = document.querySelector('.open-boat')
const openBtnRocket = document.querySelector('.open-rocket')
const openBtnCar = document.querySelector('.open-car')

const svgPathPlane = document.getElementById('svg-path-plane')
const pathPlaneLength = svgPathPlane.getTotalLength()
gsap.set(svgPathPlane, {
  strokeDasharray: pathPlaneLength,
  strokeDashoffset: pathPlaneLength
})

const svgPathRocket = document.getElementById('svg-path-rocket')
const pathRocketLength = svgPathRocket.getTotalLength()
gsap.set(svgPathRocket, {
  strokeDasharray: pathRocketLength,
  strokeDashoffset: pathRocketLength
})

const svgPathBoat = document.getElementById('svg-path-boat')
const pathBoatLength = svgPathBoat.getTotalLength()
gsap.set(svgPathBoat, {
  strokeDasharray: pathBoatLength,
  strokeDashoffset: pathBoatLength
})

const circlePlane1 = document.getElementById('circle-plane-1')
const circlePlane2 = document.getElementById('circle-plane-2')
const circleRocket1 = document.getElementById('circle-rocket-1')
const circleRocket2 = document.getElementById('circle-rocket-2')
const circleBoat1 = document.getElementById('circle-boat-1')
const circleBoat2 = document.getElementById('circle-boat-2')

gsap.set([circlePlane1, circlePlane2, circleRocket1, circleRocket2, circleBoat1, circleBoat2], {
  opacity: 0,
  scale: 0
})

let modalsClosedState = {
  rocket: false,
  plane: false,
  boat: false,
  car: false
}

let objectsDisappeared = {
  rocket: false,
  boat: false
}

gsap.set(plane, { opacity: 0, yPercent: -100, xPercent: -100 })
gsap.set(rocket, { yPercent: 0 })
gsap.set(boat, { xPercent: 0, yPercent: 0 })
gsap.set([modalRocket, modalPlane, modalBoat, modalCar], { opacity: 0, scale: 0.8 })
gsap.set([openBtnPlane, openBtnBoat, openBtnRocket, openBtnCar], { opacity: 0, scale: 0 })


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#infographic',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2, 
    markers: false,
    onUpdate: (self) => {
      if (self.progress < 0.1) {
        modalsClosedState = {
          rocket: false,
          plane: false,
          boat: false,
          car: false
        }
        objectsDisappeared = {
          rocket: false,
          boat: false
        }
        gsap.set([openBtnPlane, openBtnBoat, openBtnRocket, openBtnCar], { opacity: 0, scale: 0 })
      }
    }
  }
})


tl.to(plane, {
  opacity: 1,
  yPercent: 0,
  xPercent: 0,
  duration: 2, 
  ease: 'power2.out'
})


tl.to(modalPlane, {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: 'back.out(1.2)',
  onStart: () => {
    if (!modalsClosedState.plane) {
      gsap.set(modalPlane, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalPlane, { opacity: 0, scale: 0.8 })
  }
}, '+=0.5')


tl.to(circlePlane1, {
  opacity: 1,
  scale: 1,
  duration: 0.6, 
  ease: 'back.out(1.2)'
})


tl.to(svgPathPlane, {
  strokeDashoffset: 0,
  duration: 3, 
  ease: 'power1.inOut',
})


tl.to(circlePlane2, {
  opacity: 1,
  scale: 1,
  duration: 0.6,
  ease: 'back.out(1.2)'
})

tl.to(modalRocket, {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: 'back.out(1.2)',
  onStart: () => {
    if (!modalsClosedState.rocket) {
      gsap.set(modalRocket, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalRocket, { opacity: 0, scale: 0.8 })
  }
}, '+=0.7')

tl.to(circleRocket1, {
  opacity: 1,
  scale: 1,
  duration: 0.6,
  ease: 'back.out(1.2)'
})

tl.to(svgPathRocket, {
  strokeDashoffset: 0,
  duration: 3,
  ease: 'power1.inOut',
})

tl.to(circleRocket2, {
  opacity: 1,
  scale: 1,
  duration: 0.6,
  ease: 'back.out(1.2)'
})

tl.to(modalCar, {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: 'back.out(1.2)',
  onStart: () => {
    if (!modalsClosedState.car) {
      gsap.set(modalCar, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalCar, { opacity: 0, scale: 0.8 })
  }
}, '+=0.7')

tl.to(modalBoat, {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: 'back.out(1.2)',
  onStart: () => {
    if (!modalsClosedState.boat) {
      gsap.set(modalBoat, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalBoat, { opacity: 0, scale: 0.8 })
  }
}, '+=0.5')

tl.to(circleBoat1, {
  opacity: 1,
  scale: 1,
  duration: 0.6,
  ease: 'back.out(1.2)'
})

tl.to(svgPathBoat, {
  strokeDashoffset: 0,
  duration: 3,
  ease: 'power1.inOut',
})

tl.to(circleBoat2, {
  opacity: 1,
  scale: 1,
  duration: 0.6,
  ease: 'back.out(1.2)'
})

tl.to(circleRocket2, {
  opacity: 0,
  scale: 0,
  duration: 0.6,
  ease: 'power1.in'
})

tl.to(svgPathRocket, {
  strokeDashoffset: pathRocketLength,
  duration: 3,
  ease: 'power1.inOut',
})

tl.to(circleRocket1, {
  opacity: 0,
  scale: 0,
  duration: 0.6,
  ease: 'power1.in'
})

tl.to(rocket, {
  opacity: 0,
  yPercent: -100,
  duration: 2,
  ease: 'power1.in',
  onStart: () => {
    objectsDisappeared.rocket = true
  },
  onReverseComplete: () => {
    objectsDisappeared.rocket = false
  }
}, '+=0.7')

tl.to(circleBoat2, {
  opacity: 0,
  scale: 0,
  duration: 0.6,
  ease: 'power1.in'
})

tl.to(svgPathBoat, {
  strokeDashoffset: pathBoatLength,
  duration: 3,
  ease: 'power1.inOut',
})

tl.to(circleBoat1, {
  opacity: 0,
  scale: 0,
  duration: 0.6,
  ease: 'power1.in'
})

tl.to(boat, {
  opacity: 0,
  yPercent: 50,
  xPercent: -140,
  duration: 2.5,
  ease: 'power1.in',
  onStart: () => {
    objectsDisappeared.boat = true
  },
  onReverseComplete: () => {
    objectsDisappeared.boat = false
  }
}, '+=0.5')

closeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal-info')
    
    let modalType = ''
    let openBtn = null
    let svgPath = null
    let pathLength = 0
    let circle1 = null
    let circle2 = null
    
    if (modal.classList.contains('rocket')) {
      modalType = 'rocket'
      openBtn = openBtnRocket
      svgPath = svgPathRocket
      pathLength = pathRocketLength
      circle1 = circleRocket1
      circle2 = circleRocket2
    } else if (modal.classList.contains('plane')) {
      modalType = 'plane'
      openBtn = openBtnPlane
      svgPath = svgPathPlane
      pathLength = pathPlaneLength
      circle1 = circlePlane1
      circle2 = circlePlane2
    } else if (modal.classList.contains('boat')) {
      modalType = 'boat'
      openBtn = openBtnBoat
      svgPath = svgPathBoat
      pathLength = pathBoatLength
      circle1 = circleBoat1
      circle2 = circleBoat2
    } else if (modal.classList.contains('car')) {
      modalType = 'car'
      openBtn = openBtnCar
      svgPath = null
    }
    
    modalsClosedState[modalType] = true
    
    gsap.to(modal, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(modal, { display: 'none' })
        gsap.to(openBtn, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      }
    })
    
    if (svgPath) {
      gsap.to(circle2, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      
      gsap.to(svgPath, {
        strokeDashoffset: pathLength,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.1
      })
      
      gsap.to(circle1, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.3
      })
    }
  })
})

const openButtons = [
  { btn: openBtnPlane, modal: modalPlane, type: 'plane', svgPath: svgPathPlane, circle1: circlePlane1, circle2: circlePlane2 },
  { btn: openBtnBoat, modal: modalBoat, type: 'boat', svgPath: svgPathBoat, circle1: circleBoat1, circle2: circleBoat2 },
  { btn: openBtnRocket, modal: modalRocket, type: 'rocket', svgPath: svgPathRocket, circle1: circleRocket1, circle2: circleRocket2 },
  { btn: openBtnCar, modal: modalCar, type: 'car', svgPath: null, circle1: null, circle2: null }
]

openButtons.forEach(({ btn, modal, type, svgPath, circle1, circle2 }) => {
  btn.addEventListener('click', () => {
    gsap.to(btn, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(modal, { display: 'block' })
        gsap.to(modal, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
        
        if (svgPath && !objectsDisappeared[type]) {
          gsap.to(circle1, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
          
          gsap.to(svgPath, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
          })
          
          gsap.to(circle2, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
            delay: 0.5
          })
        }
        
        modalsClosedState[type] = false
      }
    })
  })
})