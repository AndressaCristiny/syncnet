# SyncNet

Este projeto foi desenvolvido como parte do Teste Técnico para Desenvolvedor Júnior no OZmap.
O objetivo é sincronizar dados de um sistema ISP fictício com o OZmap, realizando extração, transformação e carga (ETL) de forma confiável e escalável.

## Índice

- [Introdução](#introdução)
- [Cenário](#cenário)
- [Arquitetura de Software](#arquitetura-de-software)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Licença](#licença)

## Introdução

O sistema ISP contém informações sobre:

- Cabos de fibra óptica (com trajetos georreferenciados)
- Cabos drop (conexões de caixa até cliente)
- Caixas de atendimento
- Clientes conectados

Este serviço em Node.js (TypeScript) consulta periodicamente esses dados (mockados), transforma-os para o formato do OZmap e realiza a integração, tratando falhas, respeitando limites de requisição e armazenando histórico em banco de dados.

## Cenário

Dificuldades a serem tratadas:

- O sistema ISP não possui webhooks → uso de polling periódico.
- A API possui limite de 50 requisições/minuto → controle de rate limit.
- Possibilidade de timeouts e erros HTTP → tratamento com retry/backoff.
- Necessidade de transformar os dados para o formato aceito pelo OZmap.

## Arquitetura de Software

O projeto segue a arquitetura em camadas, separando responsabilidades para garantir organização, escalabilidade e facilidade de manutenção

### Justificativa da escolha

Optei pela arquitetura em camadas por se tratar de um projeto simples e direto, que não demandava uma estrutura complexa. Essa abordagem garante organização e separação de responsabilidades, facilitando a manutenção do código e possíveis evoluções futuras. Além disso, a arquitetura em camadas contribui para a escalabilidade, permitindo que novas funcionalidades sejam incorporadas sem comprometer a essência e a clareza do projeto.

A opção por camadas traz benefícios:

- Separação de responsabilidades → cada parte do código tem um papel claro.
- Testabilidade → mais fácil criar testes unitários isolando cada camada.
- Escalabilidade → novas fontes de dados (outro ISP, por exemplo) podem ser integradas sem impactar outras camadas.
- Manutenção → a equipe pode evoluir o projeto de forma mais segura e organizada.

## Funcionalidades

- Consulta periódica de dados do sistema ISP
- Transformação dos dados para o formato OZmap
- Envio dos dados usando ozmap@ozmap-sdk
- Tratamento de falhas e reprocessamento automático
- Controle de rate limit (50 req/min)
- Armazenamento em MongoDB
- Registro de logs detalhados

## Tecnologias Utilizadas

- Linguagem: Node.js + TypeScript
- Mock de API: json-server
- SDK: ozmap@ozmap-sdk
- Banco de Dados: MongoDB
- Ferramentas: Docker

## Instalação e Execução

Pré-requisitos

- Node.js >= 18
- MongoDB rodando via Docker
- json-server instalado globalmente (`npm install -g json-server`)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/AndressaCristiny/syncnet.git
cd syncnet

# 2. Instale as dependências
npm install

# 3. Suba os containers (MongoDB + dependências)
docker-compose up -d

# 4. Acesse o container do MongoDB
docker exec -it mongo_db_syncnet bash

# 5. Conecte-se ao MongoDB com usuário root
mongosh -u root -p rootpassword --authenticationDatabase admin

# 6. Crie um usuário para administração e acesso ao banco de logs (este user foi criado para fins de testes, não usar em produção)
use admin
db.createUser({
  user: "admin",
  pwd: "adminpassword", // ⚠️ Defina uma senha segura
  roles: [
    { role: "root", db: "admin" },            // Permissões administrativas
    { role: "readWrite", db: "syncnet_logs" } // Permissões no banco de logs
  ]
})
exit

exit

# 7. Suba o mock da API ISP
npm run mock-api

# 8. Inicie o serviço principal
npm run start
```

## Licença

Este projeto é apenas para fins de teste técnico e não deve ser usado em produção.
