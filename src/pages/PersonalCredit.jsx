import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiUser, FiTrendingUp, FiTrendingDown, FiAlertCircle, FiCheck, FiX, FiPlus, FiFileText, FiDownload, FiRefreshCw, FiTarget} = FiIcons;

const PersonalCredit = () => {
  const {personalCreditData, updatePersonalCredit, addDispute} = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  const tabs = [
    {id: 'overview', name: 'Overview', icon: FiUser},
    {id: 'reports', name: 'Credit Reports', icon: FiFileText},
    {id: 'disputes', name: 'Disputes', icon: FiAlertCircle},
    {id: 'recommendations', name: 'Olagix Recommendations', icon: FiTarget}
  ];

  const mockCreditFactors = [
    {name: 'Payment History', score: 85, impact: 'high', status: 'good'},
    {name: 'Credit Utilization', score: 72, impact: 'high', status: 'fair'},
    {name: 'Length of Credit History', score: 90, impact: 'medium', status: 'excellent'},
    {name: 'Credit Mix', score: 78, impact: 'low', status: 'good'},
    {name: 'New Credit', score: 65, impact: 'low', status: 'fair'}
  ];

  const mockReports = [
    {bureau: 'Experian', score: 720, date: '2024-01-15', status: 'current'},
    {bureau: 'Equifax', score: 715, date: '2024-01-14', status: 'current'},
    {bureau: 'TransUnion', score: 710, date: '2024-01-13', status: 'current'}
  ];

  const mockRecommendations = [
    {
      title: 'Reduce Credit Card Balances',
      priority: 'high',
      impact: '+25 points',
      description: 'Your credit utilization is at 45%. Reducing it to below 30% could significantly improve your score.',
      action: 'Pay down balances on cards with highest utilization first.'
    },
    {
      title: 'Dispute Inaccurate Late Payment',
      priority: 'high',
      impact: '+15 points',
      description: 'We found a late payment from 2022 that may be inaccurate based on your payment history.',
      action: 'Generate Olagix dispute letter to challenge this item.'
    },
    {
      title: 'Consider Authorized User Status',
      priority: 'medium',
      impact: '+10 points',
      description: 'Adding an authorized user account with good history could boost your score.',
      action: 'Ask family member with excellent credit to add you.'
    }
  ];

  const handleDisputeSubmit = (disputeData) => {
    addDispute(disputeData);
    setShowDisputeForm(false);
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Credit Score Card */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Credit Score Overview</h3>
          <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700">
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {mockReports.map((report, index) => (
            <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{report.bureau}</h4>
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(report.score)}`}>
                {report.score}
              </div>
              <div className="text-sm text-gray-600 mb-2">{getScoreGrade(report.score)}</div>
              <div className="text-xs text-gray-500">Updated {report.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Factors */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Credit Score Factors</h3>
        <div className="space-y-4">
          {mockCreditFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{factor.name}</h4>
                  <span className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
                    {factor.score}%
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
                      style={{width: `${factor.score}%`}}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">{factor.impact} impact</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Olagix-Powered Recommendations</h3>
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
                <p className="text-sm text-gray-700 font-medium">{rec.action}</p>
                <button className="btn-primary text-sm">Take Action</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDisputes = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Disputes</h3>
          <button 
            onClick={() => setShowDisputeForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>New Dispute</span>
          </button>
        </div>
        
        {personalCreditData.disputes.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Disputes</h4>
            <p className="text-gray-600 mb-4">Start by creating your first dispute letter</p>
            <button 
              onClick={() => setShowDisputeForm(true)}
              className="btn-primary"
            >
              Create Dispute
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {personalCreditData.disputes.map((dispute, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{dispute.item}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dispute.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    dispute.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {dispute.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{dispute.reason}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Filed on {dispute.date}</span>
                  <button className="text-orange-600 hover:text-orange-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Credit</h1>
          <p className="text-gray-600">
            Monitor and optimize your personal credit profile with Olagix-powered insights.
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
              {activeTab === 'recommendations' && renderRecommendations()}
              {activeTab === 'disputes' && renderDisputes()}
              {activeTab === 'reports' && (
                <div className="text-center py-8">
                  <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Credit Reports</h4>
                  <p className="text-gray-600 mb-4">Detailed credit reports from all three bureaus</p>
                  <button className="btn-primary">
                    Connect Credit Monitoring
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Dispute Form Modal */}
        {showDisputeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">New Dispute</h3>
                <button
                  onClick={() => setShowDisputeForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleDisputeSubmit({
                  item: formData.get('item'),
                  reason: formData.get('reason'),
                  date: new Date().toISOString().split('T')[0]
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item to Dispute
                    </label>
                    <input
                      name="item"
                      type="text"
                      required
                      className="input-field"
                      placeholder="e.g., Late payment on ABC Credit Card"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dispute Reason
                    </label>
                    <textarea
                      name="reason"
                      rows={4}
                      required
                      className="input-field"
                      placeholder="Explain why this item is inaccurate..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowDisputeForm(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn-primary">
                      Create Dispute
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PersonalCredit;