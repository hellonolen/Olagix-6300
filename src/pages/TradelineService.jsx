import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiCreditCard, FiTrendingUp, FiShield, FiCheck, FiX, FiInfo, FiDollarSign, FiCalendar, FiStar} = FiIcons;

const TradelineService = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const tabs = [
    {id: 'overview', name: 'Overview', icon: FiCreditCard},
    {id: 'application', name: 'Application', icon: FiTrendingUp},
    {id: 'partnership', name: 'Olagix Partnership', icon: FiShield}
  ];

  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    ssn: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    currentCreditScore: '',
    annualIncome: '',
    purpose: ''
  });

  const benefits = [
    {
      title: 'Instant Credit Boost',
      description: 'Add a $50,000 tradeline to your credit report',
      impact: '+50-100 pts',
      icon: FiTrendingUp
    },
    {
      title: 'Aged Account History',
      description: 'Benefit from years of perfect payment history',
      impact: 'Length boost',
      icon: FiCalendar
    },
    {
      title: 'Low Utilization',
      description: 'Dramatically improve your credit utilization ratio',
      impact: 'Utilization fix',
      icon: FiDollarSign
    },
    {
      title: 'Premium Partnership',
      description: 'Exclusive access through Olagix partnership',
      impact: 'Guaranteed',
      icon: FiStar
    }
  ];

  const tradelineFeatures = [
    'Credit limit: $50,000',
    'Perfect payment history',
    'Low utilization (under 10%)',
    'Reports to all 3 bureaus',
    'Aged account (5+ years)',
    'Remains for 60+ days',
    'No personal liability',
    'Authorized user status'
  ];

  const handleApplication = (e) => {
    e.preventDefault();
    alert('Application submitted! We\'ll review and contact you within 24 hours.');
    setShowApplicationForm(false);
  };

  const handleChange = (e) => {
    setApplicationForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">$50,000 Premium Tradeline</h2>
            <p className="text-orange-100 mb-4">
              Exclusive Olagix partnership for maximum credit impact
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                <span>All 3 Credit Bureaus</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                <span>60+ Day Reporting</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                <span>Perfect Payment History</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">$299</div>
            <div className="text-orange-100">One-time fee</div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Benefits</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={benefit.icon} className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{benefit.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                <span className="text-xs font-medium text-orange-600">{benefit.impact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Apply</h4>
            <p className="text-sm text-gray-600">Submit your application with basic information</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Review</h4>
            <p className="text-sm text-gray-600">We review and approve qualified applicants</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Add</h4>
            <p className="text-sm text-gray-600">You're added as authorized user to premium tradeline</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-600 font-bold">4</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Report</h4>
            <p className="text-sm text-gray-600">Tradeline appears on your credit reports</p>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tradeline Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {tradelineFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl p-6 card-shadow text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Boost Your Credit?</h3>
        <p className="text-gray-600 mb-6">
          Join thousands who have improved their credit scores with our premium tradeline service
        </p>
        <button
          onClick={() => setActiveTab('application')}
          className="btn-primary text-lg px-8 py-3"
        >
          Apply Now
        </button>
      </div>
    </div>
  );

  const renderApplication = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tradeline Application</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Application Requirements</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Minimum credit score of 500</li>
                <li>• Valid social security number</li>
                <li>• No active bankruptcies</li>
                <li>• One-time $299 fee</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleApplication} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                name="fullName"
                type="text"
                required
                value={applicationForm.fullName}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Social Security Number *
              </label>
              <input
                name="ssn"
                type="text"
                required
                value={applicationForm.ssn}
                onChange={handleChange}
                className="input-field"
                placeholder="XXX-XX-XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                name="dateOfBirth"
                type="date"
                required
                value={applicationForm.dateOfBirth}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={applicationForm.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                required
                value={applicationForm.email}
                onChange={handleChange}
                className="input-field"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Credit Score *
              </label>
              <select
                name="currentCreditScore"
                required
                value={applicationForm.currentCreditScore}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select range</option>
                <option value="500-549">500-549</option>
                <option value="550-599">550-599</option>
                <option value="600-649">600-649</option>
                <option value="650-699">650-699</option>
                <option value="700-749">700-749</option>
                <option value="750+">750+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              name="address"
              type="text"
              required
              value={applicationForm.address}
              onChange={handleChange}
              className="input-field"
              placeholder="Street address"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                name="city"
                type="text"
                required
                value={applicationForm.city}
                onChange={handleChange}
                className="input-field"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                name="state"
                type="text"
                required
                value={applicationForm.state}
                onChange={handleChange}
                className="input-field"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                name="zipCode"
                type="text"
                required
                value={applicationForm.zipCode}
                onChange={handleChange}
                className="input-field"
                placeholder="ZIP"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income *
              </label>
              <select
                name="annualIncome"
                required
                value={applicationForm.annualIncome}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select range</option>
                <option value="under-25k">Under $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-75k">$50,000 - $75,000</option>
                <option value="75k-100k">$75,000 - $100,000</option>
                <option value="over-100k">Over $100,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose *
              </label>
              <select
                name="purpose"
                required
                value={applicationForm.purpose}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select purpose</option>
                <option value="mortgage">Home Purchase/Refinance</option>
                <option value="auto">Auto Loan</option>
                <option value="business">Business Funding</option>
                <option value="credit-cards">Credit Card Approval</option>
                <option value="general">General Credit Improvement</option>
              </select>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 mb-1">Important Notice</h4>
                <p className="text-sm text-yellow-800">
                  By submitting this application, you authorize us to add you as an authorized user to a premium tradeline account. The $299 fee is non-refundable once processing begins.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              Submit Application ($299)
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderPartnership = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Olagix Partnership</h3>
        
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiShield} className="w-12 h-12 text-orange-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Powered by Olagix</h4>
            <p className="text-gray-600">Premium tradeline network partner</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Why Olagix?</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Industry leader with 15+ years experience</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Exclusive access to premium tradelines</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Guaranteed reporting to all 3 bureaus</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Perfect payment history accounts only</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Compliance with all credit laws</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Partnership Benefits</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Exclusive $50K credit limit access</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Priority processing for our members</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Extended reporting periods (60+ days)</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Dedicated support team</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Transparent reporting timeline</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
          <div className="text-sm text-gray-600">Years Experience</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
          <div className="text-sm text-gray-600">Clients Served</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">$50K</div>
          <div className="text-sm text-gray-600">Max Credit Limit</div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl p-6 card-shadow text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Questions About Our Partnership?</h4>
        <p className="text-gray-600 mb-4">
          Our team is here to explain how the Olagix partnership benefits you
        </p>
        <button className="btn-primary">
          Contact Support
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tradeline Service</h1>
          <p className="text-gray-600">
            Boost your credit score instantly with our exclusive $50K tradeline through Olagix partnership.
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
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'application' && renderApplication()}
              {activeTab === 'partnership' && renderPartnership()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradelineService;