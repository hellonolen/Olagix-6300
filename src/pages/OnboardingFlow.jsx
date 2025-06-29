import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiBriefcase, FiTarget, FiCheck, FiArrowRight, FiArrowLeft } = FiIcons;

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: [],
    personalInfo: {},
    businessCount: 0,
    fundingGoals: []
  });
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Welcome to Ologix',
      subtitle: 'Let\'s build your funding profile',
      icon: FiTarget
    },
    {
      id: 2,
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
      icon: FiUser
    },
    {
      id: 3,
      title: 'Business Information',
      subtitle: 'Tell us about your businesses',
      icon: FiBriefcase
    },
    {
      id: 4,
      title: 'Funding Objectives',
      subtitle: 'What funding do you need?',
      icon: FiTarget
    }
  ];

  const goals = [
    'Improve personal funding profile',
    'Build business funding profiles',
    'Dispute inaccurate information',
    'Access funding opportunities',
    'Report rent payments',
    'Optimize profile accuracy'
  ];

  const fundingTypes = [
    'Personal loans',
    'Business loans',
    'Lines of credit',
    'Equipment financing',
    'Real estate financing',
    'Working capital'
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    updateUser({ 
      onboardingCompleted: true,
      goals: formData.goals,
      businessCount: formData.businessCount,
      fundingGoals: formData.fundingGoals
    });
    navigate('/dashboard');
  };

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const toggleFundingGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      fundingGoals: prev.fundingGoals.includes(goal) 
        ? prev.fundingGoals.filter(g => g !== goal)
        : [...prev.fundingGoals, goal]
    }));
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiTarget} className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Ologix
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We'll help you build accurate funding profiles for personal and business opportunities. 
              Let's get started with a quick setup.
            </p>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              What are your goals?
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Select all that apply to personalize your experience
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${formData.goals.includes(goal)
                      ? 'border-orange-500 bg-orange-50 text-orange-900'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal}</span>
                    {formData.goals.includes(goal) && (
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Business Information
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              How many businesses do you want to create profiles for?
            </p>
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Business Profiles
              </label>
              <select
                value={formData.businessCount}
                onChange={(e) => setFormData(prev => ({...prev, businessCount: parseInt(e.target.value)}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value={0}>Just personal profile</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} business{i + 1 > 1 ? 'es' : ''}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-2">
                You can create profiles for up to 10 businesses to maximize funding opportunities
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Funding Objectives
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              What types of funding are you interested in?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fundingTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFundingGoal(type)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${formData.fundingGoals.includes(type)
                      ? 'border-orange-500 bg-orange-50 text-orange-900'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{type}</span>
                    {formData.fundingGoals.includes(type) && (
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                ${currentStep >= step.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                <SafeIcon icon={step.icon} className="w-5 h-5" />
              </div>
              <span className={`text-xs text-center ${currentStep >= step.id ? 'text-orange-600' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all
              ${currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
            `}
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === 2 && formData.goals.length === 0}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{currentStep === steps.length ? 'Complete Setup' : 'Next'}</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;