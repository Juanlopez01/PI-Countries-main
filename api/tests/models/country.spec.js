const { Country, conn, TouristActivity } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});

describe('TouristActivity model', () => {
  before(() => conn.authenticate()
  .catch((error) => {
    console.error(error.message)
  }));
  describe('Validators', () => {
    beforeEach(() => TouristActivity.sync({force: true}));
    describe('name', () => {
      it('should throw an error if some data is missed', (done) => {
        TouristActivity.create({})
        .then(() => done(new Error('Required Data')))
        .catch(() => done())
      });
      it('should work when the data is valid', () => {
        TouristActivity.create({
          name: 'Ski',
          difficulty: 3,
          duration: '60',
          season: ['summer'],
          image: 'https://www.nevasport.com/fotos/240422/950476_tn379x252y.jpg',
          codeCountry: 'ARG'
        })
      })
    })
  })

})
