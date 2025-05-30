# Novin Dev Interview Task

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A modern NestJS application with TypeORM and PostgreSQL integration.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

## Description

This is a NestJS application that serves as a development interview task. It's built with modern technologies and follows best practices for enterprise-level applications.

## Tech Stack

- 🚀 **NestJS** - Progressive Node.js framework
- 📦 **TypeORM** - ORM for TypeScript and JavaScript
- 🐘 **PostgreSQL** - Advanced open-source database
- 📝 **Swagger** - API documentation
- 🐳 **Docker** - Containerization
- 🔧 **TypeScript** - Programming language
- 📋 **ESLint & Prettier** - Code quality and formatting

## Features

- 🔒 **Environment Configuration** - Using @nestjs/config for environment management
- 📚 **API Documentation** - Swagger integration for API documentation
- 🗄️ **Database Integration** - PostgreSQL with TypeORM
- 🐳 **Docker Support** - Containerized development and deployment
- 📦 **Modular Architecture** - Well-organized code structure
- 🔍 **Type Safety** - Full TypeScript support

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [Docker](https://www.docker.com/) and Docker Compose
- [PostgreSQL](https://www.postgresql.org/) (if running locally)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MohamadrezaKhalvati/novindevTest
cd novin-dev-test
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Create a `.env` file in the root directory with the following content:

```env

APP_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=
POSTGRES_HOST=
POSTGRES_DB=
NODE_ENV=
POSTGRES_SYNCHRONIZE=

```

4. Start the database using Docker:

```bash
docker-compose up -d
```

## Running the Application

### Development

```bash
# Start the application in development mode
yarn start

# Start the application in watch mode
yarn start:dev

# Start the application in debug mode
yarn start:debug
```

### Production

```bash
# Build the application
yarn build

# Start the production server
yarn start:prod
```

### Docker

```bash
# Build and start the application using Docker
docker-compose up --build
```

## Project Structure

```
src/
├── base/          # Base classes and utilities
├── config/        # Application configuration
├── modules/       # Feature modules
├── shared/        # Shared resources and utilities
└── main.ts        # Application entry point
```

## API Documentation

The API documentation is available at `/api` when running the application in development mode. The Swagger UI provides interactive documentation for all endpoints.

## Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Docker** - Containerization

## Available Scripts

- `yarn build` - Build the application
- `yarn format` - Format code using Prettier
- `yarn start` - Start the application
- `yarn start:dev` - Start the application in watch mode
- `yarn start:debug` - Start the application in debug mode
- `yarn start:prod` - Start the application in production mode
- `yarn lint` - Lint the code

## License

This project is [UNLICENSED](LICENSE).

## Support

For support, please:

- Open an issue in the GitHub repository
- Contact the development team

---

<p align="center">
  Made with ❤️ by Novin Development Team
</p>
