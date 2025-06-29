import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [personalCreditData, setPersonalCreditData] = useState({
    score: null,
    reports: [],
    disputes: [],
    recommendations: []
  });

  const [businessProfiles, setBusinessProfiles] = useState([]);
  const [fundingMatches, setFundingMatches] = useState([]);
  const [litigationCases, setLitigationCases] = useState([]);
  const [secondaryDisputes, setSecondaryDisputes] = useState([]);
  const [rentReporting, setRentReporting] = useState({
    active: false,
    history: []
  });

  // Business Credit Functions
  const addBusinessProfile = (profile) => {
    if (businessProfiles.length < 10) {
      setBusinessProfiles(prev => [...prev, { ...profile, id: Date.now() }]);
      return true;
    }
    return false;
  };

  const updateBusinessProfile = (id, updates) => {
    setBusinessProfiles(prev => 
      prev.map(profile => 
        profile.id === id ? { ...profile, ...updates } : profile
      )
    );
  };

  const deleteBusinessProfile = (id) => {
    setBusinessProfiles(prev => prev.filter(profile => profile.id !== id));
  };

  // Funding Functions
  const addFundingMatch = (match) => {
    setFundingMatches(prev => [...prev, { ...match, id: Date.now() }]);
  };

  // Personal Credit Functions
  const updatePersonalCredit = (updates) => {
    setPersonalCreditData(prev => ({ ...prev, ...updates }));
  };

  const addDispute = (dispute) => {
    setPersonalCreditData(prev => ({
      ...prev,
      disputes: [...prev.disputes, { ...dispute, id: Date.now(), status: 'pending' }]
    }));
  };

  // Litigation Functions
  const addLitigationCase = (litigationCase) => {
    setLitigationCases(prev => [...prev, { ...litigationCase, id: Date.now() }]);
  };

  // Secondary Disputes Functions
  const addSecondaryDispute = (dispute) => {
    setSecondaryDisputes(prev => [...prev, { ...dispute, id: Date.now() }]);
  };

  const value = {
    personalCreditData,
    businessProfiles,
    fundingMatches,
    litigationCases,
    secondaryDisputes,
    rentReporting,
    addBusinessProfile,
    updateBusinessProfile,
    deleteBusinessProfile,
    addFundingMatch,
    updatePersonalCredit,
    addDispute,
    addLitigationCase,
    addSecondaryDispute,
    setRentReporting
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};