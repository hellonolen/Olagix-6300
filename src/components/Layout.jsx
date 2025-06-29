import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiHome, FiUser, FiBriefcase, FiDollarSign, FiShield, FiFileText, FiTrendingUp, FiCreditCard, FiLogOut, FiMessageCircle, FiSettings, FiChevronDown, FiBell, FiSearch, FiInfo, FiHelpCircle, FiBarChart3 } = FiIcons;

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: FiHome },
    { name: 'Personal Credit', href: '/personal-credit', icon: FiUser },
    { name: 'Business Credit', href: '/business-credit', icon: FiBriefcase },
    { name: 'Funding Match', href: '/funding-match', icon: FiDollarSign },
    { name: 'Litigation Support', href: '/litigation-support', icon: FiShield },
    { name: 'Secondary Disputes', href: '/secondary-disputes', icon: FiFileText },
    { name: 'Rent Reporting', href: '/rent-reporting', icon: FiTrendingUp },
    { name: 'Tradeline Service', href: '/tradeline-service', icon: FiCreditCard },
  ];

  const moreNavigation = [
    { name: 'Analytics', href: '/analytics', icon: FiBarChart3 },
    { name: 'Admin Center', href: '/admin-center', icon: FiSettings },
    { name: 'About', href: '/about', icon: FiInfo },
    { name: 'FAQ', href: '/faq', icon: FiHelpCircle },
    { name: 'Pricing', href: '/pricing', icon: FiDollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Olagix</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.slice(0, 6).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-orange-100 text-orange-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <SafeIcon icon={item.icon} className={`w-4 h-4 mr-2 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}

              {/* More Menu */}
              <div className="relative">
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  More
                  <SafeIcon icon={FiChevronDown} className="w-4 h-4 ml-1" />
                </button>
                {moreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {navigation.slice(6).map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMoreMenuOpen(false)}
                      >
                        <SafeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 my-1"></div>
                    {moreNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMoreMenuOpen(false)}
                      >
                        <SafeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors relative">
                <SafeIcon icon={FiBell} className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.membershipLevel || 'Basic'} Member</p>
                  </div>
                  <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest User'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'guest@olagix.com'}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SafeIcon icon={FiUser} className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/membership"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SafeIcon icon={FiCreditCard} className="w-4 h-4 mr-3" />
                      Membership
                    </Link>
                    <Link
                      to="/admin-center"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-3" />
                      Admin Center
                    </Link>
                    <a
                      href="https://discord.gg/olagix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SafeIcon icon={FiMessageCircle} className="w-4 h-4 mr-3" />
                      Discord Community
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="space-y-1">
                {[...navigation, ...moreNavigation].map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <SafeIcon icon={item.icon} className={`w-5 h-5 mr-3 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Click outside to close dropdowns */}
      {(userMenuOpen || mobileMenuOpen || moreMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setUserMenuOpen(false);
            setMobileMenuOpen(false);
            setMoreMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Layout;