const cheerio = require('cheerio');
const request = require('request-promise');
const interval = require('interval-promise');


const mlpags = async (req, res) => {

	function linloop(num){
		for (var i = 0; i  < num; i++) {
			console.log('\n')
		}
	}

	linloop(100)


	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// FUNÇÃO LOOP
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// // request("https://www.mercadolivre.com.br/", function (error, response, body) {
	// request(`https://lista.mercadolivre.com.br/${search}]`, function (error, response, body) {

	// 	if (error) {
	// 		console.log("ERROR", error);
	// 		res.send(response.statusCode);
	// 	}

	// 	var dados = [];
	// 	var $ = cheerio.load(body);
	// 	$('#searchResults li.results-item').each(function (index){
	// 		cnt++
	// 		dados[index] = {};
	// 		dados[index]['name'] = $(this).find('.list-view-item-title').text().trim();
	// 		dados[index]['link'] = $(this).find('.item__js-link').attr('href');
	// 		let decimal = $(this).find('div.item__price > span.price__decimals').text().trim();
	// 		let price = $(this).find('div.item__price > span.price__fraction').text().trim();
	// 		dados[index]['price'] = price.replace('.', '') + (decimal != '' ? '.' + decimal : '.00');
	// 		dados[index]['store'] = $(this).find('.item__brand-link').text().trim();
	// 		dados[index]['state'] = $(this).find('.item__condition').text().trim();
	// 		// dados[index]['productML'] = $(this).find('div.rowItem').attr('id');
	// 		// dados[index]['shipping'] = $(this).find('div.item__shipping > p').text().trim();
	// 		// dados[index]['link_pag'] = $(this).find('.andes-pagination__button--next').text();
	// 		// console.log(dados);
	// 	});

	// 	console.log("# DE PRODUTOS =", cnt)
	// 	console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 


	// 	// return res.json(dados);
	// });
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

	// requestBody(`https://lista.mercadolivre.com.br/${search}]`);

	// request(`https://lista.mercadolivre.com.br/${search}]`, function (error, response, body) {


	// });


	async function fetchPage(url) {
		let cnt = 0;
		let nextPaglink = '';
		let dados = {};
	    await request(url, function (error, response, body) {

			if (error) {
				console.log("ERROR", error);
				res.send(response.statusCode);
			}

			var $ = cheerio.load(body);

			//ACUMULA INFORMAÇÕES DOS DADOS
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
			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			//LINK DA SIGUIENTE PAGINA
			nextPaglink = $('.andes-pagination__button--next').find('a').attr('href');
			// console.log('nextPaglink: ', nextPaglink);
			// console.log("# DE PRODUTOS =", cnt)
			// res.json({asasasas: "dfdfdfdfdf"});
			// console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 
		});
		return [{noitns:cnt,nextPag:nextPaglink},{dds:dados}];
	}

	/*======================================================*/
	
	let rbod = req.body; 
	let search = rbod.search;
	let limit = rbod.limit;
	var nvoLink = '';
	var noQuan = 0;
	var dds = [];
	var ddsData = [];
	var ddsDataPag = [];
	var ddsMerge = [];
	console.log('SEARCH ('+search+') - LIMIT ('+limit+')')

	console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 
	let url = `https://lista.mercadolivre.com.br/${search}`;
	// let url = `https://lista.mercadolivre.com.br/mdr7506#D[A:mdr7506]`;
	// let url = `https://eletronicos.mercadolivre.com.br/audio-fones-ouvido/sony/mdr7506_Desde_49`;

	dds = await fetchPage(url);
	// console.log(dds)

	noQuan = dds[0].noitns;
	console.log('# DE PRODUTOS = '+noQuan+' limit = '+limit)

	nvoLink = dds[0].nextPag;
	console.log('Link: '+nvoLink)

	var nv_dds = []; 
	let pass = true;

	ddsMerge = dds[1].dds;

	// ddsData = [...ddsData, ...dds[1].dds];

	while (pass) {

		if(nvoLink && (noQuan < limit)){
			nv_dds = await fetchPage(nvoLink);

			noQuan += nv_dds[0].noitns;
			console.log('# DE PRODUTOS = '+noQuan+' limit = '+limit)

			nvoLink = nv_dds[0].nextPag;
			console.log('Link: '+nvoLink)

			ddsMergePag = nv_dds[1].dds

			// console.log(typeof(nv_dds[1].dds))
			// console.log(typeof(ddsDataPag))
			// ddsMerge = [nv_dds[1].dds, ...ddsMerge];

			ddsMerge = {...ddsMerge, ...nv_dds[1].dds };
			
		}else{
			pass = false
		}
	};

	// console.log(ddsMerge)



	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

	// console.log('# DE PRODUTOS = '+dds[0].noitns)
	// console.log('Link: '+dds[0].nextPag)
	// console.log(dds[1].dds)

	// if (noQuan < limit){
	// 	console.log('# DE PRODUTOS = '+dds[0].noitns)
	// 	console.log('Link: '+dds[0].nextPag)
	// 	if(nvoLink){

	// 	}else{

	// 	}
	// }else{

	// }

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// do {
	//    i += 1;
	//    resultado += i + ' ';
	// } while (i < 5);
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

	// if((noQuan < limit) && (typeof(nvoLink) !== 'undefined'  )){
	// }
	console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 

	/*======================================================*/

	// var $ = cheerio.load(body);
	// Coleta o numero de itens por pagina
	// compara como o limite
	// Check si tem ultima pagina ou não


	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// const array1 = ["Vijendra","Singh"];
	// const array2 = ["Singh", "Shakya"];
	// const array3 = [...array1, ...array2];
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// var promises = [];

	// for (var i = 0; i < sub; i++) {
	// 	const promise = request("https://api.nasa.gov/planetary/apod?date=" + subtractDate(enddate, i) + "&api_key=DEMO_KEY");
	// 	promises.push(promise);
	// }

	// const array = await Promise.all(promises);
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// var parar = 0;
	// async function main() {
	// 	try {
	// 		if (parar <= 5) {
	// 			console.log(`Ta indo ${parar}\n`);

	// 			parar++
	// 		} else {
	// 			console.log('Não existem novas urls disponíveis.\n')
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// interval(async () => {
	// 	await main()
	// }, 1000)
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/




	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
	return res.json({mlpag: "okokok"});
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

}

module.exports = {mlpags}

