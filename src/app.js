const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('./functions/weather/getWeather');

const app = express();
const PORT = process.env.PORT || 3000;

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and setup views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Kim Nejudne',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Kim Nejudne',
    job: 'Javascript Developer',
    dream: 'becoming an elite javascript master',
    title: 'About',
    image: '../public/img/cat.jpeg',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam animi eligendi, ea dolor autem. Id incidunt, dolorum unde libero. Et.',
    title: 'Help Page',
  });
});

app.get('/help/*', (req, res) => {
  res.render('help', {
    helpText: 'Help article not found',
    title: 'Help Page',
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'No address provided in query.',
    });
    return;
  }
  getWeather(req.query.address, (error, response) => {
    if (error) {
      res.send({
        error
      });
      return;
    }
    res.send({
      address: req.query.address,
      ...response
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'Please provide a search term',
    });
    return;
  }
  res.send({
    prodcuts: [],
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
