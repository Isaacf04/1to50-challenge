describe('Beating the game', function()  {
    it('Should navigate to the site', () => {
        browser.url(`${browser.options.baseUrl}`);
        $('#grid').waitForDisplayed();
    });
    it('Should tap on the grid until I beat the game', () => {
        // Guardo los cuadrados en un array
        let positions = Array(51).fill("");
        for(i = 1; i <= 25; i++) {
            element = $('#grid').$(`div:nth-child(${i})`);
            positions[parseInt(element.getText())] = element;
        }
        /*
        Clickeo los primeros 25 cuadrados, y a medida que se actualizan voy guardando los nuevos números generados.
        Cuando paso de los primeros 25 simplemente me limito a clickearlos.
        */
        for(i = 1; i < 26; i++) {
            positions[i].click();
            // Espero a que cambie el número
            browser.pause(150);
            // Recibo otro número > 25 y lo guardo en el array
            positions[parseInt(positions[i].getText())] = positions[i];
        }
        for(i = 26; i < 51; i++) {
            positions[i].click();
        }
    });
    it('Should get the score', () => {
        browser.saveScreenshot('./src/screenshots/screenshot.png');
    })
})