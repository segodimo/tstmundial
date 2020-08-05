const request = require('supertest');
const app = require('../src/app')

//test('Deve retornar JSON resultante', () => {
//	return request(app).get('/mlthread').then(res => {
//		expect(res.status).toBe(200);
//		expect(res.body).toHaveLength(1);
//		expect(res.body[0]).toHaveProperty('txt','mlthread');
//	});
//});

test('Deve ter o dado do search que é obrigatorio', () => {
	return request(app).post('/mlthread')
		.send({limit:2})
		.then(res => {
			expect(res.status).toBe(400);
	});
});

// test('Deve leer petição con sucesso', () => {
// 	const numItens = 2;
// 	return request(app).post('/mlthread')
// 		.send({search:'mdr7506', limit:numItens})
// 		.then(res => {
// 			expect(res.status).toBe(201);
// 			expect(res.body).toHaveLength(numItens);
// 			expect(res.body[0]).toHaveProperty('price',22.80);
// 	});
// });

test('Deve leer petição con sucesso e retornar com length = limit', async () => {
	const numItens = 2;
	await request(app).post('/mlthread')
		.send({search:'mdr7506', limit:numItens})
		.then(res => {
			expect(res.status).toBe(201);
			expect(res.body).toHaveLength(numItens);
			expect(res.body[0]).toHaveProperty('price',22.80);
	});
});


