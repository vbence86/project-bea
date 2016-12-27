const express = require('express');
const livereload = require('connect-livereload');

const app = express();

app.use(livereload({ port: 35729 }));
app.use(express.static('dist'));
app.get('/')
app.listen(3000);
