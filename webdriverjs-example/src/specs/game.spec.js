const fs = require('fs');
const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

webdriver.promise.USE_PROMISE_MANAGER = false;

const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

describe('Beating the game', function () {
  let driver;

  before(function () {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  });

  after(function () {
    driver.quit();
  });

  it('Should navigate to the site', async function () {
    this.timeout(20000);
    driver.get('http://zzzscore.com/1to50/en/');
    //const grid = driver.findElement(By.id('grid'));
    const grid = await driver.findElement(By.id('grid'));
    await driver.wait(until.elementIsVisible(grid), 1000);
  });

  it('Should tap on the grid until I beat the game', async function () {
    this.timeout(20000);
    for (i = 1; i < 51; i++) {
      let element = await driver.findElement(By.xpath(`//*[@id='grid']/div[text()="${i}"]`));
      await element.click();
    }
  });

  it('Should get the score', () => {
    driver.takeScreenshot().then(function (data) {
      var base64Data = data.replace(/^data:image\/png;base64,/, '');
      fs.writeFile('./src/screenshots/screenshot.png', base64Data, 'base64', function (err) {
        if (err) console.log(err);
      });
    });
  });
});
