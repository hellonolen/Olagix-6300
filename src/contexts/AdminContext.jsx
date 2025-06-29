import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState({
    // Core Features
    creditSimulator: true,
    businessProfiles: true,
    fundingMatch: true,
    disputeCenter: true,
    rentReporting: true,
    tradelineService: true,

    // AI Features
    aiOptimizationEngine: true,
    predictiveModeling: true,
    smartRecommendations: true,
    fraudDetection: true,

    // Advanced Features
    realTimeMonitoring: true,
    corporateCreditStacking: true,
    vendorCreditNetworks: false,
    businessCreditSimulator: true,

    // Funding Features
    aiFundingMatcher: true,
    applicationAutoFill: true,
    approvalOddsCalculator: true,
    fundingMarketplace: true,

    // Legal Features
    legalProtectionSuite: true,
    ceaseDesistGenerator: true,
    fcraViolationScanner: true,
    classActionAlerts: false,

    // Premium Services
    premiumServicesMarketplace: false,
    certifiedPartners: false,
    taxLienRemoval: false,
    identityTheftRecovery: true,

    // White Label
    whiteLabelSolutions: false,
    creditUnionPartnerships: false,
    mortgageBrokerTools: false,

    // Education
    educationContentEmpire: true,
    creditUniversity: true,
    webinarSeries: false, // Per user request
    podcastNetwork: false,

    // Social Features
    socialProofSystem: true,
    successStoriesFeed: true,
    communityChalllenges: false,
    peerSupportGroups: true,

    // Advanced Dispute
    advancedDisputeTech: true,
    ocrDocumentScanner: true,
    disputeOutcomePredictor: true,
    automatedFollowups: true,

    // Business Intelligence
    businessIntelligence: true,
    marketTrendAnalysis: true,
    lenderBehaviorInsights: true,
    economicImpactAlerts: false,

    // UX Enhancements
    mobileFirst: true,
    progressiveWebApp: true,
    pushNotifications: true,
    voiceCommands: false,

    // Personalization
    personalizationEngine: true,
    smartDashboard: true,
    goalBasedViews: true,
    progressCelebrations: true,

    // Integrations
    integrationEcosystem: true,
    bankingConnections: false,
    calendarIntegration: true,
    crmForProfessionals: false,

    // Security & Trust
    transparencyDashboard: true,
    algorithmExplainer: true,
    dataUsageTracker: true,
    securityScore: true,

    // Secondary Features
    secondaryBureaus: true,
    litigationSupport: true,
    lawFirmMarketplace: false,
    referralProgram: true,
    sponsorCenter: false,
    consultationBooking: true
  });

  const [adminSettings, setAdminSettings] = useState({
    maintenanceMode: false,
    newUserRegistration: true,
    emailNotifications: true,
    systemAlerts: true,
    debugMode: false,
    analyticsTracking: true,
    thirdPartyIntegrations: true,
    apiAccess: true
  });

  const toggleFeature = (featureName) => {
    setFeatureFlags(prev => ({
      ...prev,
      [featureName]: !prev[featureName]
    }));
  };

  const updateAdminSetting = (settingName, value) => {
    setAdminSettings(prev => ({
      ...prev,
      [settingName]: value
    }));
  };

  const isFeatureEnabled = (featureName) => {
    return featureFlags[featureName] ?? false;
  };

  const value = {
    featureFlags,
    adminSettings,
    toggleFeature,
    updateAdminSetting,
    isFeatureEnabled
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};