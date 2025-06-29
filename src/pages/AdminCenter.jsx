import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useAdmin } from '../contexts/AdminContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiToggleLeft, FiToggleRight, FiUsers, FiBarChart3, FiShield, FiZap, FiBrain, FiGlobe } = FiIcons;

const AdminCenter = () => {
  const { featureFlags, adminSettings, toggleFeature, updateAdminSetting, isFeatureEnabled } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('core');

  const featureCategories = {
    core: {
      name: 'Core Features',
      icon: FiSettings,
      features: [
        { key: 'creditSimulator', name: 'Credit Score Simulator', description: 'Interactive credit score simulation tool' },
        { key: 'businessProfiles', name: 'Business Profiles', description: 'Multi-business credit profile management' },
        { key: 'fundingMatch', name: 'Funding Match', description: 'Lender matching and funding opportunities' },
        { key: 'disputeCenter', name: 'Dispute Center', description: 'Credit dispute management system' },
        { key: 'rentReporting', name: 'Rent Reporting', description: 'Rent payment reporting to credit bureaus' },
        { key: 'tradelineService', name: 'Tradeline Service', description: 'Premium tradeline access' }
      ]
    },
    ai: {
      name: 'AI Features',
      icon: FiBrain,
      features: [
        { key: 'aiOptimizationEngine', name: 'AI Optimization Engine', description: 'Smart credit optimization recommendations' },
        { key: 'predictiveModeling', name: 'Predictive Modeling', description: 'Future credit score predictions' },
        { key: 'smartRecommendations', name: 'Smart Recommendations', description: 'Personalized action recommendations' },
        { key: 'fraudDetection', name: 'Fraud Detection', description: 'AI-powered fraud monitoring' },
        { key: 'aiFundingMatcher', name: 'AI Funding Matcher', description: 'Machine learning funding matches' },
        { key: 'approvalOddsCalculator', name: 'Approval Odds Calculator', description: 'Real-time approval probability' }
      ]
    },
    advanced: {
      name: 'Advanced Features',
      icon: FiZap,
      features: [
        { key: 'realTimeMonitoring', name: 'Real-Time Monitoring', description: '24/7 credit monitoring and alerts' },
        { key: 'corporateCreditStacking', name: 'Corporate Credit Stacking', description: 'Strategic business credit building' },
        { key: 'businessCreditSimulator', name: 'Business Credit Simulator', description: 'Business credit score simulation' },
        { key: 'applicationAutoFill', name: 'Application Auto-Fill', description: 'Automatic form population' },
        { key: 'vendorCreditNetworks', name: 'Vendor Credit Networks', description: 'Vendor credit reporting connections' }
      ]
    },
    legal: {
      name: 'Legal & Protection',
      icon: FiShield,
      features: [
        { key: 'legalProtectionSuite', name: 'Legal Protection Suite', description: 'Comprehensive legal tools' },
        { key: 'ceaseDesistGenerator', name: 'Cease & Desist Generator', description: 'Legal letter generation' },
        { key: 'fcraViolationScanner', name: 'FCRA Violation Scanner', description: 'Automatic violation detection' },
        { key: 'classActionAlerts', name: 'Class Action Alerts', description: 'Relevant lawsuit notifications' },
        { key: 'advancedDisputeTech', name: 'Advanced Dispute Tech', description: 'Enhanced dispute capabilities' },
        { key: 'automatedFollowups', name: 'Automated Follow-ups', description: 'Smart dispute follow-up system' }
      ]
    },
    premium: {
      name: 'Premium Services',
      icon: FiUsers,
      features: [
        { key: 'premiumServicesMarketplace', name: 'Premium Services Marketplace', description: 'Third-party service marketplace' },
        { key: 'certifiedPartners', name: 'Certified Partners', description: 'Vetted professional network' },
        { key: 'taxLienRemoval', name: 'Tax Lien Removal', description: 'Specialized removal services' },
        { key: 'identityTheftRecovery', name: 'Identity Theft Recovery', description: 'Complete recovery services' },
        { key: 'consultationBooking', name: 'Expert Consultations', description: 'Professional consultation booking' }
      ]
    },
    education: {
      name: 'Education & Content',
      icon: FiGlobe,
      features: [
        { key: 'educationContentEmpire', name: 'Education Content Empire', description: 'Comprehensive learning platform' },
        { key: 'creditUniversity', name: 'Credit University', description: 'Structured credit education courses' },
        { key: 'webinarSeries', name: 'Webinar Series', description: 'Live educational sessions' },
        { key: 'podcastNetwork', name: 'Podcast Network', description: 'Audio content library' }
      ]
    },
    social: {
      name: 'Social & Community',
      icon: FiUsers,
      features: [
        { key: 'socialProofSystem', name: 'Social Proof System', description: 'User success stories and testimonials' },
        { key: 'successStoriesFeed', name: 'Success Stories Feed', description: 'Real user transformation stories' },
        { key: 'communityChalllenges', name: 'Community Challenges', description: 'Gamified credit improvement' },
        { key: 'peerSupportGroups', name: 'Peer Support Groups', description: 'User community connections' },
        { key: 'referralProgram', name: 'Referral Program', description: 'User referral and rewards system' }
      ]
    },
    intelligence: {
      name: 'Business Intelligence',
      icon: FiBarChart3,
      features: [
        { key: 'businessIntelligence', name: 'Business Intelligence', description: 'Advanced analytics and insights' },
        { key: 'marketTrendAnalysis', name: 'Market Trend Analysis', description: 'Credit market trend tracking' },
        { key: 'lenderBehaviorInsights', name: 'Lender Behavior Insights', description: 'Lender approval pattern analysis' },
        { key: 'economicImpactAlerts', name: 'Economic Impact Alerts', description: 'Market change notifications' }
      ]
    },
    integrations: {
      name: 'Integrations & APIs',
      icon: FiGlobe,
      features: [
        { key: 'integrationEcosystem', name: 'Integration Ecosystem', description: 'Third-party service connections' },
        { key: 'bankingConnections', name: 'Banking Connections', description: 'Bank account linking' },
        { key: 'calendarIntegration', name: 'Calendar Integration', description: 'Task and appointment scheduling' },
        { key: 'crmForProfessionals', name: 'CRM for Professionals', description: 'Professional client management tools' }
      ]
    },
    security: {
      name: 'Security & Trust',
      icon: FiShield,
      features: [
        { key: 'transparencyDashboard', name: 'Transparency Dashboard', description: 'Algorithm and process transparency' },
        { key: 'algorithmExplainer', name: 'Algorithm Explainer', description: 'AI decision explanation system' },
        { key: 'dataUsageTracker', name: 'Data Usage Tracker', description: 'Complete data usage visibility' },
        { key: 'securityScore', name: 'Security Score', description: 'Overall security assessment' }
      ]
    }
  };

  const systemSettings = [
    { key: 'maintenanceMode', name: 'Maintenance Mode', description: 'Put system in maintenance mode', type: 'boolean' },
    { key: 'newUserRegistration', name: 'New User Registration', description: 'Allow new user signups', type: 'boolean' },
    { key: 'emailNotifications', name: 'Email Notifications', description: 'Send system email notifications', type: 'boolean' },
    { key: 'systemAlerts', name: 'System Alerts', description: 'Display system-wide alerts', type: 'boolean' },
    { key: 'debugMode', name: 'Debug Mode', description: 'Enable debug logging', type: 'boolean' },
    { key: 'analyticsTracking', name: 'Analytics Tracking', description: 'Track user analytics', type: 'boolean' },
    { key: 'thirdPartyIntegrations', name: 'Third-Party Integrations', description: 'Enable external integrations', type: 'boolean' },
    { key: 'apiAccess', name: 'API Access', description: 'Allow API access', type: 'boolean' }
  ];

  const categories = Object.keys(featureCategories);

  const renderFeatureToggle = (feature) => (
    <div key={feature.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{feature.name}</h4>
        <p className="text-sm text-gray-600">{feature.description}</p>
      </div>
      <button
        onClick={() => toggleFeature(feature.key)}
        className={`p-1 rounded-full transition-colors ${
          isFeatureEnabled(feature.key) 
            ? 'bg-green-100 text-green-600' 
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        <SafeIcon 
          icon={isFeatureEnabled(feature.key) ? FiToggleRight : FiToggleLeft} 
          className="w-6 h-6" 
        />
      </button>
    </div>
  );

  const getEnabledCount = (categoryFeatures) => {
    return categoryFeatures.filter(f => isFeatureEnabled(f.key)).length;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Center</h1>
          <p className="text-gray-600">
            Control all platform features and system settings. Toggle features on/off to customize the user experience.
          </p>
        </div>

        {/* Admin Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Object.values(featureFlags).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-600">Features Enabled</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Object.keys(featureFlags).length}
            </div>
            <div className="text-sm text-gray-600">Total Features</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {Object.values(adminSettings).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-600">System Settings</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round((Object.values(featureFlags).filter(Boolean).length / Object.keys(featureFlags).length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Platform Active</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Categories</h3>
              <div className="space-y-2">
                {categories.map((categoryKey) => {
                  const category = featureCategories[categoryKey];
                  const enabledCount = getEnabledCount(category.features);
                  const totalCount = category.features.length;
                  
                  return (
                    <button
                      key={categoryKey}
                      onClick={() => setActiveCategory(categoryKey)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeCategory === categoryKey
                          ? 'bg-orange-100 text-orange-700 border-orange-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={category.icon} className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-gray-500">
                            {enabledCount}/{totalCount} enabled
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white rounded-xl p-6 card-shadow mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
              <div className="space-y-3">
                {systemSettings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{setting.name}</div>
                      <div className="text-xs text-gray-600">{setting.description}</div>
                    </div>
                    <button
                      onClick={() => updateAdminSetting(setting.key, !adminSettings[setting.key])}
                      className={`p-1 rounded-full transition-colors ${
                        adminSettings[setting.key] 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <SafeIcon 
                        icon={adminSettings[setting.key] ? FiToggleRight : FiToggleLeft} 
                        className="w-5 h-5" 
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Controls */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={featureCategories[activeCategory].icon} className="w-6 h-6 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {featureCategories[activeCategory].name}
                  </h2>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {getEnabledCount(featureCategories[activeCategory].features)} of {featureCategories[activeCategory].features.length} enabled
                  </span>
                  <button
                    onClick={() => {
                      const allEnabled = featureCategories[activeCategory].features.every(f => isFeatureEnabled(f.key));
                      featureCategories[activeCategory].features.forEach(f => {
                        if (allEnabled && isFeatureEnabled(f.key)) {
                          toggleFeature(f.key);
                        } else if (!allEnabled && !isFeatureEnabled(f.key)) {
                          toggleFeature(f.key);
                        }
                      });
                    }}
                    className="btn-secondary text-sm"
                  >
                    {featureCategories[activeCategory].features.every(f => isFeatureEnabled(f.key)) ? 'Disable All' : 'Enable All'}
                  </button>
                </div>
              </div>

              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {featureCategories[activeCategory].features.map(renderFeatureToggle)}
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 card-shadow mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    Object.keys(featureFlags).forEach(key => {
                      if (!isFeatureEnabled(key)) toggleFeature(key);
                    });
                  }}
                  className="p-4 border border-green-200 rounded-lg text-left hover:bg-green-50 transition-colors"
                >
                  <SafeIcon icon={FiZap} className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-green-900">Enable All Features</h4>
                  <p className="text-sm text-green-700">Turn on all platform features</p>
                </button>

                <button
                  onClick={() => {
                    Object.keys(featureFlags).forEach(key => {
                      if (isFeatureEnabled(key) && !['creditSimulator', 'businessProfiles', 'fundingMatch', 'disputeCenter'].includes(key)) {
                        toggleFeature(key);
                      }
                    });
                  }}
                  className="p-4 border border-orange-200 rounded-lg text-left hover:bg-orange-50 transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="w-6 h-6 text-orange-600 mb-2" />
                  <h4 className="font-medium text-orange-900">Core Features Only</h4>
                  <p className="text-sm text-orange-700">Keep only essential features</p>
                </button>

                <button
                  onClick={() => {
                    // Reset to default state
                    const coreFeatures = ['creditSimulator', 'businessProfiles', 'fundingMatch', 'disputeCenter', 'aiOptimizationEngine', 'realTimeMonitoring'];
                    Object.keys(featureFlags).forEach(key => {
                      const shouldBeEnabled = coreFeatures.includes(key);
                      if (isFeatureEnabled(key) !== shouldBeEnabled) {
                        toggleFeature(key);
                      }
                    });
                  }}
                  className="p-4 border border-blue-200 rounded-lg text-left hover:bg-blue-50 transition-colors"
                >
                  <SafeIcon icon={FiShield} className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-900">Reset to Default</h4>
                  <p className="text-sm text-blue-700">Restore recommended settings</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminCenter;