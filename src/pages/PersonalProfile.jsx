import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiTrendingUp, FiAlertCircle, FiCheck, FiTarget,
  FiFileText, FiRefreshCw, FiPlus, FiBarChart3
} = FiIcons;

const PersonalProfile = () => {
  const { personalCreditData, updatePersonalCredit } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Profile Overview', icon: FiUser },
    { id: 'accuracy', name: 'Accuracy Check', icon: FiTarget },
    { id: 'recommendations', name: 'Olagix Insights', icon: FiBarChart3 },
    { id: 'reports', name: 'Funding Reports', icon: FiFileText }
  ];

  const mockAccuracyFactors = [
    { name: 'Payment History', accuracy: 95, status: 'excellent', issues: 0 },
    { name: 'Account Information', accuracy: 88, status: 'good', issues: 2 },
    { name: 'Personal Details', accuracy: 92, status: 'good', issues: 1 },
    { name: 'Employment History', accuracy: 78, status: 'fair', issues: 3 },
    { name: 'Address History', accuracy: 85, status: 'good', issues: 2 }
  ];

  const mockRecommendations = [
    {
      title: 'Verify Employment Information',
      priority: 'high',
      impact: 'High funding approval rates',
      description: 'Update employment details to ensure accuracy across all bureaus.',
      action: 'Update profile information',
      category: 'accuracy'
    },
    {
      title: 'Dispute Outdated Address',
      priority: 'medium',
      impact: 'Improved verification speed',
      description: 'Old address found on secondary bureau reports.',
      action: 'File accuracy dispute',
      category: 'disputes'
    },
    {
      title: 'Optimize Profile Completeness',
      priority: 'medium',
      impact: 'Better funding matches',
      description: 'Adding missing information increases approval odds.',
      action: 'Complete remaining fields',
      category: 'optimization'
    }
  ];

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-blue-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyGrade = (accuracy) => {
    if (accuracy >= 90) return 'Excellent';
    if (accuracy >= 80) return 'Good';
    if (accuracy >= 70) return 'Fair';
    return 'Needs Attention';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Score Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Personal Funding Profile</h2>
            <p className="text-orange-100 mb-4">Accuracy-focused profile optimization</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                <span>Profile Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                <span>Monitoring Enabled</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">87%</div>
            <div className="text-orange-100">Accuracy Score</div>
          </div>
        </div>
      </div>

      {/* Accuracy Factors */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Accuracy Breakdown</h3>
        <div className="space-y-4">
          {mockAccuracyFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{factor.name}</h4>
                  <span className={`text-sm font-medium ${getAccuracyColor(factor.accuracy)}`}>
                    {factor.accuracy}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        factor.status === 'excellent' ? 'bg-green-500' :
                        factor.status === 'good' ? 'bg-blue-500' :
                        factor.status === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${factor.accuracy}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {factor.issues} issue{factor.issues !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">8</div>
          <div className="text-sm text-gray-600">Issues Resolved</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
          <div className="text-sm text-gray-600">Active Monitoring</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">Olagix Monitoring</div>
        </div>
      </div>
    </div>
  );

  const renderAccuracy = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Accuracy Assessment</h3>
          <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700">
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span className="text-sm font-medium">Run New Check</span>
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Accurate Information</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Current employment verified</li>
              <li>• Primary address confirmed</li>
              <li>• Phone number validated</li>
              <li>• Social security verified</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Needs Review</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Previous employment dates</li>
              <li>• Secondary address history</li>
              <li>• Income information</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Detailed Accuracy Report</h4>
          <div className="space-y-3">
            {mockAccuracyFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">{factor.name}</h5>
                  <p className="text-sm text-gray-600">{getAccuracyGrade(factor.accuracy)}</p>
                </div>
                <div className="text-right">
                  <span className={`font-medium ${getAccuracyColor(factor.accuracy)}`}>
                    {factor.accuracy}%
                  </span>
                  {factor.issues > 0 && (
                    <p className="text-xs text-red-600">{factor.issues} issues found</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Olagix Insights & Recommendations</h3>
          <span className="text-sm text-gray-600">Powered by Olagix Intelligence</span>
        </div>
        <div className="space-y-4">
          {mockRecommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-500' : 
                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                </div>
                <span className="text-sm font-medium text-green-600">{rec.impact}</span>
              </div>
              <p className="text-gray-600 mb-3">{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.category === 'accuracy' ? 'bg-blue-100 text-blue-800' :
                  rec.category === 'disputes' ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.category}
                </span>
                <button className="btn-primary text-sm">{rec.action}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Funding Profile Reports</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 transition-colors cursor-pointer">
            <SafeIcon icon={FiFileText} className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Primary Bureau Report</h4>
            <p className="text-xs text-gray-600">Complete profile analysis</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 transition-colors cursor-pointer">
            <SafeIcon icon={FiTarget} className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Accuracy Report</h4>
            <p className="text-xs text-gray-600">Detailed accuracy breakdown</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 transition-colors cursor-pointer">
            <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Progress Report</h4>
            <p className="text-xs text-gray-600">Monthly improvement tracking</p>
          </div>
        </div>

        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Generate Comprehensive Report</h4>
          <p className="text-gray-600 mb-4">Get a detailed analysis of your funding profile</p>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Funding Profile</h1>
          <p className="text-gray-600">
            Optimize your personal funding profile with accuracy-focused monitoring and insights.
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
              {activeTab === 'accuracy' && renderAccuracy()}
              {activeTab === 'recommendations' && renderRecommendations()}
              {activeTab === 'reports' && renderReports()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PersonalProfile;