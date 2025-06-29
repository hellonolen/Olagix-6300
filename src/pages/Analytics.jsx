import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiBarChart3, FiTrendingUp, FiTrendingDown, FiTarget, FiCalendar, FiDownload, FiRefreshCw} = FiIcons;

const Analytics = () => {
  const {personalCreditData, businessProfiles} = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const periods = [
    {value: '1month', label: '1 Month'},
    {value: '3months', label: '3 Months'},
    {value: '6months', label: '6 Months'},
    {value: '1year', label: '1 Year'}
  ];

  // Mock data for charts
  const creditScoreHistory = [
    {month: 'Jan', score: 650},
    {month: 'Feb', score: 665},
    {month: 'Mar', score: 680},
    {month: 'Apr', score: 695},
    {month: 'May', score: 710},
    {month: 'Jun', score: 720}
  ];

  const profileMetrics = [
    {
      title: 'Personal Profile Accuracy',
      value: 87,
      change: '+5%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Business Profiles Completeness',
      value: 92,
      change: '+12%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Dispute Success Rate',
      value: 94,
      change: '+2%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Funding Readiness Score',
      value: 78,
      change: '+8%',
      trend: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const insights = [
    {
      type: 'improvement',
      title: 'Credit Utilization Optimized',
      description: 'Your credit utilization dropped from 45% to 28% this month, boosting your score by 15 points.',
      impact: '+15 pts',
      date: '3 days ago'
    },
    {
      type: 'opportunity',
      title: 'Business Profile Enhancement',
      description: 'Adding employment verification to 2 business profiles could increase funding approval odds by 23%.',
      impact: '+23% approval',
      date: '1 week ago'
    },
    {
      type: 'alert',
      title: 'New Hard Inquiry Detected',
      description: 'A new hard inquiry from ABC Bank was added to your Experian report. Consider disputing if unauthorized.',
      impact: 'Monitor',
      date: '2 weeks ago'
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'improvement': return FiTrendingUp;
      case 'opportunity': return FiTarget;
      case 'alert': return FiTrendingDown;
      default: return FiBarChart3;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'improvement': return 'text-green-600 bg-green-100';
      case 'opportunity': return 'text-blue-600 bg-blue-100';
      case 'alert': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Analytics</h1>
              <p className="text-gray-600">
                Track your credit optimization progress and get AI-powered insights.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="input-field"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {profileMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 card-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={FiBarChart3} className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon 
                    icon={metric.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                    className={`w-4 h-4 ${metric.color}`} 
                  />
                  <span className={`text-sm font-medium ${metric.color}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}%</h3>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Credit Score Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Credit Score Trend</h3>
              <div className="flex items-center space-x-2 text-green-600">
                <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                <span className="text-sm font-medium">+70 pts in 6 months</span>
              </div>
            </div>
            
            {/* Simple Chart Representation */}
            <div className="space-y-4">
              {creditScoreHistory.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm text-gray-600">{data.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full"
                      style={{ width: `${(data.score / 850) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-900">{data.score}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">Excellent Progress!</h4>
              <p className="text-sm text-green-700">
                Your score has improved by 70 points in the last 6 months. Keep up the great work!
              </p>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="bg-white rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Completeness</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Personal Profile</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Business Profiles</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Documentation</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Verification</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full btn-primary text-sm">
                Improve Completeness
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-8 bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
            <span className="text-sm text-gray-600">Based on your profile data</span>
          </div>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getInsightColor(insight.type)}`}>
                  <SafeIcon icon={getInsightIcon(insight.type)} className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <span className="text-sm text-gray-500">{insight.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600">{insight.impact}</span>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      Take Action
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business Profile Analytics */}
        {businessProfiles.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Profile Performance</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{businessProfiles.length}</div>
                <div className="text-sm text-gray-600">Active Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(businessProfiles.length * 0.8)}
                </div>
                <div className="text-sm text-gray-600">Funding Ready</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
                <div className="text-sm text-gray-600">Avg Accuracy</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;