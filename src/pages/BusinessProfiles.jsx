import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBriefcase, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, 
  FiDollarSign, FiTrendingUp, FiCalendar, FiMapPin, 
  FiPhone, FiTarget, FiBarChart3
} = FiIcons;

const BusinessProfiles = () => {
  const { businessProfiles, addBusinessProfile, updateBusinessProfile, deleteBusinessProfile } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [activeView, setActiveView] = useState('grid');
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
    employees: '',
    description: '',
    website: ''
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
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      businessName: '', ein: '', businessType: '', industry: '', yearEstablished: '',
      address: '', city: '', state: '', zipCode: '', phone: '', revenue: '', 
      employees: '', description: '', website: ''
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getFundingReadiness = (profile) => {
    const completeness = Object.values(profile).filter(value => 
      value && value.toString().trim()
    ).length;
    
    if (completeness >= 12) return { status: 'excellent', score: 95, color: 'text-green-600' };
    if (completeness >= 9) return { status: 'good', score: 80, color: 'text-blue-600' };
    if (completeness >= 6) return { status: 'fair', score: 65, color: 'text-yellow-600' };
    return { status: 'needs work', score: 40, color: 'text-red-600' };
  };

  const getProfileStats = () => {
    const excellent = businessProfiles.filter(p => getFundingReadiness(p).status === 'excellent').length;
    const good = businessProfiles.filter(p => getFundingReadiness(p).status === 'good').length;
    const avgReadiness = businessProfiles.length > 0 
      ? Math.round(businessProfiles.reduce((acc, p) => acc + getFundingReadiness(p).score, 0) / businessProfiles.length)
      : 0;
    
    return { excellent, good, avgReadiness };
  };

  const stats = getProfileStats();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profiles</h1>
              <p className="text-gray-600">
                Build funding profiles for up to 10 businesses. Track readiness and optimize for funding opportunities.
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

        {/* Stats Overview */}
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
                {stats.excellent}
              </div>
              <div className="text-sm text-gray-600">Funding Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.good}
              </div>
              <div className="text-sm text-gray-600">Near Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.avgReadiness}%
              </div>
              <div className="text-sm text-gray-600">Avg Readiness</div>
            </div>
          </div>
        </div>

        {/* Business Profiles */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Business Profiles</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`p-2 rounded-lg ${activeView === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <SafeIcon icon={FiTarget} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`p-2 rounded-lg ${activeView === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <SafeIcon icon={FiBarChart3} className="w-4 h-4" />
                </button>
              </div>
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
          </div>

          {businessProfiles.length === 0 ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiBriefcase} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Business Profiles Yet</h3>
              <p className="text-gray-600 mb-6">
                Start building funding opportunities for your businesses. You can create up to 10 profiles.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Create Your First Profile
              </button>
            </div>
          ) : activeView === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessProfiles.map((profile, index) => {
                const readiness = getFundingReadiness(profile);
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
                      {profile.city && profile.state && (
                        <div className="flex items-center text-sm text-gray-600">
                          <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                          {profile.city}, {profile.state}
                        </div>
                      )}
                      {profile.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                          {profile.phone}
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Funding Readiness</span>
                        <span className={`text-sm font-medium ${readiness.color}`}>
                          {readiness.status.charAt(0).toUpperCase() + readiness.status.slice(1)}
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            readiness.status === 'excellent' ? 'bg-green-500' :
                            readiness.status === 'good' ? 'bg-blue-500' :
                            readiness.status === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${readiness.score}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{readiness.score}% Complete</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {businessProfiles.map((profile, index) => {
                const readiness = getFundingReadiness(profile);
                return (
                  <div key={profile.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={FiBriefcase} className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{profile.businessName}</h3>
                          <p className="text-sm text-gray-600">{profile.businessType} • {profile.industry}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${readiness.color}`}>
                            {readiness.score}% Ready
                          </div>
                          <div className="text-xs text-gray-500">{readiness.status}</div>
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProfile ? 'Edit Business Profile' : 'Add New Business'}
                </h3>
                <button
                  onClick={() => {
                    resetForm();
                    setEditingProfile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Brief description of your business..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setEditingProfile(null);
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
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

export default BusinessProfiles;