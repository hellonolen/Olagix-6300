import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiFileText, FiDownload, FiCalendar, FiBarChart3, FiTrendingUp, FiShare, FiFilter, FiRefreshCw} = FiIcons;

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedType, setSelectedType] = useState('all');

  const reportTypes = [
    {id: 'all', name: 'All Reports'},
    {id: 'credit', name: 'Credit Reports'},
    {id: 'business', name: 'Business Reports'},
    {id: 'analytics', name: 'Analytics'},
    {id: 'disputes', name: 'Dispute Reports'}
  ];

  const periods = [
    {value: 'weekly', label: 'Weekly'},
    {value: 'monthly', label: 'Monthly'},
    {value: 'quarterly', label: 'Quarterly'},
    {value: 'yearly', label: 'Yearly'}
  ];

  const reports = [
    {
      id: 1,
      name: 'Complete Credit Analysis',
      type: 'Credit Report',
      description: 'Comprehensive analysis of all credit bureau reports with recommendations',
      date: '2024-01-15',
      size: '2.3 MB',
      status: 'Ready',
      icon: FiBarChart3,
      color: 'text-blue-600'
    },
    {
      id: 2,
      name: 'Business Profile Summary',
      type: 'Business Report',
      description: 'Summary of all business profiles with funding readiness scores',
      date: '2024-01-14',
      size: '1.8 MB',
      status: 'Ready',
      icon: FiTrendingUp,
      color: 'text-green-600'
    },
    {
      id: 3,
      name: 'Monthly Progress Report',
      type: 'Analytics',
      description: 'Monthly progress tracking with score improvements and insights',
      date: '2024-01-12',
      size: '1.2 MB',
      status: 'Ready',
      icon: FiCalendar,
      color: 'text-purple-600'
    },
    {
      id: 4,
      name: 'Dispute Activity Report',
      type: 'Dispute Report',
      description: 'Summary of all dispute activities and their outcomes',
      date: '2024-01-10',
      size: '956 KB',
      status: 'Generating',
      icon: FiFileText,
      color: 'text-orange-600'
    },
    {
      id: 5,
      name: 'Secondary Bureau Analysis',
      type: 'Credit Report',
      description: 'Analysis of secondary credit bureau reports and recommendations',
      date: '2024-01-08',
      size: '1.5 MB',
      status: 'Ready',
      icon: FiBarChart3,
      color: 'text-blue-600'
    }
  ];

  const quickReports = [
    {
      name: 'Current Credit Score Summary',
      description: 'Quick overview of current scores from all bureaus',
      icon: FiTrendingUp,
      estimatedTime: '2 minutes'
    },
    {
      name: 'Business Funding Readiness',
      description: 'Assessment of business profiles for funding applications',
      icon: FiBarChart3,
      estimatedTime: '5 minutes'
    },
    {
      name: 'Profile Accuracy Check',
      description: 'Verification of personal and business information accuracy',
      icon: FiFileText,
      estimatedTime: '3 minutes'
    },
    {
      name: 'Dispute Progress Summary',
      description: 'Status update on all active dispute cases',
      icon: FiCalendar,
      estimatedTime: '1 minute'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    if (selectedType === 'all') return true;
    return report.type.toLowerCase().includes(selectedType);
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Export</h1>
              <p className="text-gray-600">
                Generate comprehensive reports and export your data for analysis or sharing.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary flex items-center space-x-2">
                <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <SafeIcon icon={FiFileText} className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Generate */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 card-shadow mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Generate</h3>
              <div className="space-y-3">
                {quickReports.map((report, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={report.icon} className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{report.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{report.description}</p>
                        <span className="text-xs text-gray-500">~{report.estimatedTime}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input-field"
                  >
                    {reportTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="input-field"
                  >
                    {periods.map(period => (
                      <option key={period.value} value={period.value}>{period.label}</option>
                    ))}
                  </select>
                </div>
                <button className="w-full btn-secondary text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Generated Reports</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{filteredReports.length} reports</span>
                  <button className="btn-secondary text-sm flex items-center space-x-1">
                    <SafeIcon icon={FiFilter} className="w-3 h-3" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={report.icon} className={`w-6 h-6 ${report.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{report.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{report.date}</span>
                            <span>•</span>
                            <span>{report.size}</span>
                            <span>•</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                              {report.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        {report.status === 'Ready' && (
                          <>
                            <button className="btn-secondary text-sm flex items-center space-x-1">
                              <SafeIcon icon={FiDownload} className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                            <button className="btn-secondary text-sm flex items-center space-x-1">
                              <SafeIcon icon={FiShare} className="w-3 h-3" />
                              <span>Share</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-8">
                  <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h4>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or generate a new report</p>
                  <button className="btn-primary">
                    Generate Report
                  </button>
                </div>
              )}
            </div>

            {/* Export Options */}
            <div className="mt-6 bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors text-center">
                  <SafeIcon icon={FiFileText} className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 mb-1">PDF Report</div>
                  <div className="text-sm text-gray-600">Professional formatted report</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors text-center">
                  <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 mb-1">Excel Data</div>
                  <div className="text-sm text-gray-600">Raw data for analysis</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors text-center">
                  <SafeIcon icon={FiShare} className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900 mb-1">Secure Link</div>
                  <div className="text-sm text-gray-600">Share with lenders</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;