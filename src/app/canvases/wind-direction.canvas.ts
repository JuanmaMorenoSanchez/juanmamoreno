import { WIND_DIRECTION_ID } from "@constants/canvas.constants";
import p5, { Color, Image } from "p5";
import { ParticleSystem } from "./particle-system";
import { SessionQuery } from "@store/session.query";
import { SessionStore } from "@store/session.store";

export const WIND_DIRECTION_CANVAS = (p: p5, sessionQuery?: SessionQuery, store?: SessionStore)  => { 
    const moreInfo = "Press 'i' for more information";
    const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    let weatherData: any;
    let stockData: any;
    let windRad: number;
    let windSpeed: number;
    let teslaGrow: number;
    let headGirl: Image; 
    let headAngel: Image;
    let head: Image;
    let canvas;
    let system: ParticleSystem;
    let spawnpoint: Array<number>;
    let showMoreText = false;
    let startTime: number;
    
    //parametrize urls
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=1a330d041afefa98931ce41dda2c2c67&query=JERUSALEM';
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
        p.frameRate(20);
        system = new ParticleSystem(p, p.createVector(spawnpoint[0], spawnpoint[1]));
        startTime = p.millis();
        teslaGrow = Number(getGrow(stockData["Time Series (Daily)"][Object.keys(stockData["Time Series (Daily)"])[0]]["1. open"], stockData["Time Series (Daily)"][Object.keys(stockData["Time Series (Daily)"])[0]]["4. close"]));
        console.log("teslaGrow", teslaGrow)
    }

    p.draw = () => {
        p.clear();
        if (weatherData && stockData){	
            // const bgColor: Color = p.color([0,0,0])
            // p.background(bgColor);

            windRad = weatherData.current.wind_degree;
            windSpeed = weatherData.current.wind_speed;
            getTexts();
            const particleImg: Image = (Math.sign(Number(teslaGrow)) == 1) ? headAngel : head;
  
            system.addParticle(particleImg, windRad, teslaGrow);
            system.run();
            
            if (Math.sign(teslaGrow) == 1){
                // p.background(p.color([180, 255, 220]));
                p.tint(180, 255, 220, 200+p.round(p.random(-10,10)));
            } else {
                                // p.background(p.color([180, 255, 220]));

                p.tint(255, 220, 180, 200+p.round(p.random(-10,10)));
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

    function loadData() {
        const now = new Date().getTime();
        const weatherCache = sessionQuery?.getValue()?.canvasesData?.weather;
        const stockCache = sessionQuery?.getValue()?.canvasesData?.stock;
        const isWeatherFresh = weatherCache && (now - new Date(weatherCache.fetchTime).getTime() < CACHE_EXPIRATION);
        const isStockFresh = stockCache && (now - new Date(stockCache.fetchTime).getTime() < CACHE_EXPIRATION);

        if (isWeatherFresh && weatherCache.data) {
            console.log("cached weather")
            setWeather(weatherCache.data);
        } else {
            p.loadJSON(weatherUrl, setWeather);
        }
        if (isStockFresh && stockCache.data) {
            console.log("cached stock")
            setStock(stockCache.data);
        } else {
            p.loadJSON(wallStreetUrl, setStock);
        }
        p.frameCount = -1;
    }
    
    function drawTopElements(){
        p.rotate(p.PI / 180 * 180);
        p.tint(255, 120);
        p.image(headGirl, p.windowWidth/-1.5+p.round(p.random(-p.windowWidth/10,p.windowWidth/10)), p.windowHeight*-1+p.round(p.random(-2,2)));
        p.noTint();
    }

    function setWeather(weather: any){
        weatherData = weather;
        store?.update({ canvasesData: { 
            weather: { data: weatherData, fetchTime: new Date() },
            stock: { data: stockData, fetchTime: new Date() },
        } });
    }

    function setStock(stock: any){
        stockData = stock;
        store?.update({ canvasesData: { 
            weather: { data: weatherData, fetchTime: new Date() },
            stock: { data: stockData, fetchTime: new Date() },
        } });
    }

    function getGrow(openValue: number, closeValue: number){
        return ((closeValue - openValue) / closeValue) * 100;
    }

    function getTexts() {
        p.fill(200);
        if (p.windowWidth > p.windowHeight) {
            p.textSize(18);
        } else {
            p.textSize(24);
        }
        
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


