FROM mhart/alpine-node:latest
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3003