ARG VERSION=16.14.2

FROM node:$VERSION AS build

ENV APP /opt/app

WORKDIR $APP

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build && \
  tar -cvf build.tar.gzip \
    dist \
    package.json \
    package-lock.json
  
FROM node:$VERSION

ENV BUILD_DIR /opt/app

WORKDIR $BUILD_DIR

COPY --from=build $BUILD_DIR/build.tar.gzip .

RUN tar -xvf build.tar.gzip
RUN npm ci --production

ENTRYPOINT ["npm"]
CMD ["start"]
