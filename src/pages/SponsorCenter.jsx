import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiMail, FiImage, FiDollarSign, FiUsers, FiBarChart3, FiCalendar, FiEdit, FiTrash2, FiPlus, FiEye } = FiIcons;

const SponsorCenter = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Q1 Business Loans Campaign',
      type: 'banner',
      status: 'active',
      impressions: 15420,
      clicks: 892,
      conversions: 34,
      spend: 1250,
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    {
      id: 2,
      name: 'Credit Repair Email Series',
      type: 'email',
      status: 'active',
      impressions: 8500,
      clicks: 1205,
      conversions: 67,
      spend: 850,
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    }
  ]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: FiBarChart3 },
    { id: 'campaigns', name: 'Campaigns', icon: FiTarget },
    { id: 'create', name: 'Create Campaign', icon: FiPlus },
    { id: 'analytics', name: 'Analytics', icon: FiBarChart3 }
  ];

  const campaignTypes = [
    {
      type: 'banner',
      name: 'Banner Ads',
      description: 'Display banner advertisements across the platform',
      pricing: '$2.50 CPM',
      features: ['Premium placement', 'Responsive design', 'A/B testing', 'Real-time analytics']
    },
    {
      type: 'email',
      name: 'Email Campaigns',
      description: 'Targeted email marketing to segmented user base',
      pricing: '$0.15 per email',
      features: ['Audience targeting', 'Custom templates', 'Automation', 'Delivery tracking']
    },
    {
      type: 'sponsored',
      name: 'Sponsored Content',
      description: 'Native advertising within platform content',
      pricing: '$5.00 per click',
      features: ['Native integration', 'Content matching', 'Performance tracking', 'Brand safety']
    }
  ];

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'banner',
    targetAudience: '',
    budget: '',
    startDate: '',
    endDate: '',
    content: '',
    creativeUrl: ''
  });

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    const campaign = {
      ...newCampaign,
      id: Date.now(),
      status: 'pending',
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0
    };
    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({
      name: '',
      type: 'banner',
      targetAudience: '',
      budget: '',
      startDate: '',
      endDate: '',
      content: '',
      creativeUrl: ''
    });
    setActiveTab('campaigns');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
          <div className="text-sm text-gray-600">Active Campaigns</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">23.9K</div>
          <div className="text-sm text-gray-600">Total Impressions</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">2,097</div>
          <div className="text-sm text-gray-600">Total Clicks</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">101</div>
          <div className="text-sm text-gray-600">Conversions</div>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
        <div className="space-y-4">
          {campaigns.slice(0, 3).map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{campaign.type} • {campaign.status}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{campaign.clicks} clicks</div>
                <div className="text-sm text-gray-600">{campaign.conversions} conversions</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('create')}
            className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors text-left"
          >
            <SafeIcon icon={FiPlus} className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">Create Campaign</h4>
            <p className="text-sm text-gray-600">Launch a new marketing campaign</p>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors text-left"
          >
            <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">View Analytics</h4>
            <p className="text-sm text-gray-600">Detailed performance metrics</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors text-left">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Audience Insights</h4>
            <p className="text-sm text-gray-600">Understand your target market</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">All Campaigns</h3>
          <button 
            onClick={() => setActiveTab('create')}
            className="btn-primary flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="capitalize">{campaign.type}</span>
                    <span>•</span>
                    <span>{campaign.startDate} - {campaign.endDate}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm">
                    <SafeIcon icon={FiEye} className="w-3 h-3 mr-1" />
                    View
                  </button>
                  <button className="btn-secondary text-sm">
                    <SafeIcon icon={FiEdit} className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{campaign.impressions.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Impressions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{campaign.clicks.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{campaign.conversions}</div>
                  <div className="text-sm text-gray-600">Conversions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {campaign.clicks > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">CTR</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">${campaign.spend}</div>
                  <div className="text-sm text-gray-600">Spend</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="space-y-6">
      {/* Campaign Types */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Choose Campaign Type</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {campaignTypes.map((type) => (
            <div
              key={type.type}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                newCampaign.type === type.type
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
              onClick={() => setNewCampaign(prev => ({ ...prev, type: type.type }))}
            >
              <h4 className="font-semibold text-gray-900 mb-2">{type.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{type.description}</p>
              <div className="text-sm font-medium text-orange-600 mb-2">{type.pricing}</div>
              <ul className="text-xs text-gray-600 space-y-1">
                {type.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <SafeIcon icon={FiCheck} className="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Form */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Details</h3>
        <form onSubmit={handleCampaignSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
              <input
                type="text"
                required
                value={newCampaign.name}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                  className="input-field pl-8"
                  placeholder="1000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
              <input
                type="date"
                required
                value={newCampaign.startDate}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
              <input
                type="date"
                required
                value={newCampaign.endDate}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
            <select
              value={newCampaign.targetAudience}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="input-field"
            >
              <option value="">All Users</option>
              <option value="new-users">New Users</option>
              <option value="business-owners">Business Owners</option>
              <option value="credit-building">Credit Building Focused</option>
              <option value="funding-seekers">Funding Seekers</option>
            </select>
          </div>

          {newCampaign.type === 'banner' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Creative URL</label>
              <input
                type="url"
                value={newCampaign.creativeUrl}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, creativeUrl: e.target.value }))}
                className="input-field"
                placeholder="https://example.com/banner.jpg"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {newCampaign.type === 'email' ? 'Email Content' : 'Campaign Content'}
            </label>
            <textarea
              rows={4}
              value={newCampaign.content}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, content: e.target.value }))}
              className="input-field"
              placeholder="Enter your campaign content..."
            />
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="btn-primary">
              Create Campaign
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('campaigns')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h3>
        
        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">8.7%</div>
            <div className="text-sm text-blue-800">Average CTR</div>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">4.8%</div>
            <div className="text-sm text-green-800">Conversion Rate</div>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">$20.79</div>
            <div className="text-sm text-purple-800">Cost per Conversion</div>
          </div>
        </div>

        {/* Audience Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Top Performing Segments</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Business Owners</span>
                <span className="font-medium">12.3% CTR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Credit Building</span>
                <span className="font-medium">9.8% CTR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Funding Seekers</span>
                <span className="font-medium">7.2% CTR</span>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Campaign Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Email Campaigns</span>
                <span className="font-medium">14.2% CTR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Banner Ads</span>
                <span className="font-medium">5.8% CTR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sponsored Content</span>
                <span className="font-medium">8.9% CTR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sponsor Center</h1>
          <p className="text-gray-600">
            Manage your marketing campaigns and reach Olagix's engaged user base with AI-powered targeting.
          </p>
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
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'campaigns' && renderCampaigns()}
              {activeTab === 'create' && renderCreate()}
              {activeTab === 'analytics' && renderAnalytics()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SponsorCenter;