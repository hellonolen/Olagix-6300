import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiShield, FiFileText, FiPlus, FiCheck, FiClock, FiX, FiDownload, FiSend, FiAlertTriangle} = FiIcons;

const DisputeCenter = () => {
  const {personalCreditData, addDispute} = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  const tabs = [
    {id: 'overview', name: 'Overview', icon: FiShield},
    {id: 'active', name: 'Active Disputes', icon: FiClock},
    {id: 'resolved', name: 'Resolved', icon: FiCheck},
    {id: 'templates', name: 'Letter Templates', icon: FiFileText}
  ];

  const disputeTemplates = [
    {
      id: 1,
      name: 'Inaccurate Personal Information',
      description: 'Challenge incorrect name, address, or SSN on credit reports',
      category: 'Personal Info',
      successRate: '95%'
    },
    {
      id: 2,
      name: 'Unauthorized Hard Inquiry',
      description: 'Remove hard inquiries made without permission',
      category: 'Inquiries',
      successRate: '88%'
    },
    {
      id: 3,
      name: 'Incorrect Account Status',
      description: 'Fix accounts showing wrong payment status',
      category: 'Account Status',
      successRate: '92%'
    },
    {
      id: 4,
      name: 'Duplicate Accounts',
      description: 'Remove duplicate listings of the same account',
      category: 'Duplicates',
      successRate: '97%'
    }
  ];

  const mockDisputes = [
    {
      id: 1,
      item: 'Late payment on XYZ Credit Card',
      bureau: 'Experian',
      status: 'Under Investigation',
      filed: '2024-01-15',
      expectedResponse: '2024-02-15'
    },
    {
      id: 2,
      item: 'Incorrect address information',
      bureau: 'Equifax',
      status: 'Resolved - Updated',
      filed: '2024-01-10',
      resolved: '2024-01-28'
    }
  ];

  const [disputeForm, setDisputeForm] = useState({
    item: '',
    bureau: '',
    reason: '',
    details: ''
  });

  const handleSubmitDispute = (e) => {
    e.preventDefault();
    addDispute({
      ...disputeForm,
      status: 'Draft Created',
      filed: new Date().toISOString().split('T')[0]
    });
    setShowDisputeForm(false);
    setDisputeForm({item: '', bureau: '', reason: '', details: ''});
    setActiveTab('active');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved - updated': return 'bg-green-100 text-green-800';
      case 'resolved - removed': return 'bg-green-100 text-green-800';
      case 'under investigation': return 'bg-yellow-100 text-yellow-800';
      case 'draft created': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {personalCreditData.disputes?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Active Disputes</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">2</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">93%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">30</div>
          <div className="text-sm text-gray-600">Avg Days</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {disputeTemplates.map((template, index) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-medium">{template.successRate} success</span>
                <button 
                  onClick={() => setShowDisputeForm(true)}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        {mockDisputes.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon icon={FiShield} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Disputes Filed</h4>
            <p className="text-gray-600 mb-4">Start by filing your first credit dispute</p>
            <button 
              onClick={() => setShowDisputeForm(true)}
              className="btn-primary"
            >
              File Dispute
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockDisputes.slice(0, 3).map((dispute, index) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{dispute.item}</h4>
                  <p className="text-sm text-gray-600">Bureau: {dispute.bureau}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                  {dispute.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderActive = () => (
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

      {[...mockDisputes, ...(personalCreditData.disputes || [])].length === 0 ? (
        <div className="text-center py-8">
          <SafeIcon icon={FiClock} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Disputes</h4>
          <p className="text-gray-600 mb-4">File your first dispute to get started</p>
          <button 
            onClick={() => setShowDisputeForm(true)}
            className="btn-primary"
          >
            File Dispute
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {[...mockDisputes, ...(personalCreditData.disputes || [])].map((dispute, index) => (
            <div key={dispute.id || index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{dispute.item}</h4>
                  <p className="text-sm text-gray-600">Bureau: {dispute.bureau}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                  {dispute.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Filed: </span>
                  <span className="font-medium">{dispute.filed}</span>
                </div>
                <div>
                  <span className="text-gray-600">
                    {dispute.resolved ? 'Resolved: ' : 'Expected Response: '}
                  </span>
                  <span className="font-medium">
                    {dispute.resolved || dispute.expectedResponse || 'TBD'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Method: </span>
                  <span className="font-medium">Online Dispute</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary text-sm flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="btn-secondary text-sm flex items-center space-x-2">
                  <SafeIcon icon={FiSend} className="w-4 h-4" />
                  <span>Follow Up</span>
                </button>
                <button className="text-orange-600 hover:text-orange-700 text-sm">
                  View Details
                </button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dispute Center</h1>
          <p className="text-gray-600">
            Challenge inaccurate information on your credit reports with AI-powered dispute letters.
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
              {activeTab === 'active' && renderActive()}
              {activeTab === 'resolved' && (
                <div className="text-center py-8">
                  <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Resolved Disputes</h4>
                  <p className="text-gray-600">Resolved disputes will appear here</p>
                </div>
              )}
              {activeTab === 'templates' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {disputeTemplates.map((template, index) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          {template.category}
                        </span>
                        <span className="text-green-600 font-medium text-sm">{template.successRate} success</span>
                      </div>
                    </div>
                  ))}
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
                <h3 className="text-lg font-semibold text-gray-900">File New Dispute</h3>
                <button
                  onClick={() => setShowDisputeForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitDispute} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item to Dispute *
                  </label>
                  <input
                    type="text"
                    required
                    value={disputeForm.item}
                    onChange={(e) => setDisputeForm({...disputeForm, item: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Late payment on ABC Credit Card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Bureau *
                  </label>
                  <select
                    required
                    value={disputeForm.bureau}
                    onChange={(e) => setDisputeForm({...disputeForm, bureau: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select bureau</option>
                    <option value="Experian">Experian</option>
                    <option value="Equifax">Equifax</option>
                    <option value="TransUnion">TransUnion</option>
                    <option value="All Three">All Three Bureaus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Dispute *
                  </label>
                  <select
                    required
                    value={disputeForm.reason}
                    onChange={(e) => setDisputeForm({...disputeForm, reason: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select reason</option>
                    <option value="not-mine">Not my account</option>
                    <option value="inaccurate">Information is inaccurate</option>
                    <option value="outdated">Information is outdated</option>
                    <option value="duplicate">Duplicate listing</option>
                    <option value="fraud">Identity theft/fraud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    rows={3}
                    value={disputeForm.details}
                    onChange={(e) => setDisputeForm({...disputeForm, details: e.target.value})}
                    className="input-field"
                    placeholder="Provide additional context..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDisputeForm(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    File Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DisputeCenter;