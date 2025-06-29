import React from 'react';
import {motion} from 'framer-motion';
import Layout from '../components/Layout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiCreditCard, FiTrendingUp, FiShield, FiUsers, FiAward, FiTarget, FiHeart, FiZap} = FiIcons;

const About = () => {
  const stats = [
    {number: '50K+', label: 'Credit Scores Improved'},
    {number: '$2B+', label: 'Funding Secured'},
    {number: '95%', label: 'Success Rate'},
    {number: '24/7', label: 'Support Available'}
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Customer First',
      description: 'Every decision we make is centered around helping our customers achieve their financial goals.'
    },
    {
      icon: FiShield,
      title: 'Trust & Security',
      description: 'We protect your sensitive financial information with bank-level security and transparency.'
    },
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI and technology to provide the most effective credit solutions.'
    },
    {
      icon: FiUsers,
      title: 'Community',
      description: 'We believe in building a supportive community where entrepreneurs help each other succeed.'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      bio: '15+ years in financial services and credit optimization',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Former fintech executive with expertise in AI and machine learning',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Credit Analysis',
      bio: 'Certified credit analyst with 20+ years experience in consumer law',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">Olagix</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize access to credit and funding opportunities for entrepreneurs and business owners through innovative technology and proven strategies.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.5, delay: index * 0.1}}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2019, Olagix was born from the frustration of watching talented entrepreneurs struggle to access the credit and funding they needed to grow their businesses.
              </p>
              <p>
                Our founders experienced firsthand the challenges of navigating complex credit systems, dealing with inaccurate credit reports, and finding the right funding sources. They knew there had to be a better way.
              </p>
              <p>
                Today, we've helped over 50,000 entrepreneurs improve their credit scores and secure more than $2 billion in funding through our comprehensive platform that combines AI-powered insights with proven credit optimization strategies.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
            <div className="text-center">
              <SafeIcon icon={FiTarget} className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-orange-100">
                To empower entrepreneurs with the tools, knowledge, and resources they need to optimize their credit profiles and secure the funding that fuels business growth.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.1}}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, delay: index * 0.1}}
                className="text-center bg-white rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.4}}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Credit?</h3>
          <p className="text-orange-100 mb-6">
            Join thousands of entrepreneurs who trust Olagix to optimize their credit and secure funding.
          </p>
          <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;