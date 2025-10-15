#!/bin/bash

echo "🚀 Creating Backend Files..."
cd app/server
mkdir -p src/{config,routes,controllers,validators,middleware,models,services/bse,utils}

echo "✅ Directories created"
echo "📝 Now you need to create these files manually by copying from artifacts:"
echo ""
echo "1. package.json"
echo "2. .env.example"
echo "3. src/server.js"
echo "4. src/config/database.js"
echo "5. src/routes/auth.routes.js"
echo "6. src/routes/client.routes.js"
echo "7. src/routes/portfolio.routes.js"
echo "8. src/routes/transaction.routes.js"
echo "9. src/routes/scheme.routes.js"
echo "10. src/controllers/auth.controller.js"
echo "11. src/validators/auth.validator.js"
echo ""
echo "🗄️  Database Schema:"
echo "12. ../database/schema/schema.sql"
echo ""
echo "Use 'nano filename' to create each file and paste content from artifacts"

