/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn, TouristActivity } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: 'ARG',
  name: 'Argentina',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png',
  continent: 'South America',
  capital: 'Buenos Aires',
  };

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
});

const countryDetail = 'ARG'

describe('Country Detail route', () => {
  before(() => conn.authenticate()
  .catch((error) => {
    console.error(error.message)
  }));
  beforeEach(() => Country.sync({force: true})
  .then(() => Country.create(country)));
  describe('GET /countries/arg', () => {
    it('should get 200', () => agent.get(`/countries/${countryDetail}`).expect(200))
  })
})

const newActivity = {
  name: 'Ski',
  difficulty: 3,
  duration: '60',
  season: ['summer'],
  image: 'https://www.nevasport.com/fotos/240422/950476_tn379x252y.jpg',
  codeCountry: 'ARG'
}

describe('Activity route', () => {
 before(() => conn.authenticate()
 .catch((error)=> {
  console.error(error.message)
 }));
 beforeEach(()=> TouristActivity.sync({force: true}));
 describe('POST/ activities', ()=> {
  it('should get 200', () => agent.post('/activities').send(newActivity)
  .then((res)=> {
    expect(res.statusCode).equal(200)
  }));
 }) ;
});