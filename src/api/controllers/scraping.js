const request = require('request');
const cheerio = require('cheerio');


function linloop(num){
	for (var i = 0; i  < num; i++) {
		console.log('\n')
	}
	console.log('AWAWAWAWAWAWAWAWAWAWAWAWAW'); 
}

const scraping = (req, res) => {

	linloop(100)
	let rbod = req.body; 
	let search = rbod.search;
	let limit = rbod.limit;
	// console.log('search '+search+' - '+' limit '+limit)


	//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// return res.json(
	// 	// {
	// 	// 	"name": "Cadeado Mesmo Segredo 25mm Zamac Stam ",
	// 	// 	"link": "https://produto.mercadolivre.com.br/MLB-1051471391-cadeadomesmo-segredo-25mmzamac-stam-_JM?searchVariation=32155276831#searchVariation=32155276831&position=1&type=item&tracking_id=f30403d1-95ae-40c2-8b98-07a75f31d46c",
	// 	// 	"price": 22.80,
	// 	// 	"store": "O Construtor",
	// 	// 	"state": null
	// 	// }
	// 	{ okokokokoko: true }
	// );
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// let brand = 'fones';
	
	 // request("https://www.mercadolivre.com.br/", function (error, response, body) {
	 request("https://lista.mercadolivre.com.br/"+search, function (error, response, body) {

		if (error) {
			res.send(response.statusCode);
		}

		var dados = [];
		var $ = cheerio.load(body);
		$('#searchResults li.results-item').each(function (index){
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
		})

		// res.json({asasasas: "dfdfdfdfdf"});
		return res.json(dados);
	})
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

}

module.exports = {scraping}

