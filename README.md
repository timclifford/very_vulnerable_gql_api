# A very vulnerable GraphQL API

An intentionally vulnerable GraphQL based application.


## Getting started

Build docker images and run in development mode:
`docker-compose up -d`

Ports:
`nginx:80` - Load balancer
`graphql:8080` - GraphQL server
`client:3000` - Client-sdie UI (NextJS)
`db:27017` - Database (mongodb) 

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


## Environment variables

Can be changed in `.env`

```
NODE_ENV=development

MONGO_URI=mongodb://db:27017/vuln-graphql
JWT_SECRET=apple

CLIENT_URI=localhost:3000
SERVER_URI=localhost:8000

DOMAIN=localhost
```

## Seed database

`cd server`
`seed -u 'mongodb://localhost:27017/vuln-graphql' --drop-database ./import-data/data`

## Logs

`docker logs --tail=10 -f {service}`

### Hashed Passwords

Example doctor login: dr.john.doe@general-practice-1.com / password

```
$2b$10$F3iSWtEGYgS8ueqYdSYCguhibBFMA7gKe05uM3W8j1Q9aUN/EIZzK = admin
$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i = password

$2b$10$BCBLMru2qIs3s9xYh2/5O.rDThJCcvkUirzhpV58YfugRc7XL2Xgi = INeURaPhYdraveS
```

## Tokens

```
{
  "recepetion_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA1OGVjYmE5MTE4NDUxNjdmZDMwY2IiLCJ1c2VybmFtZSI6ImFkYW0tYW5kcmV3cyIsImVtYWlsIjoiYWRhbS5hbmRyZXdzQGdlbmVyYWwtcHJhY3RpY2UtMS5jb20iLCJpYXQiOjE2MjkxNTA1NTh9.94-gGL74ppZYuJzQr-xAeyod1_LnLc5VlplfQdbVCr0",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkMDMzZTIyYWUzNDhhZWI1NjYwZmMyMTQiLCJ1c2VybmFtZSI6ImRyLWpvaG4tZG9lIiwiZW1haWwiOiJkci5qb2huLmRvZUBnZW5lcmFsLXByYWN0aWNlLTEuY29tIiwiaWF0IjoxNjIyNDgwNjA0fQ.ohG25goI9B7yWXYSAe7pagxyhkUZ0UGS-KhoFlGirVo"
}
```
