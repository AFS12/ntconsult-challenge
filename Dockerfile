# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta 8080 para acessar a aplicação Vue
EXPOSE 8080

# Comando padrão para iniciar o servidor de desenvolvimento do Vue
CMD ["npm", "run", "serve"]
