console.clear();

select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);

const stage = select('.stage');
const tubeInner = select(".tube__inner");
const clone = document.getElementsByClassName("line"); // as need to update node list
const numLines = 10;
const fontSize = gsap.getProperty(':root', '--fontSize');
const angle = 360/numLines;
let radius = 0;
let origin = 0;

function set3D() {
    let width = window.innerWidth;
    let fontSizePx = (width/100)*fontSize;
    radius = (fontSizePx/2)/Math.sin((180/numLines)*(Math.PI/180)); // using Pythagoras Eq
    origin = `50% 50% -${radius}px`;
}

function clodeNode() {
    
    for (var i = 0; i < (numLines-1); i++) {
        let newClone = clone[0].cloneNode(true); // clone the header
        let lineClass = "line--"+(i+2); // create class name to append
        newClone.classList.add(lineClass); // add incremented line class
        tubeInner.appendChild(newClone); // append the clone
    }
    
    clone[0].classList.add("line--1"); // add line1 class to the first node
}

function positionTxt() {
	gsap.set('.line', {
		rotationX: function(index) {
			return -angle*index;
		},
		z: radius,
		transformOrigin: origin
	});
}

function setProps(targets) {
    targets.forEach( function(target) {
        let paramSet = gsap.quickSetter(target, "css");
        let degrees = gsap.getProperty(target, "rotateX");
        let radians = degrees * (Math.PI/180);
        let conversion = Math.abs(Math.cos(radians) / 2 + 0.5); // 1 - 0 half cosine wave
        let fontW = 200 + 700*conversion;
        let fontS = `${100 + 700*conversion}%`;

        paramSet({
            opacity: conversion+0.1, 
            // x: 300*conversion, 
            fontWeight: fontW, 
            fontStretch: fontS 
        });
        console.log(fontW);
    })
}

function scrollRotate() {
    gsap.to('.line', {
        scrollTrigger: {
            trigger: '.stage',
            scrub: 1,
            start: "top top",
            // markers: {
            //     startColor: "white", 
            //     endColor: "red", 
            //     fontSize: "16px", 
            //     fontWeight: "bold", 
            //     indent: 0
            // }
        },
        rotateX: "+=1080",
        onUpdate: function() {
            setProps(this.targets());
        }
    })
    
    gsap.to('.tube', {
        scrollTrigger: {
            trigger: '.stage',
            scrub: 1,
            start: "top top"
        },
        perspective: '1vw',
        ease: 'expo.out'
    })
}

function init() {
    clodeNode();
    set3D();
    window.onresize = () => {
        set3D();
        positionTxt();
    }
    positionTxt(); 
    setProps(gsap.utils.toArray(".line"));
    scrollRotate();
    gsap.to(stage, { autoAlpha: 1, duration: 2, delay: 2 });
}

window.onload = () => {
	init();
};