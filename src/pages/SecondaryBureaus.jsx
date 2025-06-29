import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiFileText, FiShield, FiCheck, FiClock, FiPlus, FiDownload, FiExternalLink, FiAlertCircle} = FiIcons;

const SecondaryBureaus = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {id: 'overview', name: 'Overview', icon: FiFileText},
    {id: 'reports', name: 'Reports', icon: FiShield},
    {id: 'monitoring', name: 'Monitoring', icon: FiClock}
  ];

  const bureaus = [
    {
      name: 'ChexSystems',
      type: 'Banking',
      description: 'Banking and deposit account reporting',
      status: 'Active',
      lastUpdated: '2024-01-15',
      issues: 0,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'LexisNexis',
      type: 'Identity',
      description: 'Identity verification and background checks',
      status: 'Needs Review',
      lastUpdated: '2024-01-10',
      issues: 1,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'CoreLogic',
      type: 'Property',
      description: 'Rental and property history',
      status: 'Clean',
      lastUpdated: '2024-01-12',
      issues: 0,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Teletrack',
      type: 'Alternative Credit',
      description: 'Payday and alternative lending',
      status: 'Not Monitored',
      lastUpdated: 'Never',
      issues: 0,
      color: 'bg-gray-100 text-gray-800'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">About Secondary Credit Bureaus</h4>
            <p className="text-sm text-blue-800">
              Secondary credit bureaus collect specialized data that can impact your ability to get loans, open bank accounts, or rent properties. Unlike the "Big 3" (Experian, Equifax, TransUnion), these agencies focus on specific industries like banking, rentals, and alternative lending.
            </p>
          </div>
        </div>
      </div>

      {/* Bureau Status Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {bureaus.map((bureau, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{bureau.name}</h3>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  {bureau.type}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${bureau.color}`}>
                {bureau.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{bureau.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{bureau.lastUpdated}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Issues Found:</span>
                <span className={`font-medium ${bureau.issues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {bureau.issues}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 btn-primary text-sm">
                View Report
              </button>
              <button className="btn-secondary text-sm flex items-center space-x-1">
                <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                <span>Website</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
          <div className="text-sm text-gray-600">Bureaus Monitored</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">3</div>
          <div className="text-sm text-gray-600">Clean Reports</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">1</div>
          <div className="text-sm text-gray-600">Needs Review</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Active Disputes</div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Secondary Bureau Reports</h3>
          <button className="btn-primary flex items-center space-x-2">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Download All</span>
          </button>
        </div>

        <div className="space-y-4">
          {bureaus.map((bureau, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{bureau.name} Report</h4>
                  <p className="text-sm text-gray-600">{bureau.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${bureau.color}`}>
                  {bureau.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last updated: {bureau.lastUpdated}</span>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm">View Details</button>
                  <button className="btn-secondary text-sm flex items-center space-x-1">
                    <SafeIcon icon={FiDownload} className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monitoring Settings</h3>
        
        <div className="space-y-4">
          {bureaus.map((bureau, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{bureau.name}</h4>
                <p className="text-sm text-gray-600">{bureau.type} monitoring</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  bureau.status === 'Not Monitored' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                }`}>
                  {bureau.status === 'Not Monitored' ? 'Disabled' : 'Enabled'}
                </span>
                <button className="btn-secondary text-sm">
                  {bureau.status === 'Not Monitored' ? 'Enable' : 'Configure'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiClock} className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Monitoring Schedule</h4>
              <p className="text-sm text-yellow-800">
                Reports are automatically updated monthly. You'll receive alerts when new information is detected or issues are found.
              </p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secondary Bureaus</h1>
          <p className="text-gray-600">
            Monitor and manage your reports from specialized credit agencies beyond the big 3 bureaus.
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
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'reports' && renderReports()}
              {activeTab === 'monitoring' && renderMonitoring()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecondaryBureaus;