var webdriver = require("selenium-webdriver");

var browser = new webdriver.Builder().forBrowser("chrome").build();

browser.get("https://google.com");

var promise = browser.getTitle();

promise.then(function(title){
	console.log(title);
});

browser.quit();