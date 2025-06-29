import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useAuth} from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiUser, FiShield, FiBell, FiCreditCard, FiKey, FiMail, FiPhone, FiLock, FiCheck, FiX} = FiIcons;

const Settings = () => {
  const {user, updateUser} = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || ''
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    scoreUpdates: true,
    disputeUpdates: true,
    fundingMatches: true,
    weeklyReports: false,
    monthlyReports: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    dataEncryption: true
  });

  const tabs = [
    {id: 'profile', name: 'Profile', icon: FiUser},
    {id: 'notifications', name: 'Notifications', icon: FiBell},
    {id: 'security', name: 'Security', icon: FiShield},
    {id: 'billing', name: 'Billing', icon: FiCreditCard}
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser({
      name: `${profileForm.firstName} ${profileForm.lastName}`,
      email: profileForm.email,
      phone: profileForm.phone,
      address: profileForm.address,
      city: profileForm.city,
      state: profileForm.state,
      zipCode: profileForm.zipCode
    });
    alert('Profile updated successfully!');
  };

  const handleNotificationUpdate = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSecurityUpdate = (key, value) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
        
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                className="input-field"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                className="input-field"
                placeholder="Last name"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                className="input-field"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                className="input-field"
                placeholder="Phone number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={profileForm.address}
              onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
              className="input-field"
              placeholder="Street address"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                className="input-field"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={profileForm.state}
                onChange={(e) => setProfileForm({...profileForm, state: e.target.value})}
                className="input-field"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                value={profileForm.zipCode}
                onChange={(e) => setProfileForm({...profileForm, zipCode: e.target.value})}
                className="input-field"
                placeholder="ZIP"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Actions</h3>
        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordForm(true)}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
            <SafeIcon icon={FiKey} className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Export Data</h4>
                <p className="text-sm text-gray-600">Download your account data</p>
              </div>
            </div>
            <SafeIcon icon={FiKey} className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Communication Methods</h4>
          <div className="space-y-4">
            {Object.entries({
              emailAlerts: 'Email Notifications',
              smsAlerts: 'SMS Text Messages'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">{label}</h5>
                  <p className="text-sm text-gray-600">
                    Receive updates via {key === 'emailAlerts' ? 'email' : 'text message'}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationUpdate(key, !notifications[key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[key] ? 'bg-orange-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Alert Types</h4>
          <div className="space-y-4">
            {Object.entries({
              scoreUpdates: 'Credit Score Updates',
              disputeUpdates: 'Dispute Status Changes',
              fundingMatches: 'New Funding Opportunities',
              weeklyReports: 'Weekly Progress Reports',
              monthlyReports: 'Monthly Summary Reports'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">{label}</h5>
                </div>
                <button
                  onClick={() => handleNotificationUpdate(key, !notifications[key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[key] ? 'bg-orange-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          {Object.entries({
            twoFactorAuth: {
              title: 'Two-Factor Authentication',
              description: 'Add an extra layer of security to your account'
            },
            loginAlerts: {
              title: 'Login Alerts',
              description: 'Get notified when someone logs into your account'
            },
            dataEncryption: {
              title: 'Data Encryption',
              description: 'Encrypt sensitive data stored in your account'
            }
          }).map(([key, {title, description}]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <button
                onClick={() => handleSecurityUpdate(key, !security[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  security[key] ? 'bg-orange-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    security[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
          
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
              </div>
              <select
                value={security.sessionTimeout}
                onChange={(e) => handleSecurityUpdate('sessionTimeout', e.target.value)}
                className="input-field max-w-32"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Plan</h3>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 capitalize">
                {user?.membershipLevel || 'Basic'} Plan
              </h4>
              <p className="text-gray-600">Active subscription</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$79/mo</div>
              <div className="text-sm text-gray-600">Billed monthly</div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn-primary">Upgrade Plan</button>
            <button className="btn-secondary">Change Billing</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiCreditCard} className="w-8 h-8 text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">•••• •••• •••• 4242</h4>
              <p className="text-sm text-gray-600">Expires 12/25</p>
            </div>
          </div>
        </div>
        <button className="mt-4 btn-secondary">Update Payment Method</button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and security settings.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl card-shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'notifications' && renderNotifications()}
              {activeTab === 'security' && renderSecurity()}
              {activeTab === 'billing' && renderBilling()}
            </motion.div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input type="password" className="input-field" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input type="password" className="input-field" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input type="password" className="input-field" placeholder="Confirm new password" />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;