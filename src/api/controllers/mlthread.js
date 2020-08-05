const cheerio = require('cheerio');
const request = require('request-promise');
const interval = require('interval-promise');


const mlthread = (req, res) => {
	if (!req.body.search) return res.status(400).json({ error: 'O JSON tem que ter os dado search'});
	if (!req.body.limit) return res.status(400).json({ error: 'O JSON tem que ter os dado limit'});
	/*======================================================*/
	//INICIO

	let rbod = req.body; 
	let search = rbod.search;
	let limit = rbod.limit;
  	

	let nvoLink = '';
	let noQuan = 0;
	let dds = [];
	let ddsJoin = [];
	console.log('SEARCH ('+search+') - LIMIT ('+limit+')')

	/*======================================================*/ 

	const allItens = [
		{
			"name": "Cadeado Mesmo Segredo 25mm Zamac Stam ",
			"link": "https://produto.mercadolivre.com.br/MLB-1051471391-cadeadomesmo-segredo-25mmzamac-stam-_JM?searchVariation=32155276831#searchVariation=32155276831&position=1&type=item&tracking_id=f30403d1-95ae-40c2-8b98-07a75f31d46c",
			"price": 22.80,
			"store": "O Construtor",
			"state": null
		},
		{
			"name": "Cadeado Mesmo Segredo 25mm Zamac Stam ",
			"link": "https://produto.mercadolivre.com.br/MLB-1051471391-cadeadomesmo-segredo-25mmzamac-stam-_JM?searchVariation=32155276831#searchVariation=32155276831&position=1&type=item&tracking_id=f30403d1-95ae-40c2-8b98-07a75f31d46c",
			"price": 22.80,
			"store": "O Construtor",
			"state": null
		}
	];

	res.status(201).json(allItens);
}

module.exports = { mlthread }

