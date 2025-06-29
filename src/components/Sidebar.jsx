import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {useAuth} from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiHome, FiUser, FiBriefcase, FiDollarSign, FiShield, FiFileText, FiTrendingUp, FiCreditCard, FiLogOut, FiSettings, FiChevronLeft, FiChevronRight, FiMessageCircle, FiBell, FiSearch, FiBarChart3, FiTarget, FiUsers, FiHelpCircle} = FiIcons;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {user, logout} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    {name: 'Dashboard', href: '/dashboard', icon: FiHome},
    {name: 'Personal Profile', href: '/personal-profile', icon: FiUser},
    {name: 'Business Profiles', href: '/business-profiles', icon: FiBriefcase},
    {name: 'Funding Match', href: '/funding-match', icon: FiDollarSign},
    {name: 'Profile Analytics', href: '/analytics', icon: FiBarChart3},
    {name: 'Dispute Center', href: '/dispute-center', icon: FiShield},
    {name: 'Secondary Bureaus', href: '/secondary-bureaus', icon: FiFileText},
    {name: 'Rent Reporting', href: '/rent-reporting', icon: FiTrendingUp},
    {name: 'Reports & Export', href: '/reports', icon: FiTarget}
  ];

  const bottomNavigation = [
    {name: 'Settings', href: '/settings', icon: FiSettings},
    {name: 'Support', href: '/support', icon: FiHelpCircle},
    {name: 'Community', href: 'https://discord.gg/olagix', icon: FiMessageCircle, external: true}
  ];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 fixed left-0 top-0 z-40`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Olagix</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={collapsed ? FiChevronRight : FiChevronLeft} className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiUser} className="w-5 h-5 text-orange-600" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 flex-1"
              >
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize truncate">{user?.membershipLevel} Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'}
                text-sm font-medium rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-orange-100 text-orange-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              title={collapsed ? item.name : ''}
            >
              <SafeIcon 
                icon={item.icon} 
                className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} 
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomNavigation.map((item) => (
          item.external ? (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'}
                text-sm font-medium rounded-lg transition-all duration-200
                text-gray-600 hover:text-gray-900 hover:bg-gray-100
              `}
              title={collapsed ? item.name : ''}
            >
              <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0 text-gray-400" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'}
                text-sm font-medium rounded-lg transition-all duration-200
                text-gray-600 hover:text-gray-900 hover:bg-gray-100
              `}
              title={collapsed ? item.name : ''}
            >
              <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0 text-gray-400" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'}
            text-sm font-medium rounded-lg transition-all duration-200
            text-red-600 hover:text-red-700 hover:bg-red-50
          `}
          title={collapsed ? 'Logout' : ''}
        >
          <SafeIcon icon={FiLogOut} className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;