import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiTrendingUp, FiHome, FiCalendar, FiDollarSign, FiPlus, FiCheck, FiX, FiUpload, FiInfo} = FiIcons;

const RentReporting = () => {
  const {rentReporting, setRentReporting} = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);

  const tabs = [
    {id: 'overview', name: 'Overview', icon: FiHome},
    {id: 'history', name: 'Rent History', icon: FiCalendar},
    {id: 'setup', name: 'Setup Service', icon: FiTrendingUp}
  ];

  const [rentForm, setRentForm] = useState({
    landlordName: '',
    landlordEmail: '',
    landlordPhone: '',
    propertyAddress: '',
    monthlyRent: '',
    leaseStart: '',
    leaseEnd: '',
    paymentMethod: '',
    yearsToReport: '2'
  });

  const mockRentHistory = [
    {month: '2024-01', amount: 1500, status: 'paid', date: '2024-01-01'},
    {month: '2023-12', amount: 1500, status: 'paid', date: '2023-12-01'},
    {month: '2023-11', amount: 1500, status: 'paid', date: '2023-11-01'},
    {month: '2023-10', amount: 1500, status: 'paid', date: '2023-10-01'},
    {month: '2023-09', amount: 1500, status: 'paid', date: '2023-09-01'}
  ];

  const benefits = [
    {
      title: 'Boost Credit Score',
      description: 'Add positive payment history to your credit report',
      impact: '+20-40 points',
      icon: FiTrendingUp
    },
    {
      title: 'Build Credit History',
      description: 'Establish credit history with consistent rent payments',
      impact: 'Length of history',
      icon: FiCalendar
    },
    {
      title: 'Mortgage Qualification',
      description: 'Improve chances of qualifying for a mortgage',
      impact: 'Better rates',
      icon: FiHome
    },
    {
      title: 'Retroactive Reporting',
      description: 'Report up to 5 years of past rent payments',
      impact: 'Immediate boost',
      icon: FiCheck
    }
  ];

  const handleSetupService = (e) => {
    e.preventDefault();
    setRentReporting({
      active: true,
      landlordInfo: {
        name: rentForm.landlordName,
        email: rentForm.landlordEmail,
        phone: rentForm.landlordPhone
      },
      propertyInfo: {
        address: rentForm.propertyAddress,
        monthlyRent: rentForm.monthlyRent,
        leaseStart: rentForm.leaseStart,
        leaseEnd: rentForm.leaseEnd
      },
      settings: {
        paymentMethod: rentForm.paymentMethod,
        yearsToReport: parseInt(rentForm.yearsToReport)
      },
      history: mockRentHistory,
      setupDate: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
    setActiveTab('overview');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Service Status */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Rent Reporting Status</h3>
          {!rentReporting.active && (
            <button
              onClick={() => setActiveTab('setup')}
              className="btn-primary"
            >
              Setup Service
            </button>
          )}
        </div>

        {rentReporting.active ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Service Active</h4>
                <p className="text-sm text-green-700">
                  Your rent payments are being reported to credit bureaus
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Property Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Address:</strong> {rentReporting.propertyInfo?.address}</div>
                  <div><strong>Monthly Rent:</strong> ${rentReporting.propertyInfo?.monthlyRent}</div>
                  <div><strong>Lease Period:</strong> {rentReporting.propertyInfo?.leaseStart} to {rentReporting.propertyInfo?.leaseEnd}</div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Landlord Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Name:</strong> {rentReporting.landlordInfo?.name}</div>
                  <div><strong>Email:</strong> {rentReporting.landlordInfo?.email}</div>
                  <div><strong>Phone:</strong> {rentReporting.landlordInfo?.phone}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiHome} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Rent Reporting Not Setup</h4>
            <p className="text-gray-600 mb-4">
              Start reporting your rent payments to build credit history
            </p>
            <button
              onClick={() => setActiveTab('setup')}
              className="btn-primary"
            >
              Setup Service
            </button>
          </div>
        )}
      </div>

      {/* Benefits Overview */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Benefits of Rent Reporting</h3>
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

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
          <div className="text-sm text-gray-600">Average Score Increase</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">5</div>
          <div className="text-sm text-gray-600">Years Retroactive</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">30</div>
          <div className="text-sm text-gray-600">Days to Report</div>
        </div>
        <div className="bg-white rounded-xl p-6 card-shadow text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
          <div className="text-sm text-gray-600">Credit Bureaus</div>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Rent Payment History</h3>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <SafeIcon icon={FiUpload} className="w-4 h-4" />
            <span>Upload Records</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Payment</span>
          </button>
        </div>
      </div>

      {!rentReporting.active ? (
        <div className="text-center py-8">
          <SafeIcon icon={FiCalendar} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Setup Required</h4>
          <p className="text-gray-600 mb-4">Setup rent reporting service to view payment history</p>
          <button
            onClick={() => setActiveTab('setup')}
            className="btn-primary"
          >
            Setup Service
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {mockRentHistory.filter(h => h.status === 'paid').length}
              </div>
              <div className="text-sm text-green-700">On-Time Payments</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                ${mockRentHistory.reduce((sum, h) => sum + h.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Total Paid</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {mockRentHistory.length}
              </div>
              <div className="text-sm text-purple-700">Months Reported</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">100%</div>
              <div className="text-sm text-yellow-700">Payment Rate</div>
            </div>
          </div>

          <div className="space-y-3">
            {mockRentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <SafeIcon 
                    icon={payment.status === 'paid' ? FiCheck : FiX} 
                    className={`w-5 h-5 ${payment.status === 'paid' ? 'text-green-500' : 'text-red-500'}`} 
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {new Date(payment.month + '-01').toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h4>
                    <p className="text-sm text-gray-600">Paid on {payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${payment.amount}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSetup = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Setup Rent Reporting Service</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">How It Works</h4>
              <p className="text-sm text-blue-800">
                We'll verify your rent payments with your landlord and report them to all three credit bureaus. You can report up to 5 years of past payments for an immediate credit boost.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSetupService} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Landlord Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landlord/Property Manager Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rentForm.landlordName}
                    onChange={(e) => setRentForm({...rentForm, landlordName: e.target.value})}
                    className="input-field"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landlord Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={rentForm.landlordEmail}
                    onChange={(e) => setRentForm({...rentForm, landlordEmail: e.target.value})}
                    className="input-field"
                    placeholder="landlord@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landlord Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={rentForm.landlordPhone}
                    onChange={(e) => setRentForm({...rentForm, landlordPhone: e.target.value})}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Property Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={rentForm.propertyAddress}
                    onChange={(e) => setRentForm({...rentForm, propertyAddress: e.target.value})}
                    className="input-field"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Rent Amount *
                  </label>
                  <input
                    type="number"
                    required
                    value={rentForm.monthlyRent}
                    onChange={(e) => setRentForm({...rentForm, monthlyRent: e.target.value})}
                    className="input-field"
                    placeholder="1500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lease Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={rentForm.leaseStart}
                      onChange={(e) => setRentForm({...rentForm, leaseStart: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lease End Date
                    </label>
                    <input
                      type="date"
                      value={rentForm.leaseEnd}
                      onChange={(e) => setRentForm({...rentForm, leaseEnd: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Reporting Options</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={rentForm.paymentMethod}
                  onChange={(e) => setRentForm({...rentForm, paymentMethod: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select method</option>
                  <option value="check">Check</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="money-order">Money Order</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years to Report Back *
                </label>
                <select
                  required
                  value={rentForm.yearsToReport}
                  onChange={(e) => setRentForm({...rentForm, yearsToReport: e.target.value})}
                  className="input-field"
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years (Maximum)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 mb-1">Important Note</h4>
                <p className="text-sm text-yellow-800">
                  We'll need to verify your rent payments with your landlord before reporting to credit bureaus. This process typically takes 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              Setup Rent Reporting
            </button>
          </div>
        </form>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Rent Reporting Service</h4>
              <p className="text-gray-600">Report to all 3 credit bureaus + retroactive reporting</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">$19</div>
              <div className="text-sm text-gray-600">/month</div>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
              <span>Report to Experian, Equifax, TransUnion</span>
            </li>
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
              <span>Up to 5 years retroactive reporting</span>
            </li>
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
              <span>Landlord verification included</span>
            </li>
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
              <span>Monthly progress tracking</span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            * Included free with Enterprise membership
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rent Reporting</h1>
          <p className="text-gray-600">
            Build credit history by reporting your rent payments. Add up to 5 years of payment history.
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
              {activeTab === 'history' && renderHistory()}
              {activeTab === 'setup' && renderSetup()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RentReporting;