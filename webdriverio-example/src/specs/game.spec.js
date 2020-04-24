describe('Beating the game', function () {
    it('Should navigate to the site', () => {
      browser.url(`${browser.options.baseUrl}`);
      $('#grid').waitForDisplayed();
    });
    it('Should tap on the grid until I beat the game', () => {
      // Clickeo en los números en orden
      const grid = $('#grid');
      for (i = 1; i < 51; i++) {
        grid.$(`div=${i}`).click();
      }
    });
    it('Should get the score', () => {
      browser.saveScreenshot('./src/screenshots/screenshot.png');
    });
  });
  