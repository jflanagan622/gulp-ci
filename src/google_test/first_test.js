var webdriver = require("selenium-webdriver");

var browser = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

browser.get("https://vettopet.io");
//browser.sleep(10000);
//const signinLink = browser.getElementById("signup-swap-to-login");
browser.wait(function() {
    return browser.getTitle().then(function(title) {
		console.log(title);
        return title === "Welcome to Petted!";
    });
}, 1000);


//signinLink.click();