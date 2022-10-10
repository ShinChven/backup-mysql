FROM shinchven/node:16-deployment

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i

CMD ts-node ./src/index.ts
