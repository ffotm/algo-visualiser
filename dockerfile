# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass the API key as a build argument
ARG API_KEY
ENV API_KEY=$API_KEY

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
