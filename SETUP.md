# Setup Instructions

## 🚀 Quick Start Guide

### 1. Environment Setup
First, create your environment file:
```bash
cp .env.example .env
```

### 2. Start Database
```bash
# Start PostgreSQL and PgAdmin
yarn docker:up

# Or manually:
docker-compose up -d
```

### 3. Setup Database Schema
```bash
# Generate Prisma client
yarn prisma:generate

# Create and apply migrations
yarn prisma:migrate

# View database in Prisma Studio
yarn prisma:studio
```

### 4. Start Development Server
```bash
# Install dependencies (if not done)
yarn install

# Start development server
yarn start:dev
```

## 🌐 Access Points

- **API**: http://localhost:3000/api/v1
- **Swagger Documentation**: http://localhost:3000/api
- **PgAdmin**: http://localhost:5050 (admin@example.com / admin123)
- **Prisma Studio**: http://localhost:5555 (when running)

## 📋 Available Scripts

### Application
- `yarn start:dev` - Start development server
- `yarn start:prod` - Start production server
- `yarn build` - Build

### Database
- `yarn docker:up` - Start PostgreSQL
- `yarn docker:down` - Stop PostgreSQL
- `yarn prisma:generate` - Generate Prisma client
- `yarn prisma:migrate` - Apply migrations
- `yarn prisma:studio` - View database
- `yarn db:reset` - Reset database

### Testing
- `yarn test` - Unit tests
- `yarn test:e2e` - End-to-end tests
- `yarn test:cov` - Coverage

## 🗄️ Database Schema

### User Entity
```sql
- id: Int (Primary Key, Auto-increment)
- email: String (Unique)
- name: String
- isActive: Boolean (Default: true)
- createdAt: DateTime (Auto)
- updatedAt: DateTime (Auto)
```

## 🔧 Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running: `docker ps`
2. Check environment variables in `.env`
3. Verify database URL connection string

### Prisma Issues
1. Generate client: `yarn prisma:generate`
2. Reset migrations: `yarn db:reset`
3. Check schema file: `prisma/schema.prisma`

## 📚 API Endpoints

### Users
- `GET /api/v1/users` - List all users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Soft delete user
- `GET /api/v1/users/email/:email` - Get user by email

### Health
- `GET /api/v1/app` - Hello message
- `GET /api/v1/app/health` - Health check
