FROM node:14-alpine AS build-env 
WORKDIR /app 

COPY . ./

RUN npm install
RUN npm run build

FROM httpd:alpine

WORKDIR /app
COPY --from=build-env /app/build /usr/local/apache2/htdocs/