import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiScale, FiMapPin, FiStar, FiPhone, FiMail, FiGlobe, FiAward, FiUsers, FiPlus, FiCheck, FiDollarSign } = FiIcons;

const LawFirmMarketplace = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    specialty: '',
    rating: '',
    experience: ''
  });

  const [lawFirms] = useState([
    {
      id: 1,
      name: 'Credit Defense Associates',
      location: 'Los Angeles, CA',
      rating: 4.9,
      reviewCount: 127,
      specialties: ['Credit Disputes', 'FCRA Violations', 'Identity Theft'],
      experience: '15+ years',
      description: 'Specialized in consumer credit law with over 500 successful FCRA violation cases.',
      phone: '(555) 123-4567',
      email: 'contact@creditdefense.com',
      website: 'www.creditdefense.com',
      successRate: 94,
      caseVolume: 500,
      averageResolution: '45 days',
      featured: true
    },
    {
      id: 2,
      name: 'Thompson & Associates',
      location: 'New York, NY',
      rating: 4.7,
      reviewCount: 89,
      specialties: ['FDCPA Violations', 'Debt Validation', 'Consumer Protection'],
      experience: '12+ years',
      description: 'Premier consumer protection firm with expertise in debt collection defense.',
      phone: '(555) 987-6543',
      email: 'info@thompsonlaw.com',
      website: 'www.thompsonlaw.com',
      successRate: 89,
      caseVolume: 350,
      averageResolution: '60 days',
      featured: false
    },
    {
      id: 3,
      name: 'Consumer Rights Law Group',
      location: 'Chicago, IL',
      rating: 4.8,
      reviewCount: 156,
      specialties: ['Credit Repair', 'TCPA Violations', 'Class Action'],
      experience: '20+ years',
      description: 'Leading consumer rights advocates with nationwide reach and proven results.',
      phone: '(555) 456-7890',
      email: 'hello@consumerrights.com',
      website: 'www.consumerrights.com',
      successRate: 92,
      caseVolume: 750,
      averageResolution: '38 days',
      featured: true
    }
  ]);

  const [signupForm, setSignupForm] = useState({
    firmName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    barNumber: '',
    experience: '',
    specialties: [],
    description: ''
  });

  const specialties = [
    'Credit Disputes', 'FCRA Violations', 'FDCPA Violations', 'TCPA Violations',
    'Identity Theft', 'Debt Validation', 'Consumer Protection', 'Class Action',
    'Banking Law', 'Mortgage Disputes', 'Auto Financing', 'Student Loans'
  ];

  const tabs = [
    { id: 'browse', name: 'Browse Attorneys', icon: FiScale },
    { id: 'signup', name: 'Join Marketplace', icon: FiPlus }
  ];

  const handleSpecialtyToggle = (specialty) => {
    setSignupForm(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted! We\'ll review your information and contact you within 24 hours.');
    setSignupForm({
      firmName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      location: '',
      barNumber: '',
      experience: '',
      specialties: [],
      description: ''
    });
  };

  const renderBrowse = () => (
    <div className="space-y-6">
      {/* Search Filters */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find the Right Attorney</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={searchFilters.location}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
              className="input-field"
              placeholder="City, State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select
              value={searchFilters.specialty}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, specialty: e.target.value }))}
              className="input-field"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <select
              value={searchFilters.rating}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, rating: e.target.value }))}
              className="input-field"
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <select
              value={searchFilters.experience}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, experience: e.target.value }))}
              className="input-field"
            >
              <option value="">Any Experience</option>
              <option value="20+">20+ Years</option>
              <option value="15+">15+ Years</option>
              <option value="10+">10+ Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Law Firms */}
      <div className="space-y-6">
        {lawFirms.map((firm, index) => (
          <motion.div
            key={firm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`bg-white rounded-xl p-6 card-shadow ${firm.featured ? 'ring-2 ring-orange-500' : ''}`}
          >
            {firm.featured && (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-4">
                Featured Partner
              </div>
            )}
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Firm Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{firm.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                        <span>{firm.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiAward} className="w-4 h-4" />
                        <span>{firm.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon 
                            key={i} 
                            icon={FiStar} 
                            className={`w-4 h-4 ${i < Math.floor(firm.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{firm.rating}</span>
                      <span className="text-sm text-gray-600">({firm.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{firm.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {firm.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Success Rate: </span>
                    <span className="font-medium text-green-600">{firm.successRate}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cases Handled: </span>
                    <span className="font-medium">{firm.caseVolume}+</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Resolution: </span>
                    <span className="font-medium">{firm.averageResolution}</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-600" />
                      <span>{firm.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-600" />
                      <span>{firm.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiGlobe} className="w-4 h-4 text-gray-600" />
                      <span>{firm.website}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full btn-primary">
                    Contact Attorney
                  </button>
                  <button className="w-full btn-secondary">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Are you an attorney specializing in consumer law?</h3>
        <p className="text-orange-100 mb-6">
          Join our marketplace and connect with clients who need expert legal assistance with credit disputes and consumer protection.
        </p>
        <button 
          onClick={() => setActiveTab('signup')}
          className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-orange-50 transition-colors"
        >
          Join for $49/month
        </button>
      </div>
    </div>
  );

  const renderSignup = () => (
    <div className="space-y-6">
      {/* Pricing Info */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Join Our Legal Marketplace</h2>
            <p className="text-orange-100 mb-4">
              Connect with clients seeking expert legal assistance for credit disputes and consumer protection matters.
            </p>
            <ul className="text-orange-100 text-sm space-y-1">
              <li>• Direct client referrals</li>
              <li>• Profile in our attorney directory</li>
              <li>• Case management tools</li>
              <li>• Marketing support</li>
              <li>• Cancel anytime</li>
            </ul>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">$49</div>
            <div className="text-orange-100">per month</div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketplace Benefits</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Client Referrals</h4>
            <p className="text-sm text-gray-600">Get matched with clients who need your expertise</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiScale} className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Showcase Expertise</h4>
            <p className="text-sm text-gray-600">Highlight your specialties and success rate</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Grow Practice</h4>
            <p className="text-sm text-gray-600">Expand your client base and increase revenue</p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Attorney Application</h3>
        <form onSubmit={handleSignupSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Law Firm Name *</label>
              <input
                type="text"
                required
                value={signupForm.firmName}
                onChange={(e) => setSignupForm(prev => ({ ...prev, firmName: e.target.value }))}
                className="input-field"
                placeholder="Enter firm name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input
                type="text"
                required
                value={signupForm.contactName}
                onChange={(e) => setSignupForm(prev => ({ ...prev, contactName: e.target.value }))}
                className="input-field"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={signupForm.email}
                onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
                placeholder="your@lawfirm.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={signupForm.phone}
                onChange={(e) => setSignupForm(prev => ({ ...prev, phone: e.target.value }))}
                className="input-field"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                value={signupForm.website}
                onChange={(e) => setSignupForm(prev => ({ ...prev, website: e.target.value }))}
                className="input-field"
                placeholder="www.yourfirm.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Location *</label>
              <input
                type="text"
                required
                value={signupForm.location}
                onChange={(e) => setSignupForm(prev => ({ ...prev, location: e.target.value }))}
                className="input-field"
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bar Number *</label>
              <input
                type="text"
                required
                value={signupForm.barNumber}
                onChange={(e) => setSignupForm(prev => ({ ...prev, barNumber: e.target.value }))}
                className="input-field"
                placeholder="Your bar license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
              <select
                required
                value={signupForm.experience}
                onChange={(e) => setSignupForm(prev => ({ ...prev, experience: e.target.value }))}
                className="input-field"
              >
                <option value="">Select experience</option>
                <option value="1-5">1-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="16-20">16-20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise *</label>
            <div className="grid md:grid-cols-3 gap-3">
              {specialties.map((specialty) => (
                <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signupForm.specialties.includes(specialty)}
                    onChange={() => handleSpecialtyToggle(specialty)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firm Description & Notable Achievements
            </label>
            <textarea
              rows={4}
              value={signupForm.description}
              onChange={(e) => setSignupForm(prev => ({ ...prev, description: e.target.value }))}
              className="input-field"
              placeholder="Describe your firm's expertise, notable cases, success rate, and what sets you apart..."
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">Application Review Process</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• We review all applications within 24 hours</li>
              <li>• Bar license verification required</li>
              <li>• Professional references may be requested</li>
              <li>• Upon approval, billing begins immediately</li>
              <li>• Profile goes live within 48 hours of approval</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn-primary">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Marketplace</h1>
          <p className="text-gray-600">
            Connect with experienced attorneys specializing in credit disputes and consumer protection law.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
            <div className="text-sm text-gray-600">Partner Attorneys</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
            <div className="text-sm text-gray-600">Cases Handled</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">91%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
            <div className="text-sm text-gray-600">Avg. Resolution Days</div>
          </div>
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
              {activeTab === 'browse' && renderBrowse()}
              {activeTab === 'signup' && renderSignup()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LawFirmMarketplace;