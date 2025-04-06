import { SessionQuery } from "@shared/store/session.query";
import { SessionStore } from "@shared/store/session.store";
import p5, { Image } from "p5";
import { WIND_DIRECTION_ID } from "../canvas.constants";
import { ParticleSystem } from "../particles/particle-system";

export const WIND_DIRECTION_CANVAS = (p: p5, sessionQuery?: SessionQuery, store?: SessionStore)  => { 
    const moreInfo = "Press 'i' for more information";
    const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const numSources = 7;
    let weatherData: any;
    let stockData: any;
    let windRad: number;
    let windSpeed: number;
    let teslaGrow: number;
    let headGirl: Image; 
    let headAngel: Image;
    let head: Image;
    let canvas;
    let systems: Array<ParticleSystem>;
    let spawnpoint: Array<number>;
    let showMoreText = false;
    let startTime: number;
    let spawnPoints: Array<{ x: number, y: number }> = [];
    
    //parametrize urls
    const weatherUrl = 'https://api.weatherstack.com/current?access_key=1a330d041afefa98931ce41dda2c2c67&query=JERUSALEM';
    const wallStreetUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=ZNJXBTJOOX3LEJ5S'; //25 per day rate limit

    p.preload = () => {
        const imgsRoute = "assets/images/canvases/"
        spawnpoint = [p.windowWidth/2, p.windowHeight/2];

        const isPortrait = p.windowWidth <= p.windowHeight;
        const dimension = isPortrait ? p.windowHeight : p.windowWidth;
        let sizeAsset = dimension <= 800 ? "sm" : "md";
        const headGirlFilename = `head-girl_${sizeAsset}.png`;

        headGirl = p.loadImage(`${imgsRoute}${headGirlFilename}`);
        headAngel = p.loadImage(`${imgsRoute}head-angel.png`);
        head = p.loadImage(`${imgsRoute}head.png`);
    }

    p.setup = () => {
        const canvasDiv = document.getElementById(WIND_DIRECTION_ID)!;
        canvas = p.createCanvas(canvasDiv.offsetWidth, p.windowHeight).parent(WIND_DIRECTION_ID);;
        loadData();
        p.pixelDensity(0.5);
        p.frameRate(30);

        for (let i = 0; i < numSources; i++) {
            const x = p.random(p.width);
            const y = p.random(p.height);
            spawnPoints.push({ x, y });
        }
    
        systems = spawnPoints.map(point => new ParticleSystem(p, p.createVector(point.x, point.y)));
        startTime = p.millis();
    }

    p.draw = () => {
        let t = p.millis() * 0.001;
        drawBackground();
        if (weatherData && stockData){	
            teslaGrow = Number(getGrow(stockData["Time Series (Daily)"][Object.keys(stockData["Time Series (Daily)"])[0]]["1. open"], stockData["Time Series (Daily)"][Object.keys(stockData["Time Series (Daily)"])[0]]["4. close"]));

            windRad = weatherData.current.wind_degree;
            windSpeed = weatherData.current.wind_speed;
            const particleImg: Image = (Math.sign(Number(teslaGrow)) == 1) ? headAngel : head;
            systems.forEach(system => {
                system.addParticle(particleImg, windRad, teslaGrow);
                p.tint(255, 150, 255, 50 + 100 * Math.abs(Math.sin(t)));
                system.run()
            });

            getTexts();
            
            if (Math.sign(teslaGrow) == 1) {
                let greenTint = p.map(teslaGrow, 0, 100, 180, 255);
                p.tint(greenTint, 255, 220, 60);
            } else {
                let redTint = p.map(teslaGrow, -100, 0, 255, 180);
                p.tint(255, redTint, 180, 60);
            }
            
            p.image(headGirl, 0+p.round(p.random(-2,2)), 0+p.round(p.random(-2,2)));
            p.image(headGirl, p.windowWidth/2+p.round(p.random(-2,2)), 0+p.round(p.random(-2,2)));
            p.image(headGirl, p.windowWidth/1.3+p.round(p.random(-2,2)), 0+p.round(p.random(-2,2)));
            p.image(headGirl, p.round(p.random(p.windowWidth,0)), 0+p.round(p.random(-2,2)));

            p.rotate(p.PI / 180 * 180);
            p.image(headGirl, p.windowWidth/-1.5+p.round(p.random((p.windowWidth/3)*-1,(p.windowWidth/3))), p.windowHeight*-1+p.round(p.random(-2,2)));
            
            p.noTint();
        } 
        
    }

    p.keyPressed = () => {
        if (p.key == 'I' || p.keyCode == 73){
            showMoreText = ! showMoreText
        }
        drawTopElements();
        getTexts()
    }

    p.mouseClicked = () => {
        const newSystem = new ParticleSystem(p, p.createVector(p.mouseX, p.mouseY));
        systems.push(newSystem);
    };

    const drawBackground = () => {
        let t = p.millis() * 0.001;
        let gradient = p.drawingContext.createLinearGradient(0, 0, p.width, p.height);
        gradient.addColorStop(0, `rgba(${180 + 50 * Math.sin(t)}, 255, 220, 0.2)`);
        gradient.addColorStop(1, `rgba(255, ${180 + 50 * Math.cos(t * 0.8)}, 180, 0.2)`);
        p.drawingContext.fillStyle = gradient;
        p.rect(0, 0, p.width, p.height);
        if (p.frameCount % 10 < 1) {
            p.fill(255, 10); // flickering overlay
            p.rect(0, 0, p.width, p.height);
        }
    }

    const loadData = () => {
        const now = new Date().getTime();
        const weatherCache = sessionQuery?.canvasWeatherData;
        const stockCache = sessionQuery?.canvasStockData;
        const isWeatherFresh = weatherCache && (now - new Date(weatherCache?.fetchTime).getTime() < CACHE_EXPIRATION);
        const isStockFresh = stockCache && (now - new Date(stockCache.fetchTime).getTime() < CACHE_EXPIRATION);

        if (isWeatherFresh) {
            console.log("cached weather")
            setWeather(weatherCache?.data);
        } else {
            console.log("fetching weather")
            p.loadJSON(weatherUrl, setWeather);
        }
        if (isStockFresh) {
            console.log("cached stock")
            setStock(stockCache.data);
        } else {
            console.log("fetching stock")
            p.loadJSON(wallStreetUrl, setStock);
        }
        p.frameCount = -1;
    }
    
    const drawTopElements = () => {
        p.rotate(p.PI / 180 * 180);
        p.tint(255, 120);
        p.image(headGirl, p.windowWidth/-1.5+p.round(p.random(-p.windowWidth/10,p.windowWidth/10)), p.windowHeight*-1+p.round(p.random(-2,2)));
        p.noTint();
    }

    const setWeather = (weather: any) => {
        weatherData = weather;
        store?.update( { canvasDataWeather: { data: weather, fetchTime: new Date() } } );
    }

    const setStock = (stock: any) => {
        stockData = stock;
        store?.update( { canvasDataStock: { data: stock, fetchTime: new Date() } } );
    }

    const getGrow = (openValue: number, closeValue: number) => {
        return ((closeValue - openValue) / closeValue) * 100;
    }

    const getTexts = () => {
        p.stroke(0); // Black outline
        p.strokeWeight(2);
        p.fill(255);
        p.textSize(p.windowWidth > p.windowHeight ? 18: 24);
        
        if (!showMoreText) {
            p.text(moreInfo, 10, 40)
        }
        else {
            if (weatherData){
                p.text("Wind direction in "+weatherData.location.name+" :"+weatherData.current.wind_dir+" (direction: "+windRad+"). Wind speed: "+windSpeed+" KPH", 10, 70);
            } else {
                p.text("Loading weather in Jerusalem...", 10, 70);
            }
            
            if (stockData){
                p.text("Tesla stock performed "+teslaGrow+"% (Last update: "+Object.keys(stockData["Time Series (Daily)"])[0]+")", 10, 90);
            } else {
                p.text("Loading Tesla stock grow...", 10, 90);
            }
        }
    }

}


