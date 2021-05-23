## Seeding database

On docker build, the mongodb will be created and seeded with dummy data.

However, to manually seed the database outside of the container you can run (inside `./server`):

`yarn run seed-local`

which will run the following:

`seed -u 'mongodb://{mongodb_host}:27017/vuln-graphql-db' --drop-database ./import-data/data`

If inside the graphql container, then you can also run `yarn run seed`
