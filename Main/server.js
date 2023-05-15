
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const { json } = require('sequelize');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sesh = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: false, 
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true, 
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session(sesh));
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false}).then(()=>{
  app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))
});

