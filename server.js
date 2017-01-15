const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const app = express();
const port = argv.p || 3000;

app.use(express.static('dist'));
app.get('/')
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
