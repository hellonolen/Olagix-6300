import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiCreditCard, FiTrendingUp, FiShield, FiDollarSign, FiCheckCircle, 
  FiArrowRight, FiStar, FiUsers, FiAward, FiTarget, FiBriefcase, 
  FiFileText, FiMenu, FiX, FiZap, FiBarChart3, FiGlobe 
} = FiIcons;

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: FiCreditCard,
      title: 'Personal Funding Profile',
      description: 'Olagix-powered analysis and recommendations to improve your personal funding profile with proven strategies.'
    },
    {
      icon: FiBriefcase,
      title: 'Business Profile Building',
      description: 'Build funding profiles for up to 10 business profiles with expert guidance and comprehensive tracking.'
    },
    {
      icon: FiDollarSign,
      title: 'Smart Funding Matching',
      description: 'Get matched with the right lenders based on your profile - PG, no PG, full doc, or no doc options.'
    },
    {
      icon: FiShield,
      title: 'Dispute Support',
      description: 'Olagix-generated letters and professional dispute support based on consumer protection laws.'
    },
    {
      icon: FiTrendingUp,
      title: 'Rent Reporting Service',
      description: 'Report up to 5 years of rent history to boost your funding profile by 20-40 points instantly.'
    },
    {
      icon: FiStar,
      title: 'Premium Tradelines',
      description: 'Exclusive $50K tradeline access through our Olagix partnership for maximum funding impact.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Profiles Improved', subtext: 'Average increase of 75+ points' },
    { number: '$2.1B+', label: 'Funding Secured', subtext: 'For our entrepreneur clients' },
    { number: '95%', label: 'Success Rate', subtext: 'In profile optimization' },
    { number: '24/7', label: 'Olagix Support', subtext: 'Continuous monitoring' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Tech Entrepreneur',
      company: 'TechFlow Inc.',
      content: 'Olagix helped me improve my funding profile by 120 points and secure $500K in funding for my startup. The Olagix recommendations were spot-on.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Real Estate Investor',
      company: 'Rodriguez Properties',
      content: 'The business profile building feature allowed me to establish funding profiles for 8 different LLCs. Game-changing for real estate investing.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Jennifer Walsh',
      role: 'Restaurant Owner',
      company: 'Walsh Hospitality Group',
      content: 'From 580 to 750 funding score in 4 months. The dispute support helped remove incorrect items that were holding me back.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Olagix</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Dashboard</Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">About</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Pricing</Link>
              <Link to="/faq" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">FAQ</Link>
              <Link to="/login" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Sign In</Link>
              <Link to="/membership" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white border-t border-gray-200/50 py-4 space-y-4"
            >
              <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:text-orange-600 font-medium">Dashboard</Link>
              <Link to="/about" className="block px-4 py-2 text-gray-700 hover:text-orange-600 font-medium">About</Link>
              <Link to="/pricing" className="block px-4 py-2 text-gray-700 hover:text-orange-600 font-medium">Pricing</Link>
              <Link to="/faq" className="block px-4 py-2 text-gray-700 hover:text-orange-600 font-medium">FAQ</Link>
              <Link to="/login" className="block px-4 py-2 text-gray-700 hover:text-orange-600 font-medium">Sign In</Link>
              <Link to="/membership" className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center block">
                Get Started
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <SafeIcon icon={FiZap} className="w-4 h-4" />
                <span>Personal & Business Profile Optimization</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your
                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Funding Profile
                </span>
                Journey
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Craft and Optimize Your Personal & Business Funding Profiles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/membership"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                Start Free Trial
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-orange-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 lg:p-12 shadow-2xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">750+</div>
                    <div className="text-sm text-gray-600">Funding Score</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <SafeIcon icon={FiBriefcase} className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">10</div>
                    <div className="text-sm text-gray-600">Business Profiles</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">$2M+</div>
                    <div className="text-sm text-gray-600 text-center">
                      Funding<br />Access
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <SafeIcon icon={FiShield} className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Olagix Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 50,000+ Entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful business owners who have transformed their funding profiles and secured funding.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.subtext}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Succeed Financially
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge Olagix technology with proven profile optimization strategies to help entrepreneurs build strong financial foundations.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Real Entrepreneurs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Olagix has helped business owners transform their funding profiles and secure the funding they need to grow.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-orange-600">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex text-orange-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Financial Future?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join over 50,000 entrepreneurs who trust Olagix to optimize their funding profiles, build business profiles, and secure funding. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                Start Free Trial
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 inline-flex items-center justify-center"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Olagix</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering entrepreneurs with comprehensive funding profile optimization and funding solutions. Transform your financial future with Olagix-powered insights and proven strategies.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://discord.gg/olagix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <SafeIcon icon={FiUsers} className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/personal-profile" className="hover:text-orange-400 transition-colors">Personal Profile</Link></li>
                <li><Link to="/business-profiles" className="hover:text-orange-400 transition-colors">Business Profiles</Link></li>
                <li><Link to="/funding-match" className="hover:text-orange-400 transition-colors">Funding Match</Link></li>
                <li><Link to="/litigation-support" className="hover:text-orange-400 transition-colors">Dispute Support</Link></li>
                <li><Link to="/rent-reporting" className="hover:text-orange-400 transition-colors">Rent Reporting</Link></li>
                <li><Link to="/tradeline-service" className="hover:text-orange-400 transition-colors">Tradeline Service</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
                <li><Link to="/pricing" className="hover:text-orange-400 transition-colors">Pricing Plans</Link></li>
                <li><Link to="/faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
                <li>
                  <a
                    href="https://discord.gg/olagix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Discord Community
                  </a>
                </li>
                <li><Link to="/login" className="hover:text-orange-400 transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Olagix. All rights reserved. Transforming funding profiles for entrepreneurs worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;