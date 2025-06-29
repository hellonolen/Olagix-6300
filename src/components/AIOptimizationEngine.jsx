import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiTrendingUp, FiTarget, FiCheck, FiClock, FiBarChart3, FiAlertCircle } = FiIcons;

const AIOptimizationEngine = ({ userProfile }) => {
  const { isFeatureEnabled } = useAdmin();
  const [optimizationPlan, setOptimizationPlan] = useState([]);
  const [predictiveScore, setPredictiveScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFeatureEnabled('aiOptimizationEngine')) return;
    
    // Simulate AI analysis
    setTimeout(() => {
      const plan = generateOptimizationPlan(userProfile);
      const prediction = generateScorePrediction(userProfile);
      
      setOptimizationPlan(plan);
      setPredictiveScore(prediction);
      setLoading(false);
    }, 2000);
  }, [userProfile, isFeatureEnabled]);

  if (!isFeatureEnabled('aiOptimizationEngine')) {
    return null;
  }

  const generateOptimizationPlan = (profile) => {
    return [
      {
        id: 1,
        priority: 'high',
        action: 'Pay down credit card balances',
        impact: '+35 points',
        effort: 'Medium',
        timeframe: '30 days',
        description: 'Reduce utilization from 65% to 25% for maximum impact',
        category: 'utilization',
        roi: 8.5
      },
      {
        id: 2,
        priority: 'high', 
        action: 'Dispute inaccurate late payment',
        impact: '+20 points',
        effort: 'Low',
        timeframe: '45 days',
        description: 'Challenge late payment from 2023 that appears incorrect',
        category: 'accuracy',
        roi: 9.2
      },
      {
        id: 3,
        priority: 'medium',
        action: 'Add authorized user tradeline',
        impact: '+15 points', 
        effort: 'Low',
        timeframe: '14 days',
        description: 'Utilize our $50K tradeline service for instant boost',
        category: 'tradeline',
        roi: 7.8
      },
      {
        id: 4,
        priority: 'medium',
        action: 'Report rent payments',
        impact: '+12 points',
        effort: 'Low', 
        timeframe: '60 days',
        description: 'Add 24 months of rent history to credit reports',
        category: 'history',
        roi: 6.5
      }
    ];
  };

  const generateScorePrediction = (profile) => {
    return {
      current: 650,
      predictions: {
        30: 685,
        60: 715, 
        90: 745
      },
      confidence: 92,
      breakdown: {
        utilization: { current: 65, target: 25, impact: 35 },
        payment: { current: 85, target: 95, impact: 20 },
        history: { current: 70, target: 85, impact: 15 },
        mix: { current: 60, target: 75, impact: 8 }
      }
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiZap} className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Ologix AI Optimization Engine</h3>
        </div>
        <div className="text-center py-8">
          <div className="loading-spinner w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your profile and generating optimization plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Predictive Score Model */}
      {isFeatureEnabled('predictiveModeling') && predictiveScore && (
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Predictive Score Modeling</h3>
            <span className="text-sm text-gray-600">{predictiveScore.confidence}% confidence</span>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {predictiveScore.current}
              </div>
              <div className="text-sm text-gray-600">Current</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {predictiveScore.predictions[30]}
              </div>
              <div className="text-sm text-blue-700">30 Days</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {predictiveScore.predictions[60]}
              </div>
              <div className="text-sm text-green-700">60 Days</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {predictiveScore.predictions[90]}
              </div>
              <div className="text-sm text-purple-700">90 Days</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Impact Breakdown</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(predictiveScore.breakdown).map(([key, data]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 capitalize">{key}</span>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{data.current}% → {data.target}%</div>
                    <div className="text-sm font-medium text-green-600">+{data.impact} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Smart Action Prioritizer */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiTarget} className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Smart Action Prioritizer</h3>
          <span className="text-sm text-gray-600">Ranked by ROI</span>
        </div>

        <div className="space-y-4">
          {optimizationPlan.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{action.action}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                  {action.priority}
                </span>
              </div>

              <div className="grid md:grid-cols-5 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-green-600">{action.impact}</div>
                  <div className="text-gray-600">Impact</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">{action.effort}</div>
                  <div className="text-gray-600">Effort</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">{action.timeframe}</div>
                  <div className="text-gray-600">Timeline</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-orange-600">{action.roi}</div>
                  <div className="text-gray-600">ROI Score</div>
                </div>
                <div className="text-center">
                  <button className="btn-primary text-sm w-full">
                    Take Action
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Optimization Roadmap */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">90-Day Optimization Roadmap</h3>
        
        <div className="space-y-6">
          {[
            { period: 'Days 1-30', actions: ['Pay down balances', 'File disputes'], score: 685 },
            { period: 'Days 31-60', actions: ['Add tradeline', 'Monitor disputes'], score: 715 },
            { period: 'Days 61-90', actions: ['Report rent', 'Optimize mix'], score: 745 }
          ].map((phase, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{phase.period}</h4>
                <p className="text-sm text-gray-600">{phase.actions.join(', ')}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{phase.score}</div>
                <div className="text-sm text-gray-600">Target Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIOptimizationEngine;