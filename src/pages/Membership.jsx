import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiCreditCard, FiCheck, FiStar, FiZap, FiCrown, 
  FiArrowLeft, FiDollarSign, FiShield, FiTrendingUp 
} = FiIcons;

const Membership = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      icon: FiCreditCard,
      description: 'Essential credit monitoring and basic recommendations',
      monthlyPrice: 29,
      yearlyPrice: 290,
      yearlyDiscount: '17% off',
      features: [
        'Personal credit monitoring',
        'Basic AI recommendations', 
        '1 business profile',
        'Email support',
        'Monthly credit score updates'
      ],
      limitations: [
        'Limited dispute letters (3/month)',
        'Basic funding matches',
        'Standard processing time'
      ],
      color: 'border-gray-200',
      buttonClass: 'btn-secondary',
      popular: false
    },
    {
      name: 'Professional',
      icon: FiStar,
      description: 'Advanced credit optimization and business funding',
      monthlyPrice: 79,
      yearlyPrice: 790,
      yearlyDiscount: '17% off',
      features: [
        'Everything in Basic',
        'Advanced AI credit analysis',
        'Up to 5 business profiles',
        'Priority funding matches',
        'Unlimited dispute letters',
        'Consumer law litigation support',
        'Secondary credit bureau disputes',
        'Priority support',
        'Weekly credit monitoring'
      ],
      limitations: [
        'Rent reporting (additional $19/month)',
        'Premium tradeline service (additional fee)'
      ],
      color: 'border-orange-200 ring-2 ring-orange-500',
      buttonClass: 'btn-primary',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: FiCrown,
      description: 'Complete credit and funding solution with premium services',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      yearlyDiscount: '17% off',
      features: [
        'Everything in Professional',
        'Up to 10 business profiles',
        'Premium funding network access',
        'Dedicated account manager',
        'Custom AI letter generation',
        'Advanced litigation support',
        'Rent reporting included',
        'Premium tradeline service ($50K)',
        'White-label Discord access',
        'Daily credit monitoring',
        'Priority processing (24-48 hours)'
      ],
      limitations: [],
      color: 'border-purple-200',
      buttonClass: 'bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200',
      popular: false
    }
  ];

  const getPrice = (plan) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const period = billingCycle === 'monthly' ? '/month' : '/year';
    return { price, period };
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // Here you would integrate with payment processor
    // For now, redirect to register with plan info
    navigate('/register', { state: { selectedPlan: plan, billingCycle } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-gray-900">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Olagix</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-gradient">Success Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unlock the power of AI-driven credit optimization and funding solutions. Every plan includes our core features with increasing levels of support and capabilities.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${billingCycle === 'yearly' ? 'bg-orange-600' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const { price, period } = getPrice(plan);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`
                  relative bg-white rounded-2xl p-8 card-shadow-lg border-2 ${plan.color}
                  ${plan.popular ? 'transform scale-105' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={plan.icon} className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600 ml-1">{period}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium">{plan.yearlyDiscount}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Included Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mt-6">Additional Services:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start space-x-3">
                            <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full text-center block ${plan.buttonClass}`}
                >
                  Choose {plan.name}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Credit?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of entrepreneurs who have improved their credit and secured funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="btn-primary text-lg px-8 py-3"
            >
              Start Now
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;