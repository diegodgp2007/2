FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4050

# Configurar para que la aplicación se ejecute en el puerto 4000
ENV PORT=4050

CMD ["npm", "start"]