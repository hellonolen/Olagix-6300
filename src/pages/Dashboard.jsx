import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useAdmin } from '../contexts/AdminContext';
import AIOptimizationEngine from '../components/AIOptimizationEngine';
import RealTimeMonitoring from '../components/RealTimeMonitoring';
import CreditUniversity from '../components/CreditUniversity';
import SocialProofSystem from '../components/SocialProofSystem';
import CreditScoreSimulator from '../components/CreditScoreSimulator';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiBriefcase, FiDollarSign, FiShield, FiTrendingUp, FiTarget, FiBarChart3, FiCheck, FiAlertCircle, FiClock, FiFileText, FiArrowRight, FiPlus, FiZap, FiBrain } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { personalCreditData, businessProfiles, fundingMatches } = useUser();
  const { isFeatureEnabled } = useAdmin();

  const profileScore = calculateProfileScore();
  const quickActions = getQuickActions();
  const recentActivity = getRecentActivity();

  function calculateProfileScore() {
    let score = 0;
    let maxScore = 100;

    // Personal profile completeness (40 points)
    if (personalCreditData.score) score += 20;
    if (personalCreditData.reports?.length > 0) score += 10;
    if (personalCreditData.disputes?.length > 0) score += 10;

    // Business profiles (30 points)
    if (businessProfiles.length > 0) score += 15;
    if (businessProfiles.length >= 3) score += 10;
    if (businessProfiles.length >= 5) score += 5;

    // Activity (30 points)
    if (fundingMatches.length > 0) score += 15;
    if (personalCreditData.recommendations?.length > 0) score += 15;

    return Math.round((score / maxScore) * 100);
  }

  function getQuickActions() {
    const actions = [];

    if (businessProfiles.length === 0) {
      actions.push({
        title: 'Create First Business Profile',
        description: 'Start building business funding opportunities',
        href: '/business-profiles',
        icon: FiBriefcase,
        priority: 'high'
      });
    }

    if (!personalCreditData.score) {
      actions.push({
        title: 'Complete Personal Profile',
        description: 'Build your personal funding profile',
        href: '/personal-profile',
        icon: FiUser,
        priority: 'high'
      });
    }

    if (personalCreditData.disputes?.length === 0) {
      actions.push({
        title: 'Check for Disputes',
        description: 'Ensure profile accuracy',
        href: '/dispute-center',
        icon: FiShield,
        priority: 'medium'
      });
    }

    return actions.slice(0, 3);
  }

  function getRecentActivity() {
    return [
      {
        type: 'profile_update',
        title: 'Personal Profile Updated',
        description: 'Funding score improved',
        time: '2 hours ago',
        icon: FiUser
      },
      {
        type: 'dispute_filed',
        title: 'Dispute Filed',
        description: 'Secondary bureau dispute initiated',
        time: '1 day ago',
        icon: FiShield
      },
      {
        type: 'funding_match',
        title: 'New Funding Match',
        description: '3 new opportunities available',
        time: '2 days ago',
        icon: FiDollarSign
      }
    ];
  }

  const stats = [
    {
      title: 'Profile Accuracy',
      value: `${profileScore}%`,
      change: '+5% this month',
      changeType: 'positive',
      icon: FiTarget,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Business Profiles',
      value: `${businessProfiles.length}/10`,
      change: 'Active profiles',
      icon: FiBriefcase,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Funding Opportunities',
      value: fundingMatches.length + 12,
      change: 'Available now',
      icon: FiDollarSign,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Active Disputes',
      value: 2,
      change: 'In progress',
      icon: FiShield,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600">
              Your complete funding profile optimization platform. Track progress and improve accuracy.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                  {stat.changeType && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      +5%
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Features Section */}
        {isFeatureEnabled('aiOptimizationEngine') && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBrain} className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">AI-Powered Insights</h2>
            </div>
            <AIOptimizationEngine userProfile={user} />
          </div>
        )}

        {/* Credit Score Simulator */}
        {isFeatureEnabled('creditSimulator') && (
          <div className="mb-8">
            <CreditScoreSimulator currentScore={personalCreditData.score || 650} />
          </div>
        )}

        {/* Real-Time Monitoring */}
        {isFeatureEnabled('realTimeMonitoring') && (
          <div className="mb-8">
            <RealTimeMonitoring />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <span className="text-sm text-gray-500">Recommended for you</span>
              </div>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={action.href}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'}`}>
                          <SafeIcon icon={action.icon} className={`w-5 h-5 ${action.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <SafeIcon icon={FiArrowRight} className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Profile Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Personal Profile</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Funding Score</span>
                      <span className="font-medium">{personalCreditData.score || 'Not Set'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Disputes</span>
                      <span className="font-medium">{personalCreditData.disputes?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Accuracy Score</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Business Profiles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Profiles</span>
                      <span className="font-medium">{businessProfiles.length}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Funding Ready</span>
                      <span className="font-medium">{Math.floor(businessProfiles.length * 0.7)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg. Accuracy</span>
                      <span className="font-medium text-green-600">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={activity.icon} className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Access</h2>
              <div className="space-y-3">
                <Link to="/funding-match" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Find Funding</span>
                </Link>
                <Link to="/dispute-center" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiShield} className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">File Dispute</span>
                </Link>
                <Link to="/reports" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiFileText} className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">View Reports</span>
                </Link>
                <Link to="/analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Profile Analytics</span>
                </Link>
                {isFeatureEnabled('educationContentEmpire') && (
                  <Link to="/credit-university" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiZap} className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">Credit University</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Education Content Empire */}
        {isFeatureEnabled('educationContentEmpire') && isFeatureEnabled('creditUniversity') && (
          <div className="mt-8">
            <CreditUniversity />
          </div>
        )}

        {/* Social Proof System */}
        {isFeatureEnabled('socialProofSystem') && (
          <div className="mt-8">
            <SocialProofSystem />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;