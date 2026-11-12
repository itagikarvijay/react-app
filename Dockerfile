FROM node:20-alpine3.20
WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
