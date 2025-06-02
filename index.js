const express = require('express');

const documentRoutes = require('./routes/document');

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(express.json());

app.use('/documents', documentRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening to port ${ports}`));

/*test*/
