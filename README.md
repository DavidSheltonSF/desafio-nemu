# Desafio Nemu 

Objetivo deste desafio desenvolver uma API que capaz de:

- Receber uma planiha com uma lista de touchpoints
- Agrupa-los de acordo com o seu sessionId
- Ordena-los de acordo com sua data de criação
- Exibir os touchpoints agrupados em jornadas

## 📋 Pré-requisitos

- 🐳 **[Docker](https://www.docker.com/)** – Recomendado. Node.js já está incluido no contêiner
- 🧑‍💻 **[Node.js](https://nodejs.org/)** – Apenas necessário se você está executando o app **sem o Docker**


### 📘 Rotas

**⬆️ Upload do arquivo**

POST /journeys

Exemplo de resposta:

```json
{
    "message": "The file data.xlsx was uploaded successfuly"
}

```

**🔍️ Exibir jornadas**

GET /journeys

Exemplo de resposta:

```json
{
    "data": [
        {
            "sessionId": "nemu__0B1wVx9XR",
            "touchPoints": [
                {
                    "createdAt": "2025-05-01 00:03:54",
                    "source": "facebook"
                },
                {
                    "createdAt": "2025-05-01 00:07:26",
                    "source": "organic"
                },
            ]
        },
        {
            "sessionId": "nemu__0B1woA9Xb",
            "touchPoints": [
                {
                    "createdAt": "2025-05-01 00:01:54",
                    "source": "instagram"
                },
                {
                    "createdAt": "2025-05-01 00:04:26",
                    "source": "facebook"
                },
            ]
        }
    ]
}

```

## 📦 Instalação
```bash
git clone https://github.com/DavidSheltonSF/desafio-nemu.git
cd desafio-nemu
npm install
npm run dev
```

## 🐳 Running the app with Docker

You can run the app with the following commands

```bash
docker build -t desafio-nemu .
docker run --env-file .env -p 3000:3000 desafio-nemu
```