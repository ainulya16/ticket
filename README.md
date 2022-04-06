## API DOCS
https://app.swaggerhub.com/apis/ainulya16/Ticketing/1.0.0

## DATABASE DESIGN
https://drawsql.app/ai-3/diagrams/ticket
## Initialization

### Install depedencies

```bash
npm install
```

### Database Preparation
- adjust database connection on **src/config/config.json** file.

- run migration

```bash
cd src && sequelize-cli db:migrate
```

### Run Locally

```bash
npm run dev
```

## Rollout
```bash
npm run build
```
