const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: {
    name: 'vuln-graphql',
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./data'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);

console.log('Collections: ', collections);

seeder
  .import(collections)
  .then(() => {
    console.log('Successfully imported collections');
  })
  .catch(err => {
    console.log('Error: ', err);
  });
