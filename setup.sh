# ========================================
# FILE 1: .gitignore (Root folder)
# ========================================

# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Environment variables
.env
.env.local
.env.production
server/.env
client/.env.local

# Logs
logs/
*.log
npm-debug.log*

# Uploads
uploads/
!uploads/.gitkeep

# Build files
client/build/
dist/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary files
temp/
tmp/

# Testing
coverage/

# Production files
*.pem
*.key
ssl/


# ========================================
# FILE 2: .env.example (Root folder)
# ========================================

# Server Configuration
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=investmentworks
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# BSE Star MF Configuration
BSE_MEMBER_ID=your_member_id
BSE_PASSWORD=your_password
BSE_USER_ID=your_user_id
BSE_API_URL=https://bsestarmf.in/StarAPI/
BSE_ARN=your_arn_code
BSE_EUIN=your_euin

# Email Configuration (SendGrid/SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@investmentworks.in

# SMS Configuration (Twilio/MSG91)
SMS_API_KEY=your_sms_api_key
SMS_SENDER_ID=INVWRK

# Payment Gateway (Razorpay/PayU)
PAYMENT_KEY_ID=your_payment_key
PAYMENT_KEY_SECRET=your_payment_secret
PAYMENT_WEBHOOK_SECRET=your_webhook_secret

# AWS/Cloud Storage (Optional)
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=ap-south-1

# Redis (Optional - for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Application Settings
APP_NAME=InvestmentWorks
APP_URL=https://investmentworks.in
ADMIN_EMAIL=admin@investmentworks.in

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100


# ========================================
# FILE 3: package.json (Root folder)
# ========================================

{
  "name": "investmentworks",
  "version": "1.0.0",
  "description": "Mutual Fund Investment Platform with BSE Star MF Integration",
  "main": "server/src/server.js",
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm run dev",
    "client": "cd client && npm start",
    "build": "cd client && npm run build",
    "start": "cd server && npm start",
    "install-all": "npm install && cd client && npm install && cd ../server && npm install",
    "test": "npm run test --prefix server && npm run test --prefix client"
  },
  "keywords": ["mutual-funds", "bse", "investment", "portfolio"],
  "author": "InvestmentWorks Team",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}


# ========================================
# FILE 4: README.md (Root folder)
# ========================================

# InvestmentWorks - Mutual Fund Investment Platform

Complete backoffice system integrated with BSE Star MF for managing client portfolios and mutual fund transactions.

## 🚀 Features

- Client Dashboard with Portfolio Overview
- BSE Star MF Integration (Purchase, Redemption, SIP)
- Real-time Portfolio Tracking
- Transaction Management
- Reports & Analytics
- Payment Gateway Integration
- Mobile Responsive Design

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- BSE Star MF Membership
- Payment Gateway Account

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/investmentworks.git
cd investmentworks
```

2. Install all dependencies
```bash
npm run install-all
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Setup database
```bash
cd database
psql -U your_user -d investmentworks -f schema/schema.sql
```

5. Run the application
```bash
npm run dev
```

## 📁 Project Structure

```
investmentworks/
├── client/          # React frontend
├── server/          # Node.js backend
├── database/        # Database migrations & seeds
└── docs/           # Documentation
```

## 🔧 Configuration

See `.env.example` for all configuration options.

## 📖 Documentation

- [API Documentation](docs/API.md)
- [Setup Guide](docs/SETUP.md)
- [BSE Integration](docs/BSE_INTEGRATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📝 License

MIT License


# ========================================
# FILE 5: server/package.json
# ========================================

{
  "name": "investmentworks-server",
  "version": "1.0.0",
  "description": "Backend API for InvestmentWorks",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --coverage"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "axios": "^1.6.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "winston": "^3.11.0",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "node-cron": "^3.0.3",
    "pdf-lib": "^1.17.1",
    "exceljs": "^4.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}


# ========================================
# FILE 6: client/package.json
# ========================================

{
  "name": "investmentworks-client",
  "version": "1.0.0",
  "description": "Frontend for InvestmentWorks",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.294.0",
    "recharts": "^2.10.3",
    "react-hook-form": "^7.48.2",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}


# ========================================
# FILE 7: client/tailwind.config.js
# ========================================

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#8B5CF6',
      },
    },
  },
  plugins: [],
}


# ========================================
# SETUP SCRIPT: setup.sh
# ========================================

#!/bin/bash

echo "🚀 Setting up InvestmentWorks..."

# Create all directories
echo "📁 Creating folder structure..."

# Client folders
mkdir -p client/public/assets/{images,icons,logos}
mkdir -p client/src/{components,pages,layouts,hooks,context,services,utils,styles,routes}
mkdir -p client/src/components/{common,auth,dashboard,client,portfolio,transactions,schemes,reports,payments}
mkdir -p client/src/pages/{auth,client,admin,common}

# Server folders
mkdir -p server/src/{config,routes,controllers,models,services,middleware,validators,utils,jobs,constants}
mkdir -p server/src/services/bse
mkdir -p server/tests/{unit,integration,e2e}

# Other folders
mkdir -p database/{migrations,seeds,schema}
mkdir -p uploads/{kyc,documents,temp}
mkdir -p logs
mkdir -p scripts
mkdir -p docs
mkdir -p docker
mkdir -p .github/workflows

# Create .gitkeep files for empty folders
touch uploads/kyc/.gitkeep
touch uploads/documents/.gitkeep
touch uploads/temp/.gitkeep
touch logs/.gitkeep

echo "✅ Folder structure created!"
echo "📝 Next steps:"
echo "1. Copy configuration files (.env.example, package.json, etc.)"
echo "2. Run: npm run install-all"
echo "3. Setup your .env file"
echo "4. Run: npm run dev"
echo ""
echo "🎉 Setup complete!"
