# Usa a imagem oficial do Node.js na versão 20
FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
# para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta 3000, que é a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
# Assumimos que "npm run dev" é o comando para iniciar o seu servidor de desenvolvimento.
# Se for diferente (ex: "node index.js"), ajuste aqui.
CMD [ "npm", "run", "dev" ]