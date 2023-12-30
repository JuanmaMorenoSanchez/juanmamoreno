import { WELCOME_ID } from "@constants/canvas.constants";
import * as p5 from "p5";

export const WELCOME_CANVAS = (p: p5) => {
    const TWO_PI = Math.PI*2;
    const speed = 0.005;
    let angle = 0.0;
    let width: number;
    let height: number;
    let prayerNumber: number;
    let prayerAmmount: number;
    let prayer1: p5.Image;
    let prayer2: p5.Image;
    let prayer3: p5.Image;
    let prayer4: p5.Image;
    let cabeza: p5.Image;

    p.preload = () => {
        const imgsRoute = "assets/images/canvases/"
        prayer1 = p.loadImage(`${imgsRoute}pryer1.png`);
        prayer2 = p.loadImage(`${imgsRoute}pryer2.png`);
        prayer3 = p.loadImage(`${imgsRoute}pryer3.png`);
        prayer4 = p.loadImage(`${imgsRoute}pryer4.png`);
        cabeza = p.loadImage(`${imgsRoute}cabeza.png`);
        p.noFill();
    }

    p.setup = () => {
        const canvasDiv = document.getElementById(WELCOME_ID)!;
        width = canvasDiv.offsetWidth;
        height = (p.windowHeight/10)*9.1;

        p.createCanvas(width, height).parent(WELCOME_ID); // IMPORTANT! HAS TO MATCH ID

        p.background(255);
        setRandomValues();
    };
    p.draw = () => {
        let mapped1=p.map(p.mouseX, 0, width, 10, 300);
        let mapped2=p.map(p.mouseY, 0, height, 10, 300);

        p.image(cabeza, width/2-cabeza.width/2, height/2 - cabeza.height/2, cabeza.width, cabeza.height);
        
        p.push();	
        p.translate(width/2, height/2);
        p.rotate(angle);	

      
        for (var i=0; i<prayerAmmount; i++) {
            p.push();
            p.rotate(i*TWO_PI/prayerAmmount);
            p.translate(0, mapped1*1.5);
            for (var j=0; j<prayerAmmount; j++) {
                p.push();
                p.rotate(j*TWO_PI/prayerAmmount);
                p.translate(0, mapped2);
                p.image(getPrayer(), 0, 0, 60, 90);
                    for (var k=0; k<prayerAmmount; k++) {
                        p.push();
                        p.rotate(k*TWO_PI/prayerAmmount);
                        p.translate(0, mapped2);
                        p.image(getPrayer(), 0, 0, 60, 90);
                        p.pop();
                }
                p.pop();
            }
            p.pop();
        }
        p.pop();	
        angle += speed;
    
    }

    p.mouseClicked = () => {
        setRandomValues();
    }
    
    const setRandomValues = () => {
        prayerNumber = Number(Math.floor(Math.random() * 4) + 1);
        prayerAmmount = Number(Math.floor(Math.random() * 6) + 3);
    }
    
    const getPrayer = () => {
        if (prayerNumber == 1){
            return prayer1;
        } 
        if (prayerNumber == 2){
            return prayer2;
        } 
        if (prayerNumber == 3){
            return prayer3;
        } else {
            return prayer4;
        }
    }
}