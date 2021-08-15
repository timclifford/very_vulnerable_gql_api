## Seeding database

On docker build, the mongodb will be created and seeded with dummy data.

However, to manually seed the database outside of the container you can run (inside `./server`):

`yarn run seed-local`

which will run the following:

`seed -u 'mongodb://{mongodb_host}:27017/vuln-graphql' --drop-database ./import-data/data`

If inside the graphql container, then you can also run `yarn run seed` or `docker-compose exec graphql sh -c "yarn run seed"`



## Mutation examples

```
mutation updatePatient {
	updatePatient(input: {
    patient: {
      _id: "61058f1342af852451f83cd3"
    },
    patch: {
      name: "Kevin Vardy"
    }
  }) {
    _id
    name
    age
    doctor
  }
}
```

```
mutation deletePatient {
  deletePatient(input: {
		patient: {
      _id: "61058f1342af852451f83cd3"
    }
  }
)}
```
