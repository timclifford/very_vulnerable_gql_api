FROM node:alpine

EXPOSE 3000
WORKDIR /app

COPY ./package.json ./postcss.config.js ./tailwind.config.js ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build
CMD ["yarn", "start"]
