import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCreditCard, FiCalculator, FiTarget } = FiIcons;

const CreditScoreSimulator = ({ currentScore = 650 }) => {
  const [scenarios, setScenarios] = useState([
    { id: 1, type: 'paydown', description: 'Pay down credit card balance', amount: 1000, impact: 0 },
    { id: 2, type: 'newcard', description: 'Open new credit card', amount: 5000, impact: 0 },
    { id: 3, type: 'tradeline', description: 'Add $50K tradeline', amount: 50000, impact: 0 },
    { id: 4, type: 'dispute', description: 'Remove negative item', amount: 0, impact: 0 }
  ]);

  const [simulatedScore, setSimulatedScore] = useState(currentScore);

  const calculateImpact = (scenario) => {
    let impact = 0;
    switch (scenario.type) {
      case 'paydown':
        impact = Math.min(scenario.amount / 100, 40); // Up to 40 points for paydown
        break;
      case 'newcard':
        impact = Math.min(scenario.amount / 1000, 25); // Up to 25 points for new credit
        break;
      case 'tradeline':
        impact = 75; // Fixed 75 points for tradeline
        break;
      case 'dispute':
        impact = 35; // Fixed 35 points for removing negative item
        break;
      default:
        impact = 0;
    }
    return Math.round(impact);
  };

  useEffect(() => {
    const totalImpact = scenarios.reduce((sum, scenario) => {
      const impact = calculateImpact(scenario);
      setScenarios(prev => prev.map(s => 
        s.id === scenario.id ? { ...s, impact } : s
      ));
      return sum + impact;
    }, 0);
    
    setSimulatedScore(Math.min(currentScore + totalImpact, 850));
  }, [scenarios, currentScore]);

  const updateScenario = (id, field, value) => {
    setScenarios(prev => prev.map(scenario =>
      scenario.id === id ? { ...scenario, [field]: value } : scenario
    ));
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <SafeIcon icon={FiCalculator} className="w-5 h-5 text-orange-600" />
          <span>Ologix Credit Score Simulator</span>
        </h3>
        <span className="text-sm text-gray-600">Powered by Ologix AI</span>
      </div>

      {/* Score Display */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Current Score</h4>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(currentScore)}`}>
            {currentScore}
          </div>
          <div className="text-sm text-gray-600">{getScoreGrade(currentScore)}</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg">
          <h4 className="text-sm font-medium text-orange-100 mb-2">Projected Score</h4>
          <div className="text-4xl font-bold mb-2">
            {simulatedScore}
          </div>
          <div className="text-sm text-orange-100">{getScoreGrade(simulatedScore)}</div>
          <div className="flex items-center justify-center mt-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">+{simulatedScore - currentScore} points</span>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">What-If Scenarios</h4>
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="grid md:grid-cols-4 gap-4 items-center">
              <div>
                <h5 className="font-medium text-gray-900">{scenario.description}</h5>
                <span className="text-sm text-gray-600 capitalize">{scenario.type}</span>
              </div>
              {scenario.type !== 'dispute' && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={scenario.amount}
                      onChange={(e) => updateScenario(scenario.id, 'amount', parseInt(e.target.value) || 0)}
                      className="input-field pl-8"
                      min="0"
                    />
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Impact</div>
                <div className={`text-lg font-bold ${scenario.impact > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  {scenario.impact > 0 ? '+' : ''}{scenario.impact} pts
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => updateScenario(scenario.id, 'amount', 0)}
                  className="btn-secondary text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">Ologix AI Recommendations</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Pay down high-utilization cards first for maximum impact</li>
          <li>• Consider our $50K tradeline service for a 75-point boost</li>
          <li>• Dispute inaccurate items to remove negative impact</li>
          <li>• Keep new accounts to a minimum while building</li>
        </ul>
      </div>
    </div>
  );
};

export default CreditScoreSimulator;