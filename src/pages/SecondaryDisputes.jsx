import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiFileText, FiPlus, FiSend, FiClock, FiCheck, FiX, FiDownload, FiRefreshCw, FiAlertCircle} = FiIcons;

const SecondaryDisputes = () => {
  const {secondaryDisputes, addSecondaryDispute} = useUser();
  const [activeTab, setActiveTab] = useState('agencies');
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);

  const tabs = [
    {id: 'agencies', name: 'Credit Agencies', icon: FiFileText},
    {id: 'disputes', name: 'Active Disputes', icon: FiClock},
    {id: 'resolved', name: 'Resolved', icon: FiCheck}
  ];

  const secondaryAgencies = [
    {
      id: 1,
      name: 'ChexSystems',
      type: 'Banking',
      description: 'Consumer reporting agency for banking and deposit account information',
      specializes: ['Bank account history', 'Overdrafts', 'Returned checks', 'Account closures'],
      disputeTypes: ['Inaccurate account status', 'Fraudulent accounts', 'Incorrect balances'],
      website: 'https://www.chexsystems.com',
      phone: '1-800-428-9623'
    },
    {
      id: 2,
      name: 'LexisNexis',
      type: 'Identity/Insurance',
      description: 'Comprehensive consumer reporting for insurance and identity verification',
      specializes: ['Insurance claims', 'Identity verification', 'Background checks', 'Property records'],
      disputeTypes: ['Incorrect personal info', 'False insurance claims', 'Identity mix-ups'],
      website: 'https://personalreports.lexisnexis.com',
      phone: '1-866-312-8075'
    },
    {
      id: 3,
      name: 'CoreLogic',
      type: 'Property/Rental',
      description: 'Property and rental history reporting agency',
      specializes: ['Rental history', 'Property records', 'Tenant screening', 'Eviction records'],
      disputeTypes: ['Incorrect rental history', 'False evictions', 'Wrong property info'],
      website: 'https://www.corelogic.com',
      phone: '1-877-532-8778'
    },
    {
      id: 4,
      name: 'Teletrack',
      type: 'Alternative Credit',
      description: 'Alternative credit reporting for payday loans and non-traditional lending',
      specializes: ['Payday loans', 'Check cashing', 'Title loans', 'Alternative credit'],
      disputeTypes: ['Incorrect loan status', 'Fraudulent accounts', 'Wrong payment history'],
      website: 'https://www.teletrack.com',
      phone: '1-800-729-5526'
    },
    {
      id: 5,
      name: 'Early Warning Services',
      type: 'Banking/Fraud',
      description: 'Fraud prevention and banking verification services',
      specializes: ['Account fraud', 'Check fraud', 'Banking verification', 'Risk assessment'],
      disputeTypes: ['False fraud alerts', 'Incorrect risk scores', 'Banking restrictions'],
      website: 'https://www.earlywarning.com',
      phone: '1-855-805-9856'
    },
    {
      id: 6,
      name: 'Clarity Services',
      type: 'Alternative Credit',
      description: 'Alternative credit reporting for subprime lending',
      specializes: ['Subprime loans', 'Alternative credit', 'Rent-to-own', 'Utility reporting'],
      disputeTypes: ['Incorrect payment history', 'False defaults', 'Wrong account info'],
      website: 'https://www.clarityservices.com',
      phone: '1-866-390-3118'
    }
  ];

  const mockDisputes = [
    {
      id: 1,
      agency: 'ChexSystems',
      item: 'Incorrect overdraft record',
      status: 'Under Investigation',
      filed: '2024-01-10',
      expectedResponse: '2024-02-10'
    },
    {
      id: 2,
      agency: 'LexisNexis',
      item: 'False insurance claim',
      status: 'Resolved - Removed',
      filed: '2024-01-05',
      resolved: '2024-01-25'
    }
  ];

  const [disputeForm, setDisputeForm] = useState({
    agency: '',
    item: '',
    reason: '',
    evidence: '',
    requestedAction: ''
  });

  const handleSubmitDispute = (e) => {
    e.preventDefault();
    const newDispute = {
      agency: selectedAgency.name,
      item: disputeForm.item,
      reason: disputeForm.reason,
      status: 'Draft Created',
      filed: new Date().toISOString().split('T')[0],
      evidence: disputeForm.evidence,
      requestedAction: disputeForm.requestedAction
    };
    addSecondaryDispute(newDispute);
    setShowDisputeForm(false);
    setActiveTab('disputes');
    
    // Reset form
    setDisputeForm({
      agency: '',
      item: '',
      reason: '',
      evidence: '',
      requestedAction: ''
    });
    setSelectedAgency(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved - removed': return 'bg-green-100 text-green-800';
      case 'under investigation': return 'bg-yellow-100 text-yellow-800';
      case 'draft created': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAgencies = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Secondary Credit Agencies</h3>
          <span className="text-sm text-gray-600">6 agencies available</span>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">What are Secondary Credit Agencies?</h4>
              <p className="text-sm text-blue-800">
                Beyond the "Big 3" credit bureaus (Experian, Equifax, TransUnion), secondary agencies collect specialized data on banking, rentals, insurance, and alternative credit that can impact your ability to get loans, open accounts, or rent properties.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {secondaryAgencies.map((agency, index) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{agency.name}</h4>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    {agency.type}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedAgency(agency);
                    setShowDisputeForm(true);
                  }}
                  className="btn-primary text-sm"
                >
                  Dispute Item
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{agency.description}</p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Specializes In:</h5>
                  <div className="flex flex-wrap gap-1">
                    {agency.specializes.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Common Disputes:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {agency.disputeTypes.map((dispute, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <SafeIcon icon={FiCheck} className="w-3 h-3 text-green-500" />
                        <span>{dispute}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>Phone: {agency.phone}</span>
                  <a 
                    href={agency.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Website →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
          <div className="text-sm text-gray-600">Agencies Covered</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">850+</div>
          <div className="text-sm text-gray-600">Disputes Filed</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
          <div className="text-sm text-gray-600">Avg Days Resolution</div>
        </div>
      </div>
    </div>
  );

  const renderDisputes = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Disputes</h3>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span>Refresh Status</span>
          </button>
          <button
            onClick={() => setActiveTab('agencies')}
            className="btn-primary flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>New Dispute</span>
          </button>
        </div>
      </div>

      {[...mockDisputes, ...secondaryDisputes].length === 0 ? (
        <div className="text-center py-8">
          <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Disputes</h4>
          <p className="text-gray-600 mb-4">Start by disputing items with secondary credit agencies</p>
          <button
            onClick={() => setActiveTab('agencies')}
            className="btn-primary"
          >
            Start Dispute
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {[...mockDisputes, ...secondaryDisputes].map((dispute, index) => (
            <div key={dispute.id || index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{dispute.item}</h4>
                  <p className="text-sm text-gray-600">Agency: {dispute.agency}</p>
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
                  <span className="font-medium">Olagix Generated Letter</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary text-sm flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download Letter</span>
                </button>
                <button className="btn-secondary text-sm flex items-center space-x-2">
                  <SafeIcon icon={FiSend} className="w-4 h-4" />
                  <span>Send Follow-up</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secondary Disputes</h1>
          <p className="text-gray-600">
            Dispute inaccurate information with secondary credit agencies beyond the big 3 credit bureaus.
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
              {activeTab === 'agencies' && renderAgencies()}
              {activeTab === 'disputes' && renderDisputes()}
              {activeTab === 'resolved' && (
                <div className="text-center py-8">
                  <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Resolved Disputes</h4>
                  <p className="text-gray-600">Resolved disputes will appear here</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Dispute Form Modal */}
        {showDisputeForm && selectedAgency && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Dispute with {selectedAgency.name}
                </h3>
                <button
                  onClick={() => {
                    setShowDisputeForm(false);
                    setSelectedAgency(null);
                  }}
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
                    placeholder="e.g., Incorrect overdraft record from 2023"
                  />
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
                    <option value="">Select a reason</option>
                    <option value="not-mine">This is not my account/information</option>
                    <option value="inaccurate">Information is inaccurate</option>
                    <option value="outdated">Information is outdated</option>
                    <option value="fraud">Result of identity theft/fraud</option>
                    <option value="paid">Account was paid/resolved</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Evidence/Explanation
                  </label>
                  <textarea
                    rows={4}
                    value={disputeForm.evidence}
                    onChange={(e) => setDisputeForm({...disputeForm, evidence: e.target.value})}
                    className="input-field"
                    placeholder="Provide details about why this item is incorrect and any supporting evidence..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requested Action *
                  </label>
                  <select
                    required
                    value={disputeForm.requestedAction}
                    onChange={(e) => setDisputeForm({...disputeForm, requestedAction: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select action</option>
                    <option value="remove">Remove item completely</option>
                    <option value="correct">Correct the information</option>
                    <option value="update">Update account status</option>
                    <option value="verify">Verify information accuracy</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Agency Information:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Agency:</strong> {selectedAgency.name}</div>
                    <div><strong>Type:</strong> {selectedAgency.type}</div>
                    <div><strong>Phone:</strong> {selectedAgency.phone}</div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDisputeForm(false);
                      setSelectedAgency(null);
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Generate Dispute Letter
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

export default SecondaryDisputes;