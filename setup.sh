#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   InvestmentWorks Setup Script         ║"
echo "║   Creating backoffice structure...     ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo -e "${GREEN}✓${NC} Created: $1"
    else
        echo -e "${YELLOW}→${NC} Exists: $1"
    fi
}

create_gitkeep() {
    touch "$1/.gitkeep"
}

echo -e "\n${BLUE}[1/6] Creating CLIENT directories...${NC}"

create_dir "app/client/public/assets/images"
create_dir "app/client/public/assets/icons"
create_dir "app/client/public/assets/logos"

create_dir "app/client/src/components/common"
create_dir "app/client/src/components/auth"
create_dir "app/client/src/components/dashboard"
create_dir "app/client/src/components/client"
create_dir "app/client/src/components/portfolio"
create_dir "app/client/src/components/transactions"
create_dir "app/client/src/components/schemes"
create_dir "app/client/src/components/reports"
create_dir "app/client/src/components/payments"

create_dir "app/client/src/pages/auth"
create_dir "app/client/src/pages/client"
create_dir "app/client/src/pages/admin"
create_dir "app/client/src/pages/common"

create_dir "app/client/src/layouts"
create_dir "app/client/src/hooks"
create_dir "app/client/src/context"
create_dir "app/client/src/services"
create_dir "app/client/src/utils"
create_dir "app/client/src/styles"
create_dir "app/client/src/routes"

echo -e "\n${BLUE}[2/6] Creating SERVER directories...${NC}"

create_dir "app/server/src/config"
create_dir "app/server/src/routes"
create_dir "app/server/src/controllers"
create_dir "app/server/src/models"
create_dir "app/server/src/services/bse"
create_dir "app/server/src/middleware"
create_dir "app/server/src/validators"
create_dir "app/server/src/utils"
create_dir "app/server/src/jobs"
create_dir "app/server/src/constants"

create_dir "app/server/tests/unit"
create_dir "app/server/tests/integration"
create_dir "app/server/tests/e2e"

echo -e "\n${BLUE}[3/6] Creating DATABASE directories...${NC}"

create_dir "app/database/migrations"
create_dir "app/database/seeds"
create_dir "app/database/schema"

echo -e "\n${BLUE}[4/6] Creating UPLOADS & LOGS directories...${NC}"

create_dir "app/uploads/kyc"
create_dir "app/uploads/documents"
create_dir "app/uploads/temp"

create_gitkeep "app/uploads/kyc"
create_gitkeep "app/uploads/documents"
create_gitkeep "app/uploads/temp"

create_dir "app/logs"
create_gitkeep "app/logs"

echo -e "\n${BLUE}[5/6] Creating OTHER directories...${NC}"

create_dir "app/scripts"
create_dir "app/docs"
create_dir "app/docker"

echo -e "\n${BLUE}[6/6] Creating GitHub workflows...${NC}"

create_dir ".github/workflows"

echo -e "\n${GREEN}"
echo "╔════════════════════════════════════════╗"
echo "║   ✓ Setup Complete!                    ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"