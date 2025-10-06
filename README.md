# NestJS TypeScript Project with Domain-Driven Architecture

A modern NestJS application built with TypeScript, featuring PostgreSQL database integration, domain-driven design architecture, comprehensive CRUD operations, and clean separation of concerns.

## 🚀 Features

- **🏗️ NestJS Framework** - Modern, scalable Node.js framework
- **📝 TypeScript** - Full type safety and modern JavaScript features
- **🗄️ PostgreSQL Database** - Robust relational database with Docker
- **🔧 Prisma ORM** - Type-safe database access with migrations
- **📖 Swagger Documentation** - Auto-generated API documentation
- **🏛️ Domain-Driven Design** - Clean architecture with domain models and mappers
- **🔒 Narrow Prisma Services** - Entity-specific database access with type safety
- **📊 Statistics Endpoints** - Built-in analytics for all entities
- **🧪 Comprehensive Testing** - Unit tests and end-to-end tests
- **🐳 Docker Support** - Containerized PostgreSQL database with pgAdmin
- **📐 Clean Code** - ESLint, Prettier, and consistent formatting
- **⚡ Hot Reload** - Development with automatic code reload
- **🌍 Environment Configuration** - Flexible port and database configuration

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
- **API**: http://localhost:3000/api/v1 (or custom PORT from environment)
- **Swagger Documentation**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/v1/app/health

### **Database Management:**
- **PgAdmin**: http://localhost:5050 
  - 🔐 **Login**: pgadmin@example.com / admin123
  - 🛡️ **Master Password**: pgAdminMaster2025! (required for server password retrieval)
  - 🔗 **Pre-configured**: "NestJS Database" server automatically connected
  - 📊 **Database**: `postgres` with all tables
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
│   ├── controllers/          # REST API controllers
│   │   ├── users.controller.ts
│   │   └── user-settings.controller.ts
│   ├── services/             # Business logic layer
│   │   ├── users.service.ts
│   │   └── user-settings.service.ts
│   ├── repositories/         # Data access layer
│   │   ├── users.repository.ts
│   │   ├── user-settings.repository.ts
│   │   ├── user.mapper.ts
│   │   └── user-settings.mapper.ts
│   ├── models/               # Domain models
│   │   ├── user.model.ts
│   │   └── user-settings.model.ts
│   ├── dto/                  # Data Transfer Objects
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   ├── create-user-settings.dto.ts
│   │   ├── update-user-settings.dto.ts
│   │   └── index.ts
│   ├── externalServices/      # External service dependencies
│   │   └── prisma-user.service.ts
│   ├── users.module.ts       # Module configuration
│   └── index.ts              # Module exports
├── partners/                 # Partner management module
│   ├── controllers/          # REST API controllers
│   │   ├── partners.controller.ts
│   │   └── contract.controller.ts
│   ├── services/             # Business logic layer
│   │   ├── partners.service.ts
│   │   └── contract.service.ts
│   ├── repositories/         # Data access layer
│   │   ├── partners.repository.ts
│   │   ├── contract.repository.ts
│   │   ├── partner.mapper.ts
│   │   └── contract.mapper.ts
│   ├── models/               # Domain models
│   │   ├── partner.model.ts
│   │   └── contract.model.ts
│   ├── dto/                  # Data Transfer Objects
│   │   ├── create-partner.dto.ts
│   │   ├── update-partner.dto.ts
│   │   ├── create-contract.dto.ts
│   │   ├── update-contract.dto.ts
│   │   └── index.ts
│   ├── externalServices/      # External service dependencies
│   │   └── prisma-partner.service.ts
│   ├── partners.module.ts    # Module configuration
│   └── index.ts              # Module exports
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

