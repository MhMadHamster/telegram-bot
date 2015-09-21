var request = require('request');
var cheerio = require('cheerio');
var at = require('at-quotes');
var TelegramBot = require('node-telegram-bot-api');
var token = '';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function(msg) {
	var chatId = msg.chat.id;

	switch(msg.text.toLowerCase()) {
		case '/commands':
		case '/start':
			var message = 'Available commands:\n';
				message += '/commands - list of availalble commands\n';
				message += '/xckd - xckd comics\n';
				message += '/finn - to get finn quote\n';
				message += '/jake - to get jake quoten\n';
				message += '/iceking - to get iceking quote\n';
				message += '_Anything else_ for _anything else_\n';
			bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
			break;
		case '/xckd':
		case 'xckd':
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
			break;
		case '/finn':
		case 'finn':
			bot.sendMessage(chatId, at.getFinnQuote());
			break;
		case '/jake':
		case 'jake':
			bot.sendMessage(chatId, at.getJakeQuote());
			break;
		case '/iceking':
		case 'iceking':
			bot.sendMessage(chatId, at.getIceKingQuote());
			break;
		case 'what time is it?':
		case 'what time is it':
			bot.sendMessage(chatId, 'Adventure time!');
			break;
		default:
			bot.sendMessage(chatId, at.getQuote());
	}
});

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}