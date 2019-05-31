var webdriver = require("selenium-webdriver");

var browser = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();

browser.get("https://google.com");
 

browser.wait(function() {
    return browser.getTitle().then(function(title) {
		console.log(title);
        return title === "Google";
    });
}, 1000);