### **UserSettings Table:**
```sql
- id: Int (Primary Key, Auto-increment)
- userId: Int (Foreign Key, Unique)
- theme: String (Default: "light")
- language: String (Default: "en")
- timezone: String (Default: "UTC")
- notifications: Boolean (Default: true)
- emailNotifications: Boolean (Default: true)
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

### **Contracts Table:**
```sql
- id: Int (Primary Key, Auto-increment)
- partnerId: Int (Foreign Key)
- title: String
- description: String? (Optional)
- amount: Decimal? (Optional, 10,2 precision)
- currency: String (Default: "USD")
- startDate: DateTime
- endDate: DateTime? (Optional)
- status: String (Default: "active")
- isActive: Boolean (Default: true)
- createdAt: DateTime (Auto-generated)
- updatedAt: DateTime (Auto-updated)
```

## 🔌 API Endpoints

### **Health & Status:**
- `GET /api/v1/app` - Application information
- `GET /api/v1/app/health` - Health check with timestamp

### **Users:**
- `GET /api/v1/users` - List all users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user
- `GET /api/v1/users/email/:email` - Find user by email
- `GET /api/v1/users/stats` - Get user statistics

### **User Settings:**
- `GET /api/v1/user-settings` - List all user settings
- `POST /api/v1/user-settings/:userId` - Create user settings
- `GET /api/v1/user-settings/user/:userId` - Get user settings by user ID
- `PUT /api/v1/user-settings/user/:userId` - Update user settings
- `DELETE /api/v1/user-settings/user/:userId` - Delete user settings
- `GET /api/v1/user-settings/stats` - Get user settings statistics

### **Partners:**
- `GET /api/v1/partners` - List all partners
- `POST /api/v1/partners` - Create a new partner
- `GET /api/v1/partners/:id` - Get partner by ID
- `PATCH /api/v1/partners/:id` - Update partner
- `DELETE /api/v1/partners/:id` - Delete partner
- `GET /api/v1/partners/email/:email` - Find partner by email
- `GET /api/v1/partners/stats` - Get partner statistics

### **Contracts:**
- `GET /api/v1/contracts` - List all contracts
- `POST /api/v1/contracts` - Create a new contract
- `GET /api/v1/contracts/:id` - Get contract by ID
- `PUT /api/v1/contracts/:id` - Update contract
- `DELETE /api/v1/contracts/:id` - Delete contract
- `GET /api/v1/contracts/partner/:partnerId` - Get contracts by partner
- `GET /api/v1/contracts/status/:status` - Get contracts by status
- `GET /api/v1/contracts/stats` - Get contract statistics

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

### **Domain-Driven Design (DDD):**
- **Domain Models**: Pure business entities separate from database concerns
- **Mappers**: Clean conversion between domain models and Prisma entities
- **Repository Pattern**: Data access abstraction with domain model interfaces
- **Service Layer**: Business logic orchestration using domain models

### **Narrow Prisma Services:**
- **Entity Isolation**: Each service only accesses its specific entities
- **Type Safety**: Compile-time prevention of cross-entity access
- **Clean Boundaries**: Strict domain separation with restricted interfaces
- **Transaction Safety**: Type-safe transactions within entity boundaries

### **Module-Based Structure:**
- **Feature Modules**: Self-contained modules with clear boundaries
- **External Services**: Module-specific external dependencies
- **Clean Exports**: Only services exposed as public API
- **Co-location**: Related code grouped together for maintainability

### **Layered Architecture:**
```
┌─────────────────────────────────────┐
│           Controllers               │ ← REST API Layer
├─────────────────────────────────────┤
│            Services                 │ ← Business Logic Layer
├─────────────────────────────────────┤
│          Repositories               │ ← Data Access Layer
├─────────────────────────────────────┤
│           Mappers                  │ ← Data Transformation Layer
├─────────────────────────────────────┤
│        External Services            │ ← Database Access Layer
└─────────────────────────────────────┘
```

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
DATABASE_URL="postgresql://nest_user:nest_password@localhost:5432/postgres?schema=public"

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

## 🎯 Key Architectural Benefits

### **Type Safety:**
- Full TypeScript coverage with strict typing
- Prisma-generated types for database operations
- Domain model interfaces for business logic
- Compile-time error prevention

### **Maintainability:**
- Clear separation of concerns
- Domain-driven design principles
- Module-based organization
- Consistent naming conventions

### **Testability:**
- Dependency injection for easy mocking
- Repository pattern for data layer testing
- Service layer isolation
- Clear interfaces for unit testing

### **Scalability:**
- Modular architecture for easy feature addition
- Narrow services prevent coupling
- Clean module boundaries
- Extensible design patterns

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
- **Event Sourcing**: Implement domain events
- **CQRS**: Add Command Query Responsibility Segregation

## 📚 Documentation

- **NestJS Documentation**: https://docs.nestjs.com/
- **Prisma Documentation**: https://www.prisma.io/docs
- **Swagger/OpenAPI**: Accessible at `/api` when running
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Domain-Driven Design**: https://martinfowler.com/bliki/DomainDrivenDesign.html

---

**Happy Coding! 🚀**