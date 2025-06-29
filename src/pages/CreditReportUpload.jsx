import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiFile, FiCheck, FiX, FiExternalLink, FiShield, FiEye, FiDownload } = FiIcons;

const CreditReportUpload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [connections, setConnections] = useState({
    experian: false,
    equifax: false,
    transunion: false
  });

  const tabs = [
    { id: 'upload', name: 'Upload Reports', icon: FiUpload },
    { id: 'connect', name: 'Connect Bureaus', icon: FiExternalLink },
    { id: 'reports', name: 'My Reports', icon: FiFile }
  ];

  const bureauConnections = [
    {
      id: 'experian',
      name: 'Experian',
      description: 'Connect directly to Experian for real-time credit monitoring',
      logo: 'https://via.placeholder.com/60x40/1a73e8/white?text=EXP',
      features: ['Real-time updates', 'Automatic dispute tracking', 'Score monitoring'],
      status: connections.experian
    },
    {
      id: 'equifax',
      name: 'Equifax',
      description: 'Link your Equifax account for comprehensive credit analysis',
      logo: 'https://via.placeholder.com/60x40/34a853/white?text=EQF',
      features: ['Monthly reports', 'Identity monitoring', 'Credit alerts'],
      status: connections.equifax
    },
    {
      id: 'transunion',
      name: 'TransUnion',
      description: 'Integrate with TransUnion for complete credit visibility',
      logo: 'https://via.placeholder.com/60x40/ea4335/white?text=TU',
      features: ['Credit monitoring', 'VantageScore tracking', 'Report analysis'],
      status: connections.transunion
    }
  ];

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      bureau: 'Unknown',
      status: 'Processing'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate processing
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => 
        newFiles.find(f => f.id === file.id) 
          ? { ...file, status: 'Processed', bureau: 'Experian' }
          : file
      ));
    }, 3000);
  };

  const connectBureau = (bureauId) => {
    setConnections(prev => ({ ...prev, [bureauId]: !prev[bureauId] }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderUpload = () => (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Credit Reports</h3>
        
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h4>
          <p className="text-gray-600 mb-4">Support for PDF, PNG, JPG files up to 10MB</p>
          <button className="btn-primary">
            Choose Files
          </button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Supported Credit Reports</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Experian, Equifax, TransUnion official reports</li>
            <li>• Annual credit reports from annualcreditreport.com</li>
            <li>• Credit monitoring service reports (Credit Karma, etc.)</li>
            <li>• Bank or lender provided credit reports</li>
          </ul>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiFile} className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatFileSize(file.size)} • {file.bureau} • {file.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    file.status === 'Processed' ? 'bg-green-100 text-green-800' :
                    file.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {file.status}
                  </span>
                  {file.status === 'Processed' && (
                    <button className="btn-secondary text-sm">
                      <SafeIcon icon={FiEye} className="w-3 h-3 mr-1" />
                      View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderConnect = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect to Credit Bureaus</h3>
        <p className="text-gray-600 mb-6">
          Connect directly to credit bureaus through Ologix for real-time monitoring and automatic updates.
        </p>

        <div className="grid gap-6">
          {bureauConnections.map((bureau) => (
            <motion.div
              key={bureau.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img src={bureau.logo} alt={bureau.name} className="w-15 h-10 rounded" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{bureau.name}</h4>
                    <p className="text-gray-600 mb-3">{bureau.description}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {bureau.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <SafeIcon icon={FiCheck} className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => connectBureau(bureau.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    bureau.status
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {bureau.status ? 'Connected' : 'Connect'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-green-900 mb-1">Secure & Private</h5>
              <p className="text-sm text-green-800">
                All connections are secured with bank-level encryption. Ologix never stores your login credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">My Credit Reports</h3>
          <button className="btn-primary flex items-center space-x-2">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Download All</span>
          </button>
        </div>

        {/* Connected Reports */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(connections).map(([bureau, connected]) => (
            <div key={bureau} className={`p-4 border-2 rounded-lg ${connected ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              <h4 className="font-medium text-gray-900 capitalize mb-2">{bureau}</h4>
              {connected ? (
                <div>
                  <p className="text-sm text-green-700 mb-2">Last updated: Today</p>
                  <button className="btn-secondary text-sm w-full">View Report</button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Not connected</p>
              )}
            </div>
          ))}
        </div>

        {/* Analysis Results */}
        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Ologix Analysis Results</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Positive Factors</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Payment history: 95% on-time payments</li>
                <li>• Account age: 8+ years average</li>
                <li>• No recent hard inquiries</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h5 className="font-medium text-orange-900 mb-2">Areas for Improvement</h5>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Credit utilization: 45% (recommended <30%)</li>
                <li>• 2 accounts with late payments</li>
                <li>• Limited credit mix diversity</li>
              </ul>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Reports</h1>
          <p className="text-gray-600">
            Upload your credit reports or connect directly to bureaus for real-time monitoring with Ologix AI analysis.
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
              {activeTab === 'upload' && renderUpload()}
              {activeTab === 'connect' && renderConnect()}
              {activeTab === 'reports' && renderReports()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditReportUpload;