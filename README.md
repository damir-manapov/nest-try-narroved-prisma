# NestJS TypeScript Project with Narroved Prisma

A modern NestJS application built with TypeScript, featuring PostgreSQL database integration, repository pattern architecture, and comprehensive CRUD operations.

## 🚀 Features

- **🏗️ NestJS Framework** - Modern, scalable Node.js framework
- **📝 TypeScript** - Full type safety and modern JavaScript features
- **🗄️ PostgreSQL Database** - Robust relational database with Docker
- **🔧 Prisma ORM** - Type-safe database access with migrations
- **📖 Swagger Documentation** - Auto-generated API documentation
- **🏛️ Repository Pattern** - Clean architecture with narrow Prisma services
- **🧪 Comprehensive Testing** - Unit tests and end-to-end tests
- **🐳 Docker Support** - Containerized PostgreSQL database
- **📐 Clean Code** - ESLint, Prettier, and consistent formatting
- **⚡ Hot Reload** - Development with automatic code reload

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Docker and Docker Compose (for PostgreSQL)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd nest-try-narroved-prisma
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start PostgreSQL database:**
   ```bash
   yarn compose:up
   ```

4. **Generate Prisma client:**
   ```bash
   yarn db:generate
   ```

5. **Run database migrations:**
   ```bash
   yarn db:migrate
   ```

6. **Verify everything works:**
   ```bash
   yarn check
   ```

## 🎮 Getting Started

### **Start Development Server:**
```bash
yarn start:dev
```

### **Access the Application:**
- **API**: http://localhost:3000/api/v1
- **Swagger Documentation**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/v1/app/health

### **Database Management:**
- **PgAdmin**: http://localhost:5050 
  - 🔐 **Login**: admin@example.com / admin123
  - 🛡️ **Master Password**: pgAdminMaster2025! (required for server password retrieval)
  - 🔗 **Pre-configured**: "NestJS Database" server automatically connected
  - 📊 **Database**: `postgres` with `users` and `partners` tables
- **Prisma Studio**: `yarn db:studio`
- **Docker Compose**: All compose files are in `compose/` directory

## 📁 Project Structure

```
compose/                        # Docker Compose configuration
├── docker-compose.yml          # PostgreSQL and PgAdmin services
└── pgadmin/                    # PgAdmin configuration
    └── servers.json            # Pre-configured database connection
src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root application module
├── app.controller.ts          # Health check endpoints
├── app.service.ts             # Application service
├── users/                    # User management module
│   ├── users.controller.ts   # User REST endpoints
│   ├── users.service.ts      # User business logic
│   ├── users.module.ts       # User module configuration
│   ├── repositories/         # Data access layer
│   │   └── users.repository.ts
│   └── dto/                  # Data Transfer Objects
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
├── partners/                 # Partner management module
│   ├── partners.controller.ts # Partner REST endpoints
│   ├── partners.service.ts   # Partner business logic
│   ├── partners.module.ts    # Partner module configuration
│   ├── repositories/         # Data access layer
│   │   └── partners.repository.ts
│   └── dto/                  # Data Transfer Objects
│       ├── create-partner.dto.ts
│       └── update-partner.dto.ts
├── prisma/                   # Database services
│   ├── prisma-user.service.ts    # Narrow User DB service
│   └── prisma-partner.service.ts # Narrow Partner DB service
└── test/                     # End-to-end tests
    └── app.e2e-spec.ts
```

## 🗄️ Database Schema

### **Users Table:**
```sql
- id: Int (Primary Key, Auto-increment)
- email: String (Unique)
- name: String
- isActive: Boolean (Default: true)
- createdAt: DateTime (Auto-generated)
- updatedAt: DateTime (Auto-updated)
```

### **Partners Table:**
```sql
- id: Int (Primary Key, Auto-increment)
- name: String
- email: String (Unique)
- phone: String? (Optional)
- website: String? (Optional)
- address: String? (Optional)
- isActive: Boolean (Default: true)
- createdAt: DateTime (Auto-generated)
- updatedAt: DateTime (Auto-updated)
```

