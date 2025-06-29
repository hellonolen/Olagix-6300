import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiAlertTriangle, FiCheck, FiClock, FiBell, FiTrendingDown, FiTrendingUp, FiEye } = FiIcons;

const RealTimeMonitoring = () => {
  const { isFeatureEnabled } = useAdmin();
  const [alerts, setAlerts] = useState([]);
  const [monitoringStatus, setMonitoringStatus] = useState('active');
  const [recentChanges, setRecentChanges] = useState([]);

  useEffect(() => {
    if (!isFeatureEnabled('realTimeMonitoring')) return;

    // Simulate real-time monitoring
    const interval = setInterval(() => {
      // Simulate random alerts
      if (Math.random() > 0.7) {
        addNewAlert();
      }
    }, 10000);

    // Initial data
    setAlerts([
      {
        id: 1,
        type: 'score_change',
        severity: 'medium',
        title: 'Credit Score Increased',
        message: 'Your Experian score increased by 12 points to 735',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        read: false,
        actionable: true
      },
      {
        id: 2,
        type: 'new_inquiry',
        severity: 'high',
        title: 'New Hard Inquiry Detected',
        message: 'Hard inquiry from ABC Bank detected on TransUnion',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        actionable: true
      },
      {
        id: 3,
        type: 'fraud_alert',
        severity: 'critical',
        title: 'Suspicious Activity',
        message: 'New account opened that you may not have authorized',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        read: true,
        actionable: true
      }
    ]);

    setRecentChanges([
      {
        id: 1,
        type: 'account_update',
        description: 'Payment reported on Chase Credit Card',
        impact: 'positive',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        id: 2,
        type: 'balance_update',
        description: 'Balance decreased on Capital One card',
        impact: 'positive',
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
      }
    ]);

    return () => clearInterval(interval);
  }, [isFeatureEnabled]);

  const addNewAlert = () => {
    const alertTypes = [
      {
        type: 'score_change',
        severity: 'medium',
        title: 'Score Update Available',
        message: 'New score calculated based on recent changes'
      },
      {
        type: 'account_change',
        severity: 'low',
        title: 'Account Status Updated',
        message: 'Account status changed on existing tradeline'
      }
    ];

    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const newAlert = {
      ...randomAlert,
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      actionable: true
    };

    setAlerts(prev => [newAlert, ...prev].slice(0, 10));
  };

  const markAsRead = (alertId) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return FiAlertTriangle;
      case 'high': return FiTrendingDown;
      case 'medium': return FiBell;
      case 'low': return FiTrendingUp;
      default: return FiEye;
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  if (!isFeatureEnabled('realTimeMonitoring')) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Monitoring Status */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Real-Time Monitoring</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
            <div className="text-sm text-green-700">Monitoring</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{alerts.filter(a => !a.read).length}</div>
            <div className="text-sm text-blue-700">New Alerts</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">{recentChanges.length}</div>
            <div className="text-sm text-purple-700">Recent Changes</div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            Mark All Read
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {alerts.slice(0, 5).map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  alert.read ? 'opacity-60' : ''
                } ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <SafeIcon 
                    icon={getSeverityIcon(alert.severity)} 
                    className={`w-5 h-5 mt-0.5 ${alert.severity === 'critical' ? 'text-red-600' : 
                      alert.severity === 'high' ? 'text-orange-600' : 
                      alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} 
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <span className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                    {alert.actionable && !alert.read && (
                      <div className="flex items-center space-x-2 mt-2">
                        <button 
                          onClick={() => markAsRead(alert.id)}
                          className="btn-secondary text-xs"
                        >
                          Take Action
                        </button>
                        <button 
                          onClick={() => markAsRead(alert.id)}
                          className="text-gray-500 hover:text-gray-700 text-xs"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h4>
            <p className="text-gray-600">No active alerts. Your credit is being monitored 24/7.</p>
          </div>
        )}
      </div>

      {/* Recent Changes */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Changes</h3>
        
        <div className="space-y-3">
          {recentChanges.map((change) => (
            <div key={change.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <SafeIcon 
                icon={change.impact === 'positive' ? FiTrendingUp : FiTrendingDown} 
                className={`w-4 h-4 ${change.impact === 'positive' ? 'text-green-500' : 'text-red-500'}`} 
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{change.description}</p>
                <p className="text-xs text-gray-500">{formatTimestamp(change.timestamp)}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                change.impact === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {change.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fraud Detection */}
      {isFeatureEnabled('fraudDetection') && (
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Fraud Detection</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Protection Status</h4>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiShield} className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Active monitoring for suspicious activity</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">AI Analysis</h4>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiEye} className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">Machine learning pattern detection</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeMonitoring;