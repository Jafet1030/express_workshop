const express = require('express');
const app = express();
const morgan = require('morgan');
const pokemon = require('./routes/pokemon');
const user =  require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).json({code: 200 , message: 'Bienvenido al Pokedex'});
});

app.use('/pokemon', pokemon);
app.use('/user', user);
app.use((req, res, next) => {
  return res.status(404).json({code: 404, message: 'URL no encontrada' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3000}`);
});