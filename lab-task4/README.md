# Lab Task 04: Product Inventory API

Standalone NestJS project for a single entity CRUD API using TypeORM and PostgreSQL.

## Database

Create the database before running the API:

```sql
CREATE DATABASE product_inventory_db;
```

The default connection uses:

- host: `localhost`
- port: `5432`
- username: `postgres`
- password: `zisan12345`
- database: `product_inventory_db`

You can override these with `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE`.

## Run

```bash
npm install
npm run start:dev
```

## Routes

- `POST /products`
- `GET /products`
- `GET /products/search?keyword=phone`
- `GET /products/category/:cat`
- `GET /products/:id`
- `PATCH /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
- `PATCH /products/:id/toggle`
