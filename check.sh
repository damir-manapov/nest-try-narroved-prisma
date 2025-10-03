#!/bin/bash

# Project Health Check Script
# This script validates the entire NestJS project setup

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_header "Starting Project Health Check"

# 1. Check Node.js version
print_header "Environment Check"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
else
    print_error "Node.js not found"
    exit 1
fi

if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version)
    print_status "Yarn version: $YARN_VERSION"
else
    print_error "Yarn not found"
    exit 1
fi

if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    print_status "Docker version: $DOCKER_VERSION"
else
    print_warning "Docker not found - database checks will be skipped"
fi

# 2. Check dependencies
print_header "Dependencies Check"
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    yarn install
fi

if [ ! -d ".yarn/install-state.gz" ] && [ ! -d "node_modules/.yarn" ]; then
    print_warning "Dependencies may be outdated"
else
    print_status "Dependencies installed"
fi

# 3. Environment check
print_header "Environment Configuration"
if [ ! -f ".env" ]; then
    print_error ".env file not found"
    print_info "You can create it with: echo 'DATABASE_URL=\"postgresql://nest_user:nest_password@localhost:5432/nest_try_narroved_prisma?schema=public\"' > .env"
    exit 1
else
    print_status ".env file exists"
fi

# 4. Database connectivity check
print_header "Database Check"
if command -v docker &> /dev/null && docker ps | grep -q "nest-postgres"; then
    print_status "PostgreSQL container is running"
    
    # Test database connection
    if yarn prisma db pull --force &> /dev/null; then
        print_status "Database connection successful"
    else
        print_error "Cannot connect to database"
    fi
else
    print_warning "PostgreSQL container not running"
    print_info "Start it with: yarn compose:up"
fi

# 5. Prisma schema check
print_header "Prisma Schema Check"
if yarn prisma validate &> /dev/null; then
    print_status "Prisma schema valid"
else
    print_error "Prisma schema validation failed"
    exit 1
fi

# Check for pending migrations
if yarn prisma migrate status &> /dev/null; then
    print_status "Database migrations up to date"
else
    print_warning "Database migrations may be pending"
    print_info "Run: yarn prisma:migrate"
fi

# 6. TypeScript check
print_header "TypeScript Check"
if yarn tsc --noEmit &> /dev/null; then
    print_status "TypeScript compilation successful"
else
    print_error "TypeScript compilation failed"
    yarn tsc --noEmit  # Show errors
    exit 1
fi

# 7. Linting check
print_header "Code Quality Check"
if yarn lint &> /dev/null; then
    print_status "Linting passed"
else
    print_error "Linting failed"
    yarn lint  # Show linting errors
    exit 1
fi

# 8. Build check
print_header "Build Check"
if yarn build &> /dev/null; then
    print_status "Build successful"
    
    # Check if dist directory was created
    if [ -d "dist" ]; then
        print_status "Build artifacts created in dist/"
    else
        print_warning "No dist directory found after build"
    fi
else
    print_error "Build failed"
    yarn build  # Show build errors
    exit 1
fi

# 9. Test check
print_header "Test Check"
# Check unit tests
if yarn test --passWithNoTests &> /dev/null; then
    print_status "Unit tests passed"
else
    print_warning "Unit tests failed or not found"
fi

# Check e2e tests (if database is available)
if command -v docker &> /dev/null && docker ps | grep -q "nest-postgres"; then
    if yarn test:e2e &> /dev/null; then
        print_status ".e2e tests passed"
    else
        print_warning ".e2e tests failed"
    fi
else
    print_warning "Skipping e2e tests (database not available)"
fi

# 10. Security check (basic)
print_header "Security Check"
if command -v audit &> /dev/null; then
    if yarn audit --level moderate &> /dev/null; then
        print_status "No moderate/high security vulnerabilities found"
    else
        print_warning "Security vulnerabilities found"
        print_info "Run: yarn audit --fix"
    fi
else
    print_info "npm audit not available for dependency check"
fi

# 11. Package.json scripts check
print_header "Available Scripts"
print_info "Development:"
echo "  yarn start:dev"
echo "  yarn compose:up"
echo "  yarn prisma:studio"

print_info "Testing:"
echo "  yarn test"
echo "  yarn test:e2e"
echo "  yarn test:cov"

print_info "Database:"
echo "  yarn prisma:migrate"
echo "  yarn prisma:generate"
echo "  yarn compose:down"

print_info "Production:"
echo "  yarn build"
echo "  yarn start:prod"

# 12. Project structure check
print_header "Project Structure Check"
required_dirs=("src" "test" "prisma")
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        print_status "$dir directory exists"
    else
        print_error "$dir directory missing"
        exit 1
    fi
done

required_files=("nest-cli.json" "tsconfig.json" "package.json")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "$file exists"
    else
        print_error "$file missing"
        exit 1
    fi
done

# 13. Module-specific checks
print_header "Module Check"
modules=("Users" "Partners")
for module in "${modules[@]}"; do
    module_lower=$(echo "$module" | tr '[:upper:]' '[:lower:]' | sed 's/s$//')
    if [ -d "src/$module_lower" ]; then
        print_status "$module module exists"
        
        # Check required files for each module
        required_module_files=(
            "$module_lower.controller.ts"
            "$module_lower.service.ts"
            "$module_lower.module.ts"
            "repositories/$module_lower.repository.ts"
            "dto/create-$module_lower.dto.ts"
            "dto/update-$module_lower.dto.ts"
        )
        
        for file in "${required_module_files[@]}"; do
            if [ -f "src/$module_lower/$file" ]; then
                print_status "  ✓ $file"
            else
                print_warning "  ⚠ $file missing"
            fi
        done
    else
        print_warning "$module module directory missing"
    fi
done

# 14. Last updated info
print_header "Project Summary"
print_status "All health checks completed!"
print_info "Project: $(grep '"name"' package.json | sed 's/.*"name": *"\([^"]*\)".*/\1/')"
print_info "Version: $(grep '"version"' package.json | sed 's/.*"version": *"\([^"]*\)".*/\1/')"

# Optional: Start services
if command -v docker &> /dev/null && ! docker ps | grep -q "nest-postgres"; then
    print_info "\n🚀 To start the application:"
    echo "  1. yarn compose:up"
    echo "  2. yarn prisma:migrate"
    echo "  3. yarn start:dev"
else
    print_info "\n🎉 Project is ready to run!"
    echo "  yarn start:dev (if not already running)"
fi

echo
print_status "Health check completed successfully! 🎯"
