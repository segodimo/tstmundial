const app = require('./app');
// const path = require('path');
// const express = require('express');


//start server
app.listen(app.get('port'), () => {
	console.log('Server listening on port ', app.get('port'))
})