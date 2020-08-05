const index = (req, res) => {
	// return res.json({ ok: true });
	//return res.json({ get: 'Get Funcionando' });
	//res.status(200).send();
	res.status(200).json({ get: 'Get Funcionando' });
}

module.exports = {
	index
}

