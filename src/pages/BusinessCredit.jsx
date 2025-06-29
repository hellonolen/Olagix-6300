import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import {useUser} from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiBriefcase, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiDollarSign, FiTrendingUp, FiCalendar, FiMapPin, FiPhone} = FiIcons;

const BusinessCredit = () => {
  const {businessProfiles, addBusinessProfile, updateBusinessProfile, deleteBusinessProfile} = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    ein: '',
    businessType: '',
    industry: '',
    yearEstablished: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    revenue: '',
    employees: ''
  });

  const businessTypes = [
    'LLC', 'Corporation', 'Partnership', 'Sole Proprietorship', 'S-Corp', 'C-Corp'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
    'Real Estate', 'Construction', 'Food & Beverage', 'Professional Services', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProfile) {
      updateBusinessProfile(editingProfile.id, formData);
      setEditingProfile(null);
    } else {
      addBusinessProfile(formData);
    }
    setFormData({
      businessName: '',
      ein: '',
      businessType: '',
      industry: '',
      yearEstablished: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      revenue: '',
      employees: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (profile) => {
    setFormData(profile);
    setEditingProfile(profile);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this business profile?')) {
      deleteBusinessProfile(id);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getCreditStatus = (profile) => {
    // Mock credit status based on profile completeness
    const completeness = Object.values(profile).filter(value => value && value.toString().trim()).length;
    if (completeness >= 10) return {status: 'excellent', score: 85, color: 'text-green-600'};
    if (completeness >= 7) return {status: 'good', score: 70, color: 'text-blue-600'};
    if (completeness >= 5) return {status: 'fair', score: 55, color: 'text-yellow-600'};
    return {status: 'poor', score: 35, color: 'text-red-600'};
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Credit</h1>
              <p className="text-gray-600">
                Build credit for up to 10 business profiles. Track progress and get funding-ready.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Profiles Used</div>
              <div className="text-2xl font-bold text-gray-900">
                {businessProfiles.length}/10
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl p-6 card-shadow mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {businessProfiles.length}
              </div>
              <div className="text-sm text-gray-600">Active Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {businessProfiles.filter(p => getCreditStatus(p).status === 'excellent').length}
              </div>
              <div className="text-sm text-gray-600">Excellent Credit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {businessProfiles.filter(p => getCreditStatus(p).status === 'good').length}
              </div>
              <div className="text-sm text-gray-600">Good Credit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {businessProfiles.filter(p => getCreditStatus(p).status === 'fair').length}
              </div>
              <div className="text-sm text-gray-600">Needs Work</div>
            </div>
          </div>
        </div>

        {/* Business Profiles */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Business Profiles</h2>
            {businessProfiles.length < 10 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Business</span>
              </button>
            )}
          </div>

          {businessProfiles.length === 0 ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiBriefcase} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Business Profiles Yet</h3>
              <p className="text-gray-600 mb-6">
                Start building credit for your businesses. You can create up to 10 profiles.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Create Your First Profile
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessProfiles.map((profile, index) => {
                const creditInfo = getCreditStatus(profile);
                return (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiBriefcase} className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(profile)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <SafeIcon icon={FiEdit} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(profile.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{profile.businessName}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {profile.businessType} • {profile.industry}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                        Established {profile.yearEstablished}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                        {profile.city}, {profile.state}
                      </div>
                      {profile.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                          {profile.phone}
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Credit Status</span>
                        <span className={`text-sm font-medium ${creditInfo.color}`}>
                          {creditInfo.status.charAt(0).toUpperCase() + creditInfo.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            creditInfo.status === 'excellent' ? 'bg-green-500' :
                            creditInfo.status === 'good' ? 'bg-blue-500' :
                            creditInfo.status === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${creditInfo.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProfile ? 'Edit Business Profile' : 'Add New Business'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProfile(null);
                    setFormData({
                      businessName: '',
                      ein: '',
                      businessType: '',
                      industry: '',
                      yearEstablished: '',
                      address: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      phone: '',
                      revenue: '',
                      employees: ''
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name *
                    </label>
                    <input
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      EIN (Tax ID)
                    </label>
                    <input
                      name="ein"
                      type="text"
                      value={formData.ein}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="XX-XXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year Established *
                    </label>
                    <input
                      name="yearEstablished"
                      type="number"
                      required
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.yearEstablished}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="ZIP"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Revenue
                    </label>
                    <select
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select range</option>
                      <option value="under-100k">Under $100K</option>
                      <option value="100k-500k">$100K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="over-5m">Over $5M</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Employees
                    </label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select range</option>
                      <option value="1">Just me</option>
                      <option value="2-5">2-5 employees</option>
                      <option value="6-10">6-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="over-50">Over 50 employees</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProfile(null);
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingProfile ? 'Update Profile' : 'Add Business'}
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

export default BusinessCredit;