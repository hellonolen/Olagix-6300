import React, {useState} from 'react';
import {motion} from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiHelpCircle, FiMessageCircle, FiMail, FiPhone, FiBook, FiVideo, FiSearch, FiClock, FiCheck} = FiIcons;

const Support = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const tabs = [
    {id: 'help', name: 'Help Center', icon: FiHelpCircle},
    {id: 'contact', name: 'Contact Support', icon: FiMessageCircle},
    {id: 'resources', name: 'Resources', icon: FiBook}
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: FiBook,
      articles: [
        'How to set up your account',
        'Understanding your credit score',
        'Creating your first business profile',
        'Navigating the dashboard'
      ]
    },
    {
      title: 'Credit & Disputes',
      icon: FiHelpCircle,
      articles: [
        'How to file a credit dispute',
        'Understanding dispute outcomes',
        'Working with credit bureaus',
        'Improving your credit score'
      ]
    },
    {
      title: 'Business Funding',
      icon: FiMessageCircle,
      articles: [
        'Preparing for funding applications',
        'Understanding funding requirements',
        'Building business credit',
        'Finding the right lenders'
      ]
    },
    {
      title: 'Account & Billing',
      icon: FiMail,
      articles: [
        'Managing your subscription',
        'Updating payment methods',
        'Understanding plan features',
        'Canceling your account'
      ]
    }
  ];

  const contactOptions = [
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 9 AM - 6 PM EST',
      icon: FiMessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      icon: FiMail,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Available for Premium+ members',
      icon: FiPhone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const resources = [
    {
      title: 'Credit Education Videos',
      description: 'Learn about credit optimization with our video library',
      type: 'Video Library',
      icon: FiVideo,
      count: '25+ videos'
    },
    {
      title: 'Funding Guide',
      description: 'Complete guide to business funding and preparation',
      type: 'PDF Guide',
      icon: FiBook,
      count: '50 pages'
    },
    {
      title: 'Dispute Letter Templates',
      description: 'Pre-written templates for common credit disputes',
      type: 'Templates',
      icon: FiMail,
      count: '15 templates'
    },
    {
      title: 'Webinar Recordings',
      description: 'Recorded sessions on credit and business topics',
      type: 'Webinars',
      icon: FiVideo,
      count: '12 recordings'
    }
  ];

  const recentTickets = [
    {
      id: 'T-001',
      subject: 'Question about dispute process',
      status: 'Resolved',
      created: '2024-01-10',
      updated: '2024-01-12'
    },
    {
      id: 'T-002',
      subject: 'Business profile verification',
      status: 'In Progress',
      created: '2024-01-08',
      updated: '2024-01-15'
    }
  ];

  const renderHelp = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How can we help?</h3>
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Search for help articles, guides, or FAQs..."
          />
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {helpCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={category.icon} className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.articles.map((article, idx) => (
                <li key={idx}>
                  <button className="text-left text-gray-600 hover:text-orange-600 transition-colors text-sm">
                    {article}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Recent Tickets</h3>
        {recentTickets.length === 0 ? (
          <div className="text-center py-8">
            <SafeIcon icon={FiMessageCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No support tickets yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTickets.map((ticket, index) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                  <p className="text-sm text-gray-600">Ticket #{ticket.id} • Created {ticket.created}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-6">
        {contactOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 card-shadow text-center"
          >
            <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <SafeIcon icon={option.icon} className={`w-8 h-8 ${option.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
            <p className="text-gray-600 mb-3">{option.description}</p>
            <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
            <button 
              onClick={() => option.type === 'email' ? setShowContactForm(true) : null}
              className="btn-primary w-full"
            >
              {option.type === 'chat' ? 'Start Chat' :
               option.type === 'email' ? 'Send Email' :
               'Call Now'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Contact Form */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Contact</h3>
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select className="input-field">
                <option>General Question</option>
                <option>Technical Issue</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="input-field">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={4}
              className="input-field"
              placeholder="Describe your question or issue..."
            />
          </div>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 card-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={resource.icon} className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                    {resource.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{resource.count}</span>
                  <button className="btn-primary text-sm">
                    Access Resource
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community & Learning</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Discord Community</h4>
            <p className="text-sm text-gray-600 mb-3">
              Join our Discord server to connect with other entrepreneurs and get real-time help.
            </p>
            <a href="https://discord.gg/olagix" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              Join Discord
            </a>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Knowledge Base</h4>
            <p className="text-sm text-gray-600 mb-3">
              Browse our comprehensive knowledge base with detailed guides and tutorials.
            </p>
            <button className="btn-primary text-sm">
              Browse Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
          <p className="text-gray-600">
            Get help, find answers, and connect with our support team.
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
              {activeTab === 'help' && renderHelp()}
              {activeTab === 'contact' && renderContact()}
              {activeTab === 'resources' && renderResources()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;