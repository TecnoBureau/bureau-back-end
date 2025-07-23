# Bureau Back End

API para gerenciamento de inscrições do Bureau.

## Instalação

```bash
npm install
```

## Rodando localmente

```bash
npm run dev
```

## Variáveis de Ambiente

Veja o arquivo `.env.exemple` para todas as variáveis necessárias. Exemplo:

```
MONGO_URI=mongodb://localhost:27017/
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

## Testes

```bash
npm test
```

## Documentação Swagger

Acesse `/v1/api/swagger` após rodar o servidor para visualizar a documentação interativa.

## Endpoints principais

- `GET /health` — Verifica status da API
- `GET /registrations` — Lista inscrições
- `POST /registrations` — Cria inscrição
- `GET /registrations/csv` — Exporta inscrições em CSV

## Licença

MIT
