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

	/*======================================================*/
	//FUNCTION FETCHPAGE
	async function fetchPage(url) {
		let dados = {};
		let nextPaglink = '';
		await request(url, function (error, response, body) {

			if (error) {
				console.log("ERROR", error);
				res.send(response.statusCode);
			}

			var $ = cheerio.load(body);

			//ACUMULA INFORMAÇÕES DOS DADOS
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
			});
			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			//LINK DA SIGUIENTE PAGINA
			nextPaglink = $('.andes-pagination__button--next').find('a').attr('href');
			// console.log('nextPaglink: ', nextPaglink);
			// console.log("# DE PRODUTOS =", cnt)
		});
		return [{nextPag:nextPaglink},{dds:dados}];
	}

	function joinObj(obj1,obj2){
		var num = 0; 
		let newobj = []; 
		Object.entries(obj1).forEach(([key1, val1]) => {
			// console.log(key + ' ' + val);
			newobj[num] = val1;
			num++; 
		});
		Object.entries(obj2).forEach(([key1, val2]) => {
			// console.log(key + ' ' + val);
			newobj[num] = val2;
			num++; 
		});
		// console.log(newobj)
		// console.log(num)
		// console.log('# DE PRODUTOS newobj = '+((Object.keys(newobj).length)))
		return newobj;
	}

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
	
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 
	let url = `https://lista.mercadolivre.com.br/${search}`;
	// let url = `https://lista.mercadolivre.com.br/mdr7506#D[A:mdr7506]`;
	// let url = `https://eletronicos.mercadolivre.com.br/audio-fones-ouvido/sony/mdr7506_Desde_49`;

	dds = await fetchPage(url);
	// console.log(dds)

	noQuan = (Object.keys(dds[1].dds).length);
	console.log('# DE PRODUTOS = '+noQuan+' limit = '+limit)

	nvoLink = dds[0].nextPag;
	console.log('Link: '+nvoLink)

	let nv_dds = []; 
	let pass = true;

	ddsJoin = dds[1].dds;
	console.log('# DE PRODUTOS ddsJoin 1 = '+((Object.keys(ddsJoin).length)))
	// console.log(ddsJoin)
	// console.log(ddsJoin[0])

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	//LOOP SIGUIENTES PAGINAS

	while (pass) {

		console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 

		if(nvoLink && (noQuan < limit)){
			nv_dds = await fetchPage(nvoLink);
			// console.log(nv_dds[1].dds[0])

			noQuan += (Object.keys(nv_dds[1].dds).length);
			console.log('# DE PRODUTOS = '+noQuan+' limit = '+limit)

			nvoLink = nv_dds[0].nextPag;
			console.log('Link: '+nvoLink)

			ddsJoin = joinObj(ddsJoin,nv_dds[1].dds);
			console.log('# DE PRODUTOS ddsJoin = '+((Object.keys(ddsJoin).length)))

		}else{
			pass = false
		}
	};

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// 

	// console.log((ddsJoin))
	// console.log('# DE PRODUTOS ddsJoin final = '+((Object.keys(ddsJoin).length)))
	// console.log(typeof(ddsJoin))

	// console.log(ddsJoin[0])


	var ddFinal = [{search:search,limit:limit}];
	for (var i = 1; i <= limit; i++) {
		// console.log(ddsJoin[i]);
		ddFinal[i] = ddsJoin[i];
	}

	console.log('# DE PRODUTOS ddFinal final = '+((Object.keys(ddFinal).length)))

	// console.log(ddFinal[0])

	// console.log((ddFinal))

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	console.log('/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/'); 
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	// return res.json({mlpag: "okokok"});
	return res.json(ddFinal);
	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
}

module.exports = {mlpags}

