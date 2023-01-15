# Microservices with NestJS and RabbitMQ

This repository contains an example of building microservices using NestJS, RabbitMQ, and integrating multiple databases such as MySQL and MongoDB.

## Prerequisites

- Node.js
- RabbitMQ
- MySQL
- MongoDB

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/wardvisual/microservices-nestjs.git
   ```

2. Install the dependencies

   ```sh
   cd microservices-nestjs/admin && npm install
   ```

   ```sh
   cd microservices-nestjs/user && npm install
   ```

## Usage

The application provides two services: `admin` and `user`. `admin` is responsible for sending messages to `user` via a RabbitMQ message queue.

You can test the communication between the services by sending a message to `admin` and observing the message being received by `user`.

## Note

This is just an example, you can use this as a starting point to build your own microservices with NestJS, RabbitMQ, and multiple databases. Make sure to update the database credentials accordingly before running the application.

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Edward Fernandez: [Wardvisual](https://wardvisual.me/)
