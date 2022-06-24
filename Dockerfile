FROM mhart/alpine-node:14
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3003