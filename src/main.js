import './style.css';
import gsap from 'gsap';
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sélection des éléments
const plane = document.getElementById('plane')
const rocket = document.getElementById('rocket')
const boat = document.getElementById('boat')

// Sélection des modals
const modalRocket = document.querySelector('.modal-info.rocket')
const modalPlane = document.querySelector('.modal-info.plane')
const modalBoat = document.querySelector('.modal-info.boat')
const modalCar = document.querySelector('.modal-info.car')

// Sélection de tous les boutons de fermeture et d'ouverture
const closeBtns = document.querySelectorAll('.modal-close')
const openBtnPlane = document.querySelector('.open-plane')
const openBtnBoat = document.querySelector('.open-boat')
const openBtnRocket = document.querySelector('.open-rocket')
const openBtnCar = document.querySelector('.open-car')

// SVG Paths
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

// Variables pour tracker si les modals ont été fermées manuellement
let modalsClosedState = {
  rocket: false,
  plane: false,
  boat: false,
  car: false
}

// Variables pour tracker si les objets ont disparu
let objectsDisappeared = {
  rocket: false,
  boat: false
}

// États initiaux
gsap.set(plane, { opacity: 0, yPercent: -100, xPercent: -100 })
gsap.set(rocket, { yPercent: 0 })
gsap.set(boat, { xPercent: 0, yPercent: 0 })
gsap.set([modalRocket, modalPlane, modalBoat, modalCar], { opacity: 0, scale: 0.8 })
gsap.set([openBtnPlane, openBtnBoat, openBtnRocket, openBtnCar], { opacity: 0, scale: 0 })

// Timeline principale avec ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#infographic',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    markers: true,
    onUpdate: (self) => {
      // Réinitialiser tous les flags quand on revient en haut
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
        // Cache tous les boutons d'ouverture
        gsap.set([openBtnPlane, openBtnBoat, openBtnRocket, openBtnCar], { opacity: 0, scale: 0 })
      }
    }
  }
})

// 1. AVION - Apparition en fade in
tl.to(plane, {
  opacity: 1,
  yPercent: 0,
  xPercent: 0,
  duration: 1
})

// Modal AVION apparaît
tl.to(modalPlane, {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: 'back.out(1.7)',
  onStart: () => {
    if (!modalsClosedState.plane) {
      gsap.set(modalPlane, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalPlane, { opacity: 0, scale: 0.8 })
  }
}, '+=0.3')

tl.to(svgPathPlane, {
  strokeDashoffset: 0,
  duration: 2,
  ease: 'power2.inOut',
})

// 2. FUSÉE - Modal apparaît
tl.to(modalRocket, {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: 'back.out(1.7)',
  onStart: () => {
    if (!modalsClosedState.rocket) {
      gsap.set(modalRocket, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalRocket, { opacity: 0, scale: 0.8 })
  }
}, '+=0.5')

tl.to(svgPathRocket, {
  strokeDashoffset: 0,
  duration: 2,
  ease: 'power2.inOut',
})

// 4. Modal VOITURE apparaît
tl.to(modalCar, {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: 'back.out(1.7)',
  onStart: () => {
    if (!modalsClosedState.car) {
      gsap.set(modalCar, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalCar, { opacity: 0, scale: 0.8 })
  }
}, '+=0.5')

// Modal BATEAU apparaît
tl.to(modalBoat, {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: 'back.out(1.7)',
  onStart: () => {
    if (!modalsClosedState.boat) {
      gsap.set(modalBoat, { display: 'block' })
    }
  },
  onReverseComplete: () => {
    gsap.set(modalBoat, { opacity: 0, scale: 0.8 })
  }
}, '+=0.3')

tl.to(svgPathBoat, {
  strokeDashoffset: 0,
  duration: 2,
  ease: 'power2.inOut',
})

tl.to(svgPathRocket, {
  strokeDashoffset: pathRocketLength,
  duration: 2,
  ease: 'power2.inOut',
})

// Fusée décolle - marque l'objet comme disparu
tl.to(rocket, {
  opacity: 0,
  yPercent: -100,
  duration: 1,
  onStart: () => {
    objectsDisappeared.rocket = true
  },
  onReverseComplete: () => {
    objectsDisappeared.rocket = false
  }
}, '+=0.5')

tl.to(svgPathBoat, {
  strokeDashoffset: pathBoatLength,
  duration: 2,
  ease: 'power2.inOut',
})

// 3. BATEAU - disparaît du port - marque l'objet comme disparu
tl.to(boat, {
  opacity: 0,
  yPercent: 50,
  xPercent: -180,
  duration: 1.5,
  onStart: () => {
    objectsDisappeared.boat = true
  },
  onReverseComplete: () => {
    objectsDisappeared.boat = false
  }
}, '+=0.3')

// INTERACTION : Fermeture des modals au clic
closeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Trouve la modal parente
    const modal = e.target.closest('.modal-info')
    
    // Détermine quelle modal fermer, quel bouton afficher et quel SVG path cacher
    let modalType = ''
    let openBtn = null
    let svgPath = null
    let pathLength = 0
    
    if (modal.classList.contains('rocket')) {
      modalType = 'rocket'
      openBtn = openBtnRocket
      svgPath = svgPathRocket
      pathLength = pathRocketLength
    } else if (modal.classList.contains('plane')) {
      modalType = 'plane'
      openBtn = openBtnPlane
      svgPath = svgPathPlane
      pathLength = pathPlaneLength
    } else if (modal.classList.contains('boat')) {
      modalType = 'boat'
      openBtn = openBtnBoat
      svgPath = svgPathBoat
      pathLength = pathBoatLength
    } else if (modal.classList.contains('car')) {
      modalType = 'car'
      openBtn = openBtnCar
      svgPath = null
    }
    
    // Met à jour le state
    modalsClosedState[modalType] = true
    
    // Anime la fermeture de la modal
    gsap.to(modal, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(modal, { display: 'none' })
        // Affiche le bouton d'ouverture
        gsap.to(openBtn, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      }
    })
    
    // Fait disparaître le SVG path si il existe
    if (svgPath) {
      gsap.to(svgPath, {
        strokeDashoffset: pathLength,
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  })
})

// INTERACTION : Ouverture des modals au clic sur les boutons open
const openButtons = [
  { btn: openBtnPlane, modal: modalPlane, type: 'plane', svgPath: svgPathPlane },
  { btn: openBtnBoat, modal: modalBoat, type: 'boat', svgPath: svgPathBoat },
  { btn: openBtnRocket, modal: modalRocket, type: 'rocket', svgPath: svgPathRocket },
  { btn: openBtnCar, modal: modalCar, type: 'car', svgPath: null }
]

openButtons.forEach(({ btn, modal, type, svgPath }) => {
  btn.addEventListener('click', () => {
    // Cache le bouton d'ouverture
    gsap.to(btn, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        // Affiche la modal
        gsap.set(modal, { display: 'block' })
        gsap.to(modal, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
        
        // Redessine le SVG path SEULEMENT si l'objet n'a pas disparu
        if (svgPath && !objectsDisappeared[type]) {
          gsap.to(svgPath, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: 'power2.out'
          })
        }
        
        // Réinitialise le state
        modalsClosedState[type] = false
      }
    })
  })
})