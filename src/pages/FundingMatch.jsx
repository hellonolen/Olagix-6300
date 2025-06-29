import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiDollarSign, FiSearch, FiFilter, FiCheck, FiX, FiTrendingUp, FiShield, FiClock, FiExternalLink, FiStar, FiInfo, FiRefreshCw} = FiIcons;

const FundingMatch = () => {
  const {businessProfiles, fundingMatches, addFundingMatch} = useUser();
  const [activeTab, setActiveTab] = useState('matches');
  const [filters, setFilters] = useState({
    loanType: '',
    amount: '',
    guarantee: '',
    documentation: '',
    industry: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    {id: 'matches', name: 'Funding Matches', icon: FiDollarSign},
    {id: 'applications', name: 'Applications', icon: FiClock},
    {id: 'approved', name: 'Approved', icon: FiCheck}
  ];

  const mockFundingOptions = [
    {
      id: 1,
      lenderName: 'FastCap Business Loans',
      loanType: 'Term Loan',
      minAmount: 10000,
      maxAmount: 500000,
      rate: '8.99% - 24.99%',
      term: '12-60 months',
      guarantee: 'No PG',
      documentation: 'No Doc',
      approval: '24 hours',
      industry: 'All',
      rating: 4.8,
      features: ['Quick approval', 'No collateral', 'Flexible terms'],
      requirements: ['6+ months in business', '$10K+ monthly revenue', '550+ credit score']
    },
    {
      id: 2,
      lenderName: 'Capital Bridge Partners',
      loanType: 'Line of Credit',
      minAmount: 25000,
      maxAmount: 1000000,
      rate: '12.99% - 29.99%',
      term: 'Revolving',
      guarantee: 'Limited PG',
      documentation: 'Low Doc',
      approval: '48 hours',
      industry: 'Technology, Healthcare',
      rating: 4.6,
      features: ['Revolving credit', 'Interest only payments', 'Online access'],
      requirements: ['12+ months in business', '$25K+ monthly revenue', '600+ credit score']
    },
    {
      id: 3,
      lenderName: 'Growth Funding Network',
      loanType: 'Revenue Based',
      minAmount: 50000,
      maxAmount: 2000000,
      rate: '6% - 12% factor',
      term: '6-18 months',
      guarantee: 'No PG',
      documentation: 'No Doc',
      approval: '72 hours',
      industry: 'E-commerce, SaaS',
      rating: 4.9,
      features: ['Revenue based', 'No fixed payments', 'Growth focused'],
      requirements: ['Recurring revenue', '$50K+ monthly revenue', 'Profitable business']
    },
    {
      id: 4,
      lenderName: 'Traditional Bank Solutions',
      loanType: 'SBA Loan',
      minAmount: 100000,
      maxAmount: 5000000,
      rate: '5.99% - 11.99%',
      term: '5-25 years',
      guarantee: 'Full PG',
      documentation: 'Full Doc',
      approval: '30-60 days',
      industry: 'Manufacturing, Real Estate',
      rating: 4.4,
      features: ['Low rates', 'Long terms', 'SBA backing'],
      requirements: ['2+ years in business', 'Strong financials', 'Collateral required']
    }
  ];

  const mockApplications = [
    {
      id: 1,
      lender: 'FastCap Business Loans',
      amount: '$50,000',
      status: 'Under Review',
      appliedDate: '2024-01-10',
      expectedDecision: '2024-01-15'
    },
    {
      id: 2,
      lender: 'Capital Bridge Partners',
      amount: '$100,000',
      status: 'Approved',
      appliedDate: '2024-01-05',
      approvedDate: '2024-01-08'
    }
  ];

  const handleApply = (lender) => {
    // Simulate application
    const newApplication = {
      id: Date.now(),
      lender: lender.lenderName,
      amount: `$${lender.minAmount.toLocaleString()}`,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    addFundingMatch(newApplication);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMatches = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Find Your Perfect Match</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <SafeIcon icon={FiFilter} className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-5 gap-4 pt-4 border-t">
            <select
              value={filters.loanType}
              onChange={(e) => setFilters({...filters, loanType: e.target.value})}
              className="input-field"
            >
              <option value="">All Loan Types</option>
              <option value="term">Term Loan</option>
              <option value="line">Line of Credit</option>
              <option value="revenue">Revenue Based</option>
              <option value="sba">SBA Loan</option>
            </select>
            <select
              value={filters.amount}
              onChange={(e) => setFilters({...filters, amount: e.target.value})}
              className="input-field"
            >
              <option value="">Loan Amount</option>
              <option value="10k-50k">$10K - $50K</option>
              <option value="50k-250k">$50K - $250K</option>
              <option value="250k-1m">$250K - $1M</option>
              <option value="1m+">$1M+</option>
            </select>
            <select
              value={filters.guarantee}
              onChange={(e) => setFilters({...filters, guarantee: e.target.value})}
              className="input-field"
            >
              <option value="">Personal Guarantee</option>
              <option value="no-pg">No PG</option>
              <option value="limited-pg">Limited PG</option>
              <option value="full-pg">Full PG</option>
            </select>
            <select
              value={filters.documentation}
              onChange={(e) => setFilters({...filters, documentation: e.target.value})}
              className="input-field"
            >
              <option value="">Documentation</option>
              <option value="no-doc">No Doc</option>
              <option value="low-doc">Low Doc</option>
              <option value="full-doc">Full Doc</option>
            </select>
            <button className="btn-primary">
              Apply Filters
            </button>
          </div>
        )}
      </div>

      {/* Funding Options */}
      <div className="grid lg:grid-cols-2 gap-6">
        {mockFundingOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 card-shadow hover:card-shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {option.lenderName}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-orange-600">
                    {option.loanType}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{option.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Approval</div>
                <div className="text-sm font-medium text-green-600">{option.approval}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Amount Range</div>
                <div className="font-medium">
                  ${option.minAmount.toLocaleString()} - ${option.maxAmount.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Interest Rate</div>
                <div className="font-medium">{option.rate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Term</div>
                <div className="font-medium">{option.term}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Documentation</div>
                <div className="font-medium">{option.documentation}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                option.guarantee === 'No PG' ? 'bg-green-100 text-green-800' :
                option.guarantee === 'Limited PG' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {option.guarantee}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {option.documentation}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm font-medium text-gray-900">Key Features:</div>
              <ul className="text-sm text-gray-600 space-y-1">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-sm font-medium text-gray-900">Requirements:</div>
              <ul className="text-sm text-gray-600 space-y-1">
                {option.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <SafeIcon icon={FiInfo} className="w-3 h-3 text-blue-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleApply(option)}
                className="flex-1 btn-primary"
              >
                Apply Now
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                <span>Details</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Applications</h3>
        <button className="btn-secondary flex items-center space-x-2">
          <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {mockApplications.length === 0 ? (
        <div className="text-center py-8">
          <SafeIcon icon={FiClock} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h4>
          <p className="text-gray-600 mb-4">Start by exploring funding matches and applying to lenders</p>
          <button
            onClick={() => setActiveTab('matches')}
            className="btn-primary"
          >
            Find Funding
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockApplications.map((app, index) => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{app.lender}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount: </span>
                  <span className="font-medium">{app.amount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Applied: </span>
                  <span className="font-medium">{app.appliedDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">
                    {app.status === 'Approved' ? 'Approved: ' : 'Decision Expected: '}
                  </span>
                  <span className="font-medium">
                    {app.approvedDate || app.expectedDecision}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Funding Match</h1>
          <p className="text-gray-600">
            Get matched with the right lenders for your business needs. No doc, low doc, and traditional options available.
          </p>
        </div>

        {businessProfiles.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">
                Create business profiles first to get better funding matches.
              </span>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">Lender Partners</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$2B+</div>
            <div className="text-sm text-gray-600">Funded</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24hrs</div>
            <div className="text-sm text-gray-600">Avg Approval</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl card-shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'matches' && renderMatches()}
              {activeTab === 'applications' && renderApplications()}
              {activeTab === 'approved' && (
                <div className="text-center py-8">
                  <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Approved Applications</h4>
                  <p className="text-gray-600">Your approved funding will appear here</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FundingMatch;