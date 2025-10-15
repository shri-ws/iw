-- InvestmentWorks Database Schema
-- PostgreSQL Database for Mutual Fund Platform

-- Drop tables if exist (for fresh setup)
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS sips CASCADE;
DROP TABLE IF EXISTS holdings CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS nominees CASCADE;
DROP TABLE IF EXISTS bank_accounts CASCADE;
DROP TABLE IF EXISTS kyc_documents CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS schemes CASCADE;

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('admin', 'client', 'relationship_manager');
CREATE TYPE transaction_type AS ENUM ('purchase', 'redemption', 'switch', 'sip', 'dividend');
CREATE TYPE transaction_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');
CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE sip_status AS ENUM ('active', 'paused', 'cancelled', 'completed');

-- Users Table (for authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'client',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table (customer details)
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    pan_number VARCHAR(10) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    kyc_status kyc_status DEFAULT 'pending',
    folio_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KYC Documents Table
CREATE TABLE kyc_documents (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    document_url TEXT NOT NULL,
    verified BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bank Accounts Table
CREATE TABLE bank_accounts (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    account_number VARCHAR(50) NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    branch_name VARCHAR(100),
    account_holder_name VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nominees Table
CREATE TABLE nominees (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    allocation_percentage DECIMAL(5,2) DEFAULT 100.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schemes Table (Mutual Fund Schemes)
CREATE TABLE schemes (
    id SERIAL PRIMARY KEY,
    scheme_code VARCHAR(50) UNIQUE NOT NULL,
    scheme_name VARCHAR(255) NOT NULL,
    amc_code VARCHAR(50) NOT NULL,
    amc_name VARCHAR(100) NOT NULL,
    scheme_type VARCHAR(50),
    category VARCHAR(100),
    sub_category VARCHAR(100),
    nav DECIMAL(10,4),
    nav_date DATE,
    minimum_purchase_amount DECIMAL(15,2) DEFAULT 5000,
    minimum_sip_amount DECIMAL(15,2) DEFAULT 500,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolios Table
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    total_invested DECIMAL(15,2) DEFAULT 0,
    current_value DECIMAL(15,2) DEFAULT 0,
    total_returns DECIMAL(15,2) DEFAULT 0,
    returns_percentage DECIMAL(10,2) DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Holdings Table
CREATE TABLE holdings (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    scheme_id INTEGER REFERENCES schemes(id),
    folio_number VARCHAR(50),
    units DECIMAL(15,4) DEFAULT 0,
    average_nav DECIMAL(10,4),
    invested_amount DECIMAL(15,2) DEFAULT 0,
    current_value DECIMAL(15,2) DEFAULT 0,
    returns DECIMAL(15,2) DEFAULT 0,
    returns_percentage DECIMAL(10,2) DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    scheme_id INTEGER REFERENCES schemes(id),
    transaction_type transaction_type NOT NULL,
    transaction_status transaction_status DEFAULT 'pending',
    amount DECIMAL(15,2) NOT NULL,
    units DECIMAL(15,4),
    nav DECIMAL(10,4),
    bse_order_id VARCHAR(100),
    bse_transaction_id VARCHAR(100),
    folio_number VARCHAR(50),
    remarks TEXT,
    transaction_date DATE,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SIPs Table
CREATE TABLE sips (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    scheme_id INTEGER REFERENCES schemes(id),
    amount DECIMAL(15,2) NOT NULL,
    frequency VARCHAR(20) DEFAULT 'monthly',
    start_date DATE NOT NULL,
    end_date DATE,
    sip_date INTEGER NOT NULL,
    sip_status sip_status DEFAULT 'active',
    folio_number VARCHAR(50),
    mandate_id VARCHAR(100),
    total_installments INTEGER,
    completed_installments INTEGER DEFAULT 0,
    next_installment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_pan ON clients(pan_number);
CREATE INDEX idx_portfolios_client ON portfolios(client_id);
CREATE INDEX idx_holdings_portfolio ON holdings(portfolio_id);
CREATE INDEX idx_holdings_client ON holdings(client_id);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_status ON transactions(transaction_status);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_sips_client ON sips(client_id);
CREATE INDEX idx_sips_status ON sips(sip_status);
CREATE INDEX idx_schemes_code ON schemes(scheme_code);

-- Create trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schemes_updated_at BEFORE UPDATE ON schemes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sips_updated_at BEFORE UPDATE ON sips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT 'Database schema created successfully!' as status;