## 🔌 API Endpoints

### **Health & Status:**
- `GET /api/v1/app` - Application information
- `GET /api/v1/app/health` - Health check with timestamp

### **Users:**
- `GET /api/v1/users` - List all active users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Soft delete user
- `GET /api/v1/users/email/:email` - Find user by email
- `GET /api/v1/users/stats` - Get user statistics

### **Partners:**
- `GET /api/v1/partners` - List all active partners
- `POST /api/v1/partners` - Create a new partner
- `GET /api/v1/partners/:id` - Get partner by ID
- `PATCH /api/v1/partners/:id` - Update partner
- `DELETE /api/v1/partners/:id` - Soft delete partner
- `GET /api/v1/partners/email/:email` - Find partner by email
- `GET /api/v1/partners/stats` - Get partner statistics

## 🛠️ Available Scripts

### **Development:**
- `yarn start:dev` - Start development server with hot reload
- `yarn start:debug` - Start with debugging enabled
- `yarn compose:up` - Start PostgreSQL database container
- `yarn compose:down` - Stop database container

### **Testing:**
- `yarn test` - Run unit tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:e2e` - Run end-to-end tests
- `yarn test:cov` - Run tests with coverage

### **Database:**
- `yarn db:generate` - Generate Prisma client
- `yarn db:migrate` - Create and apply migrations
- `yarn db:studio` - Open Prisma Studio GUI
- `yarn db:reset` - Reset database and apply migrations

### **Code Quality:**
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn build` - Build for production
- `yarn check` - Run comprehensive health check

### **Production:**
- `yarn start:prod` - Start production server
- `yarn build` - Build the application

## 🏗️ Architecture Patterns

### **Repository Pattern:**
- **Separation of Concerns**: Business logic separated from data access
- **Testability**: Easy mocking of data access layer
- **Flexibility**: Can swap database implementations

### **Narrow Prisma Services:**
- **Entity Isolation**: Each repository only access its specific entities
- **Type Safety**: Compile-time prevention of cross-entity access
- **Clean Boundaries**: Strict domain separation

### **Module-Based Structure:**
- **Domain-Driven Design**: Each feature is self-contained
- **Scalability**: Easy to add new features
- **Maintainability**: Clear responsibilities per module

## 🧪 Testing

The project includes comprehensive testing:

### **Unit Tests (**`*.spec.ts`**)**
- Service layer testing with mocked dependencies
- Controller testing with mocked services
- Individual component validation

### **End-to-End Tests (**`.e2e-spec.ts`**)**
- Full HTTP request testing
- Database integration testing
- API contract validation

### **Run Tests:**
```bash
# Unit tests
yarn test

# E2E tests (requires database)
yarn test:e2e

# Coverage report
yarn test:cov
```

## 🔒 Environment Variables

Create a `.env` file with:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://nest_user:nest_password@localhost:5432/nest_try_narroved_prisma?schema=public"

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Deployment

### **Development:**
```bash
yarn compose:up
yarn start:dev
```

### **Production:**
```bash
yarn build
yarn start:prod
```

### **Docker (Optional):**
```bash
docker build -t nest-app .
docker run -p 3000:3000 nest-app
```

## 📊 Health Monitoring

Run the comprehensive health check:
```bash
yarn check
```

This validates:
- ✅ Environment setup
- ✅ Database connectivity  
- ✅ Code compilation
- ✅ Test execution
- ✅ Build process
- ✅ Project structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `yarn test`
5. Run health check: `yarn check`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License.

## 🎯 Next Steps

- **Authentication**: Add JWT-based authentication
- **Role-Based Access**: Implement user roles and permissions
- **File Upload**: Add file upload capabilities
- **GraphQL**: Add GraphQL API support
- **Caching**: Implement Redis caching
- **Monitoring**: Add application monitoring

## 📚 Documentation

- **NestJS Documentation**: https://docs.nestjs.com/
- **Prisma Documentation**: https://www.prisma.io/docs
- **Swagger/OpenAPI**: Accessible at `/api` when running
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**Happy Coding! 🚀**