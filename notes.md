## Vulnerable API and application
Based off starter gh package:
https://github.com/nreoch25/nextjs-graphql-hooks-auth

admin TOKEN
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkMDMzZTIyYWUzNDhhZWI1NjYwZmMyMTUiLCJ1c2VybmFtZSI6ImRyLXJhY2hlbC1hZGFtcyIsImVtYWlsIjoiZHIucmFjaGVsLmFkYW1zQGdlbmVyYWwtcHJhY3RpY2UtMi5jb20iLCJpYXQiOjE1OTUxOTU2Nzh9.C6CbWhv76NGPhzfFMONGZ1yYIihwUuDVak8L1zvtDDc`

### Cracking the jwt with go-jwt-cracker
~/web/jwt-pwn/go-jwt-cracker (master %=) $ ./go-jwt-cracker --wordlist ~/SecLists/Passwords/probable-v2-top12000.txt -token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkMDMzZTIyYWUzNDhhZWI1NjYwZmMyMTUiLCJ1c2VybmFtZSI6ImRyLXJhY2hlbC1hZGFtcyIsImVtYWlsIjoiZHIucmFjaGVsLmFkYW1zQGdlbmVyYWwtcHJhY3RpY2UtMi5jb20iLCJpYXQiOjE1OTUxOTU2Nzh9.C6CbWhv76NGPhzfFMONGZ1yYIihwUuDVak8L1zvtDDc"
[+] Key Found: secret

## Setup
To run in development mode

  `docker-compose up`
  `yarn run dev` (serves client side and graphql server concurrently)

## Authentication

Uses JWT for sessions

Auth over http
Auth over websocket


## Seed database

  `seed -u 'mongodb://localhost:27017/vuln-graphql-db' --drop-database ./import-data/data`

## Mail

We have setup https://mailtrap.io/inboxes to handle password resets. Configurable via env vars.


## Logs

  `docker logs --tail=10 -f graphql`


### Issues

Switching between docker networks
  docker network prune

  docker-compose build --no-cache --force-rm graphql
  docker-compose down
  docker-compose up -d --force-recreate

If still nothing, rebuild everything
  docker-compose build --no-cache --force-rm


nginx port collision - disbale pygmy

#### DNS issue
`Network error: request to http://nginx/graphql failed, reason: getaddrinfo ENOTFOUND nginx nginx:80`
Check Logs
  docker logs --tail=10 -f graphql

  There is probably no authoration header set (req.headers.authorization)
  Add a valid auth token to GQL header

  ```
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkMDMzZTIyYWUzNDhhZWI1NjYwZmMyMTUiLCJ1c2VybmFtZSI6ImRyLXJhY2hlbC1hZGFtcyIsImVtYWlsIjoiZHIucmFjaGVsLmFkYW1zQGdlbmVyYWwtcHJhY3RpY2UtMi5jb20iLCJpYXQiOjE1OTUxOTU2Nzh9.C6CbWhv76NGPhzfFMONGZ1yYIihwUuDVak8L1zvtDDc"
  }
  ```

  Or..
  There is an existing one that needs removong from localStorage in th browser.

`MongooseServerSelectionError: getaddrinfo ENOTFOUND db db:27017`


Client side 500
`Error: "Network error: Response not successful: Received status code 500"`


#### Other
  docker-compose down
  docker-compose up -d --force-recreate

  nvm use 14
  rm -rf ./node_modules && yarn install
