import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiShield, FiFileText, FiPlus, FiDownload, FiSend, FiClock, FiCheck, FiX, FiAlertTriangle, FiScale} = FiIcons;

const LitigationSupport = () => {
  const {litigationCases, addLitigationCase} = useUser();
  const [activeTab, setActiveTab] = useState('generate');
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const tabs = [
    {id: 'generate', name: 'Generate Letters', icon: FiFileText},
    {id: 'cases', name: 'Active Cases', icon: FiShield},
    {id: 'templates', name: 'Letter Templates', icon: FiScale}
  ];

  const letterTemplates = [
    {
      id: 1,
      name: 'FCRA Violation Notice',
      description: 'Challenge inaccurate reporting under Fair Credit Reporting Act',
      category: 'Credit Reporting',
      laws: ['FCRA Section 607', 'FCRA Section 611'],
      damages: '$1,000 per violation',
      timeframe: '30 days response required'
    },
    {
      id: 2,
      name: 'FDCPA Debt Collection Violation',
      description: 'Address illegal debt collection practices',
      category: 'Debt Collection',
      laws: ['FDCPA Section 807', 'FDCPA Section 809'],
      damages: '$1,000 + attorney fees',
      timeframe: '5 days validation period'
    },
    {
      id: 3,
      name: 'TCPA Robocall Violation',
      description: 'Combat illegal robocalls and text messages',
      category: 'Communication',
      laws: ['TCPA 47 USC 227'],
      damages: '$500-$1,500 per call',
      timeframe: 'Immediate cease required'
    },
    {
      id: 4,
      name: 'Identity Theft Dispute',
      description: 'Remove fraudulent accounts from credit reports',
      category: 'Identity Protection',
      laws: ['FCRA Section 605B', 'FACTA'],
      damages: 'Actual + statutory damages',
      timeframe: '4 business days response'
    }
  ];

  const mockCases = [
    {
      id: 1,
      title: 'FCRA Violation - Inaccurate Late Payment',
      defendant: 'ABC Credit Card Company',
      status: 'Investigation',
      filed: '2024-01-10',
      amount: '$1,000',
      nextAction: 'Await response (15 days remaining)'
    },
    {
      id: 2,
      title: 'FDCPA Violation - Harassment',
      defendant: 'XYZ Collection Agency',
      status: 'Settlement Offered',
      filed: '2024-01-05',
      amount: '$2,500',
      nextAction: 'Review settlement terms'
    }
  ];

  const [letterForm, setLetterForm] = useState({
    template: '',
    creditor: '',
    account: '',
    violation: '',
    damages: '',
    details: ''
  });

  const handleGenerateLetter = (e) => {
    e.preventDefault();
    const newCase = {
      title: `${selectedTemplate.name} - ${letterForm.creditor}`,
      defendant: letterForm.creditor,
      status: 'Draft Generated',
      filed: new Date().toISOString().split('T')[0],
      amount: letterForm.damages,
      template: selectedTemplate.name,
      details: letterForm.details
    };
    addLitigationCase(newCase);
    setShowLetterForm(false);
    setActiveTab('cases');
    
    // Reset form
    setLetterForm({
      template: '',
      creditor: '',
      account: '',
      violation: '',
      damages: '',
      details: ''
    });
    setSelectedTemplate(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'draft generated': return 'bg-blue-100 text-blue-800';
      case 'investigation': return 'bg-yellow-100 text-yellow-800';
      case 'settlement offered': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderGenerate = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Olagix Letter Generator</h3>
          <span className="text-sm text-gray-600">Powered by Consumer Law Olagix</span>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Legal Disclaimer</h4>
              <p className="text-sm text-blue-800">
                These Olagix-generated letters are for informational purposes only. We are not a law firm and this does not constitute legal advice. Consider consulting with an attorney for complex cases.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {letterTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                setSelectedTemplate(template);
                setShowLetterForm(true);
              }}
            >
              <div className="mb-3">
                <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-500">Category: {template.category}</div>
                <div className="text-xs text-gray-500">Damages: {template.damages}</div>
                <div className="text-xs text-gray-500">Response Time: {template.timeframe}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-600">Generate Letter</span>
                <SafeIcon icon={FiFileText} className="w-4 h-4 text-orange-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">2,450+</div>
          <div className="text-sm text-gray-600">Letters Generated</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">$2.1M</div>
          <div className="text-sm text-gray-600">Damages Recovered</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
          <div className="text-sm text-gray-600">Consumer Laws</div>
        </div>
      </div>
    </div>
  );

  const renderCases = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Cases</h3>
        <button
          onClick={() => setActiveTab('generate')}
          className="btn-primary flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>

      {litigationCases.length === 0 && mockCases.length === 0 ? (
        <div className="text-center py-8">
          <SafeIcon icon={FiShield} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Cases</h4>
          <p className="text-gray-600 mb-4">Start by generating your first litigation letter</p>
          <button
            onClick={() => setActiveTab('generate')}
            className="btn-primary"
          >
            Generate Letter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {[...mockCases, ...litigationCases].map((case_, index) => (
            <div key={case_.id || index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{case_.title}</h4>
                  <p className="text-sm text-gray-600">vs. {case_.defendant}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                  {case_.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Filed: </span>
                  <span className="font-medium">{case_.filed}</span>
                </div>
                <div>
                  <span className="text-gray-600">Potential Damages: </span>
                  <span className="font-medium">{case_.amount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Next Action: </span>
                  <span className="font-medium">{case_.nextAction || 'Review case'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary text-sm flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download Letter</span>
                </button>
                <button className="btn-secondary text-sm flex items-center space-x-2">
                  <SafeIcon icon={FiSend} className="w-4 h-4" />
                  <span>Send Letter</span>
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

  const renderTemplates = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Consumer Law Templates</h3>
      <div className="space-y-6">
        {letterTemplates.map((template, index) => (
          <div key={template.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-gray-600 mb-3">{template.description}</p>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  {template.category}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowLetterForm(true);
                }}
                className="btn-primary"
              >
                Use Template
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-600 mb-1">Applicable Laws:</div>
                <ul className="space-y-1">
                  {template.laws.map((law, idx) => (
                    <li key={idx} className="text-gray-900">{law}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Potential Damages:</div>
                <div className="text-gray-900 font-medium">{template.damages}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Response Timeframe:</div>
                <div className="text-gray-900 font-medium">{template.timeframe}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Litigation Support</h1>
          <p className="text-gray-600">
            Olagix-powered legal letter generation based on consumer protection laws. Fight back against violations.
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
              {activeTab === 'generate' && renderGenerate()}
              {activeTab === 'cases' && renderCases()}
              {activeTab === 'templates' && renderTemplates()}
            </motion.div>
          </div>
        </div>

        {/* Letter Generation Form Modal */}
        {showLetterForm && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Generate {selectedTemplate.name}
                </h3>
                <button
                  onClick={() => {
                    setShowLetterForm(false);
                    setSelectedTemplate(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleGenerateLetter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creditor/Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={letterForm.creditor}
                    onChange={(e) => setLetterForm({...letterForm, creditor: e.target.value})}
                    className="input-field"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number (if applicable)
                  </label>
                  <input
                    type="text"
                    value={letterForm.account}
                    onChange={(e) => setLetterForm({...letterForm, account: e.target.value})}
                    className="input-field"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Violation *
                  </label>
                  <input
                    type="text"
                    required
                    value={letterForm.violation}
                    onChange={(e) => setLetterForm({...letterForm, violation: e.target.value})}
                    className="input-field"
                    placeholder="Describe the violation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Potential Damages
                  </label>
                  <input
                    type="text"
                    value={letterForm.damages}
                    onChange={(e) => setLetterForm({...letterForm, damages: e.target.value})}
                    className="input-field"
                    placeholder="e.g., $1,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    rows={4}
                    value={letterForm.details}
                    onChange={(e) => setLetterForm({...letterForm, details: e.target.value})}
                    className="input-field"
                    placeholder="Provide any additional context or details..."
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Template Information:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Laws:</strong> {selectedTemplate.laws.join(', ')}</div>
                    <div><strong>Damages:</strong> {selectedTemplate.damages}</div>
                    <div><strong>Response Time:</strong> {selectedTemplate.timeframe}</div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLetterForm(false);
                      setSelectedTemplate(null);
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Generate Letter
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

export default LitigationSupport;