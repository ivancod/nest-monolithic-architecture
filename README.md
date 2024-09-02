# Monolithic achitecture in NestJS

## Description

This is a monolithic architecture project using NestJS. The project is a simple CRUD API for managing users. The project is divided into three layers: controller, service, and repository. The project uses a Sequelize ORM to interact with the database.

## Installation

```bash
$ cd client && yarn install
$ cd server && npm install && cp .env.example .env
```
## Create database and credentials to environment variables

```bash
DATABASE_HOST='localhost'
DATABASE_NAME='nest_test'
DATABASE_USER='root'
DATABASE_PASSWORD='example'
```

## Running the app

```bash
$ cd server && npm run start
```
