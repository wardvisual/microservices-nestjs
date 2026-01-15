# Microservices with NestJS and RabbitMQ

This repository contains an example of building microservices using NestJS, RabbitMQ, and integrating multiple databases such as MySQL and MongoDB.

## Prerequisites

- Node.js
- Docker & Docker Compose

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/wardvisual/microservices-nestjs.git
   ```

2. Start the databases and RabbitMQ

   ```sh
   docker-compose up -d
   ```

3. Install the dependencies

   ```sh
   cd admin && npm install
   ```

   ```sh
   cd user && npm install
   ```

4. Create `.env` file in `admin` directory

   ```env
   MYSQL_DB_PORT=3307
   MYSQL_DB_USERNAME=root
   MYSQL_DB_PASSWORD=password
   MYSQL_DB_NAME=mn_admin_db
   AMQP_URL=amqp://guest:guest@localhost:5672
   ```

5. Create `.env` file in `user` directory

   ```env
   MONGO_URI=mongodb://root:password@localhost:3308/admin
   AMQP_URL=amqp://guest:guest@localhost:5672
   ```

## Running the Application

1. Start the admin service (runs on port 8000)

   ```sh
   cd admin && npm run start:dev
   ```

2. Start the user service (runs on port 8001)

   ```sh
   cd user && npm run start:dev
   ```

3. Start the user message listener

   ```sh
   cd user && npm run listen
   ```

## Architecture

- **Admin Service**: REST API connected to MySQL database. Emits events to RabbitMQ when products are created, updated, or deleted.
- **User Service**: REST API connected to MongoDB. Listens for events from RabbitMQ and syncs product data.
- **RabbitMQ**: Message broker for communication between services using `user_queue`.

## API Endpoints

### Admin Service (http://localhost:8000/api)

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /products          | Get all products  |
| GET    | /products/:id      | Get product by id |
| POST   | /products          | Create a product  |
| PATCH  | /products/:id      | Update a product  |
| DELETE | /products/:id      | Delete a product  |
| PATCH  | /products/:id/like | Like a product    |

### User Service (http://localhost:8001/api)

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /products          | Get all products |
| PATCH  | /products/:id/like | Like a product   |

## Docker Services

| Service  | Port  | Description    |
| -------- | ----- | -------------- |
| MySQL    | 3307  | Admin database |
| MongoDB  | 3308  | User database  |
| RabbitMQ | 5672  | Message broker |
| RabbitMQ | 15672 | Management UI  |

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Edward Fernandez: [Wardvisual](https://wardvisual.me/)
