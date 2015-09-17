var request = require('request');
var cheerio = require('cheerio');
var TelegramBot = require('node-telegram-bot-api');
var token = '';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function(msg) {
	var chatId = msg.chat.id;
	var msgFrom = msg['from']['first_name'];

	var url = 'http://xckd.com/' + randomInt(1, 1578);

	request(url, function(error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var imgLink = 'http:' + $('div#comic > img').attr('src');
			bot.sendMessage(chatId, imgLink);
		} else {
			bot.sendMessage(chatId, 'Something went wrong :(');
		}
	});
});

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}