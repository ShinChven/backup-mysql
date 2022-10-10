FROM shinchven/node:16-deployment

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i

RUN npm run compile

RUN rm -rf /usr/src/app/node_modules

FROM shinchven/node:16-deployment

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app /usr/src/app

ENV NODE_ENV=production

RUN npm i --production

CMD node ./lib/index.js
