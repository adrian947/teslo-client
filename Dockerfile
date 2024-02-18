# Usa una imagen base de Node.js
FROM node:18.16.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto que utiliza tu aplicación
EXPOSE 5173

# Comando para ejecutar tu aplicación
CMD ["npm", "run", "dev"]
