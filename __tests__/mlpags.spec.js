const request = require('supertest');
const app = require('../src/app')

test('Deve leer petição con sucesso e retornar um objeto com length = limit+1', async () => {
	const numItens = 2;
	await request(app).post('/mlpags')
		.send({search:'mdr7506', limit:numItens})
		.then(res => {
			expect(res.status).toBe(201);
			expect(res.body).toHaveLength(numItens+1);
			// expect(res.body[0]).toHaveProperty('price',22.80);
	});
});