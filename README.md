# Desafio Técnico Scoder - ContAI

---

## Sobre o Projeto ContAI

A ContAI é uma empresa reconhecida no mercado contábil, e este projeto visa desenvolver uma **solução tecnológica para otimizar o processo de registro e visualização de lançamentos contábeis**.

A plataforma ContAI permitirá:

* **Cadastro de Lançamentos Financeiros**: Registrar de forma simples e eficiente todos os lançamentos de produtos da empresa.
* **Visualização Organizada**: Exibir esses registros em tabelas organizadas por mês do ano, facilitando a consulta e o acompanhamento.
* **Faturamento Mensal**: Apresentar o faturamento total ao final de cada mês, fornecendo um panorama financeiro rápido e claro.
* **Gestão Estratégica**: Capturar e salvar os dados em um banco de dados robusto, permitindo que o setor contábil realize análises aprofundadas e tome decisões estratégicas baseadas em informações precisas.

Em suma, o ContAI é uma ferramenta pensada para trazer mais eficiência, organização e inteligência para a gestão financeira de produtos, desde o registro até a análise de resultados.

---

## Como Rodar na Sua Máquina

Para colocar o projeto ContAI em funcionamento, siga os passos abaixo:

### 1. Inicializar o Backend (com Docker)

O backend da aplicação será executado em um contêiner Docker, juntamente com o banco de dados PostgreSQL.

1.  Navegue até a pasta `backend` pelo seu terminal:
    ```bash
    cd backend
    ```
2.  Suba os serviços do Docker Compose (backend e banco de dados):
    ```bash
    docker compose up --build -d
    ```
    * Este comando construirá as imagens (se necessário) e iniciará o backend e o PostgreSQL em segundo plano.
    * Aguarde alguns instantes para que os serviços iniciem completamente.
    * Você pode verificar se os contêineres estão rodando com `docker ps`.
    * Para parar e remover os contêineres e volumes (dados do banco de dados), use:
        ```bash
        docker compose down -v
        ```

### 2. Inicializar o Frontend (Nativamente)

O frontend da aplicação será executado diretamente na sua máquina usando Node.js.

1.  Abra um **novo terminal** e navegue até a pasta `frontend`:
    ```bash
    cd frontend
    ```
2.  Instale as dependências do frontend (se ainda não o fez):
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```
    * O frontend estará disponível em `http://localhost:5173/`
---
