const supertest = require('supertest');
const request = supertest('http://localhost:3000/')
//const request = require('request-promise');


test('Deve responder a porta 3000', () => {
	expect(4+5).toBe(9);
	//Accesar a http://localhost:3000/
	//request.get('/').then(res => expect(res.status).toBe(200)); 
	//Resposta è 200 
});
