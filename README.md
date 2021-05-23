# A very vulnerable GraphQL API

An intentionally vulnerable GraphQL based application.



      Take a look at this for ideas: https://github.com/CarveSystems/vulnerable-graphql-api/blob/master/app.ts


## Getting started

Build docker images and run in development mode:
`docker-compose up -d`

To run without docker you can run (but you will also need to run mongodb):
`yarn install`
`yarn run dev` (serves client and graphql server concurrently)

Rebuild images
`docker-compose down`
`docker-compose build`

Restart containers
`docker-compose up -d --force-recreate`

Logs
`docker-compose logs --tail=10 --follow`

## Seed database

`cd server`
`seed -u 'mongodb://localhost:27017/vuln-graphql-db' --drop-database ./import-data/data`

## Logs

`docker logs --tail=10 -f {service}`

### Hashed Passwords

Example doctor login: dr.john.doe@general-practice-1.com / password

$2b$10$F3iSWtEGYgS8ueqYdSYCguhibBFMA7gKe05uM3W8j1Q9aUN/EIZzK = admin
$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i = password

$2b$10$BCBLMru2qIs3s9xYh2/5O.rDThJCcvkUirzhpV58YfugRc7XL2Xgi = INeURaPhYdraveS
