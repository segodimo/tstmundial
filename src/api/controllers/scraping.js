const request = require('request');
const cheerio = require('cheerio');


function linloop(num){
	for (var i = 0; i  < num; i++) {
		console.log('\n')
	}

	console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 
}

var cnt = 0;

const scraping = (req, res) => {

	linloop(100)
	let rbod = req.body; 
	let search = rbod.search;
	let limit = rbod.limit;
	console.log('SEARCH ('+search+') - LIMIT ('+limit+')')

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// FUNÇÃO LOOP
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// request("https://www.mercadolivre.com.br/", function (error, response, body) {
	request(`https://lista.mercadolivre.com.br/${search}]`, function (error, response, body) {

		if (error) {
			console.log("ERROR", error);
			res.send(response.statusCode);
		}

		var dados = [];
		var $ = cheerio.load(body);
		$('#searchResults li.results-item').each(function (index){
			cnt++
			dados[index] = {};
			dados[index]['name'] = $(this).find('.list-view-item-title').text().trim();
			dados[index]['link'] = $(this).find('.item__js-link').attr('href');
			let decimal = $(this).find('div.item__price > span.price__decimals').text().trim();
			let price = $(this).find('div.item__price > span.price__fraction').text().trim();
			dados[index]['price'] = price.replace('.', '') + (decimal != '' ? '.' + decimal : '.00');
			dados[index]['store'] = $(this).find('.item__brand-link').text().trim();
			dados[index]['state'] = $(this).find('.item__condition').text().trim();
			// dados[index]['productML'] = $(this).find('div.rowItem').attr('id');
			// dados[index]['shipping'] = $(this).find('div.item__shipping > p').text().trim();
			// dados[index]['link_pag'] = $(this).find('.andes-pagination__button--next').text();
			// console.log(dados);
		});

		console.log("# DE PRODUTOS =", cnt)
		// res.json({asasasas: "dfdfdfdfdf"});
		console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 
		return res.json(dados);
	});
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

}

module.exports = {scraping}

