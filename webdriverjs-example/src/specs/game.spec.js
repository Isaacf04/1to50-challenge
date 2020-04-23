const fs = require('fs');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    webdriver.promise.USE_PROMISE_MANAGER = false;

describe('Beating the game', function() {
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(function() {
        driver.quit();
    });

    it('Should navigate to the site', async function() {
        this.timeout(10000);
        driver.get('http://zzzscore.com/1to50/en/');
        //const grid = driver.findElement(By.id('grid'));
        const grid = await driver.findElement(By.id('grid'));
        await driver.wait(until.elementIsVisible(grid), 1000);
    });

    it('Should tap on the grid until I beat the game', async function() {
        this.timeout(20000);
        // Guardo los cuadrados en un array
        let positions = Array(51).fill("");
        for(i = 1; i <= 25; i++) {
            let element = await driver.findElement(By.css(`#grid > div:nth-child(${i})`));
            let index = await element.getText();
            positions[parseInt(index)] = element;
        }
        /*
        Clickeo los primeros 25 cuadrados, y a medida que se actualizan voy guardando los nuevos números generados.
        Cuando paso de los primeros 25 simplemente me limito a clickearlos.
        */
        for(i = 1; i < 26; i++) {
            let element = await positions[i];
            await element.click();
            // Espero a que cambie el número
            await driver.sleep(150);
            // Recibo otro número > 25 y lo guardo en el array
            let index = await element.getText();
            positions[parseInt(index)] = element;
        }
        for(i = 26; i < 51; i++) {
            let element = await positions[i];
            await element.click();
        }
    });

    it('Should get the score', () => {
        driver.takeScreenshot().then(function(data){
            var base64Data = data.replace(/^data:image\/png;base64,/,"")
            fs.writeFile("./src/screenshots/screenshot.png", base64Data, 'base64', function(err) {
                 if(err) console.log(err);
            });
         });
    });
})