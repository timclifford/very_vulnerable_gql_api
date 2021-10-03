## Seeding database

On docker build, the mongodb will be created and seeded with dummy data.

However, to manually seed the database outside of the container you can run (inside `./server`):

`yarn run seed-local`

which will run the following:

`seed -u 'mongodb://{mongodb_host}:27017/vuln-graphql' --drop-database ./import-data/data`

If inside the graphql container, then you can also run `yarn run seed` or `docker-compose exec graphql sh -c "yarn run seed"`


# Keys

Doctor: 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA1OGU4ZTc3MTkwZjQ5ZGY2ZTdkMWIiLCJ1c2VybmFtZSI6ImRyLWpvaG4tZG9lIiwiZW1haWwiOiJkci5qb2huLmRvZUBnZW5lcmFsLXByYWN0aWNlLTEuY29tIiwiaWF0IjoxNjMyMDc3MjI0fQ.bqD3UAP8vdjSTaSeFaMIRpWruEqRUaOmMR0MYprD8Jo"

Receptionist:
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA1OGVjYmE5MTE4NDUxNjdmZDMwY2IiLCJ1c2VybmFtZSI6ImFkYW0tYW5kcmV3cyIsImVtYWlsIjoiYWRhbS5hbmRyZXdzQGdlbmVyYWwtcHJhY3RpY2UtMS5jb20iLCJpYXQiOjE2MzA4NzIwOTl9.LhOfP8m3vUyFnXkhFS-kMSU5Hph9sfH1_1URflgNC-E"


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
