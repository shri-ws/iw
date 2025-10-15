import React, { useState } from 'react';
import { TrendingUp, Plus, ArrowDownToLine, Home, DollarSign, PieChart, User } from 'lucide-react';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  // Mock data
  const portfolioValue = 245000;
  const investedAmount = 200000;
  const todayGain = 2500;
  const totalGain = 45000;
  const gainPercentage = 22.5;
  
  const recentTransactions = [
    { id: 1, type: 'SIP', scheme: 'HDFC Top 100 Fund', amount: 5000, date: '15 Oct 2025', status: 'completed' },
    { id: 2, type: 'Lumpsum', scheme: 'SBI Bluechip Fund', amount: 25000, date: '10 Oct 2025', status: 'completed' },
    { id: 3, type: 'SIP', scheme: 'Axis Midcap Fund', amount: 3000, date: '5 Oct 2025', status: 'completed' }
  ];
  
  const holdings = [
    { name: 'HDFC Top 100 Fund', value: 85000, invested: 70000, returns: 21.4, color: 'bg-blue-500' },
    { name: 'SBI Bluechip Fund', value: 95000, invested: 80000, returns: 18.8, color: 'bg-purple-500' },
    { name: 'Axis Midcap Fund', value: 65000, invested: 50000, returns: 30.0, color: 'bg-green-500' }
  ];

  const HomeScreen = () => (
    <div className="space-y-6">
      {/* Portfolio Value Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">
        <p className="text-blue-100 text-sm mb-1">Total Investment Value</p>
        <h1 className="text-4xl font-bold mb-4">₹{portfolioValue.toLocaleString('en-IN')}</h1>
        
        <div className="flex items-center justify-between pt-4 border-t border-blue-400">
          <div>
            <p className="text-blue-100 text-xs mb-1">Today's Change</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-lg font-semibold text-green-300">+₹{todayGain.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs mb-1">Total Returns</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-lg font-semibold text-green-300">+{gainPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Start SIP</span>
          </button>
          
          <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Invest Once</span>
          </button>
          
          <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ArrowDownToLine className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Withdraw</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Recent Activity</h2>
        <div className="space-y-2">
          {recentTransactions.map(txn => (
            <div key={txn.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{txn.scheme}</p>
                  <p className="text-xs text-gray-500 mt-1">{txn.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹{txn.amount.toLocaleString('en-IN')}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{txn.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const InvestScreen = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Start Investing</h1>
        <p className="text-gray-600 text-sm">Choose how you want to invest</p>
      </div>

      {/* Two Big Options */}
      <div className="space-y-4">
        <button className="w-full bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition text-left">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Start Monthly SIP</h3>
              <p className="text-green-100 text-sm mb-4">Invest small amounts every month automatically</p>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <span className="text-sm">From ₹500/month</span>
              </div>
            </div>
            <Plus className="w-8 h-8" />
          </div>
        </button>

        <button className="w-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition text-left">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Invest Once</h3>
              <p className="text-blue-100 text-sm mb-4">Make a one-time investment in mutual funds</p>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <span className="text-sm">Minimum ₹5,000</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8" />
          </div>
        </button>
      </div>

      {/* Popular Funds */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Popular Funds</h2>
        <div className="space-y-2">
          {['HDFC Top 100 Fund', 'SBI Bluechip Fund', 'Axis Midcap Fund'].map((fund, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 text-sm">{fund}</p>
                <p className="text-xs text-gray-500 mt-1">Equity • High Risk</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold text-sm">+{(15 + idx * 5).toFixed(1)}%</p>
                <p className="text-xs text-gray-500">3Y Returns</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PortfolioScreen = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Portfolio</h1>
        <p className="text-gray-600 text-sm">Your investment breakdown</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600 text-xs mb-1">Invested</p>
          <p className="text-xl font-bold text-gray-800">₹{investedAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600 text-xs mb-1">Returns</p>
          <p className="text-xl font-bold text-green-600">+₹{totalGain.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Holdings */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Funds</h2>
        <div className="space-y-3">
          {holdings.map((holding, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${holding.color}`}></div>
                <p className="font-medium text-gray-800 text-sm flex-1">{holding.name}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Value</p>
                  <p className="text-lg font-bold text-gray-800">₹{holding.value.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Returns</p>
                  <p className="text-lg font-bold text-green-600">+{holding.returns}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600 text-sm">Manage your account</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Rajesh Kumar</h3>
            <p className="text-sm text-gray-600">rajesh@email.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {[
          { label: 'Bank Accounts', icon: '🏦' },
          { label: 'My Documents', icon: '📄' },
          { label: 'Statements', icon: '📊' },
          { label: 'Settings', icon: '⚙️' },
          { label: 'Help & Support', icon: '💬' },
          { label: 'Logout', icon: '🚪', color: 'text-red-600' }
        ].map((item, idx) => (
          <button key={idx} className={`w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition ${item.color || ''}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-md mx-auto pb-24 px-4 pt-6">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'invest' && <InvestScreen />}
        {activeTab === 'portfolio' && <PortfolioScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setActiveTab('invest')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                activeTab === 'invest' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <DollarSign className="w-6 h-6" />
              <span className="text-xs font-medium">Invest</span>
            </button>
            
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                activeTab === 'portfolio' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <PieChart className="w-6 h-6" />
              <span className="text-xs font-medium">Portfolio</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
