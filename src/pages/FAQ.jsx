import React, {useState} from 'react';
import {motion} from 'framer-motion';
import Layout from '../components/Layout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiChevronDown, FiChevronUp, FiHelpCircle, FiCreditCard, FiDollarSign, FiShield} = FiIcons;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqCategories = [
    {
      title: 'General Questions',
      icon: FiHelpCircle,
      questions: [
        {
          q: 'What is Olagix and how does it work?',
          a: 'Olagix is a comprehensive credit optimization and business funding platform. We use AI-powered analysis to help you improve your personal and business credit scores, connect you with funding opportunities, and provide legal support for credit disputes.'
        },
        {
          q: 'How quickly can I see results?',
          a: 'Results vary by individual situation, but most customers see credit score improvements within 30-60 days. Some see changes as quickly as 2 weeks, especially with our tradeline services and dispute resolutions.'
        },
        {
          q: 'Is Olagix legitimate and safe?',
          a: 'Yes, Olagix is a legitimate company that follows all credit reporting laws and regulations. We use bank-level security to protect your information and are transparent about our methods and pricing.'
        },
        {
          q: 'Do you guarantee results?',
          a: 'While we cannot guarantee specific score increases due to individual circumstances, we have a 95% success rate in helping customers improve their credit profiles. We offer various tools and if one approach doesn\'t work, we try others.'
        }
      ]
    },
    {
      title: 'Credit Services',
      icon: FiCreditCard,
      questions: [
        {
          q: 'How many business profiles can I create?',
          a: 'Depending on your membership level, you can create 1-10 business profiles. Professional members get up to 5 profiles, while Enterprise members can create up to 10 business profiles.'
        },
        {
          q: 'What is the tradeline service?',
          a: 'Our tradeline service adds you as an authorized user to a premium $50,000 credit line with perfect payment history. This can boost your credit score by 50-100 points and remains on your report for 60+ days.'
        },
        {
          q: 'How does rent reporting work?',
          a: 'We verify your rent payment history with your landlord and report up to 5 years of positive payments to all three credit bureaus. This typically adds 20-40 points to your credit score.'
        },
        {
          q: 'What makes your AI recommendations different?',
          a: 'Our AI analyzes your complete credit profile and provides personalized recommendations based on proven strategies. Unlike generic advice, our suggestions are tailored to your specific situation and goals.'
        }
      ]
    },
    {
      title: 'Funding & Business',
      icon: FiDollarSign,
      questions: [
        {
          q: 'How does funding matching work?',
          a: 'We analyze your business profile and credit situation to match you with lenders who are most likely to approve your application. We work with traditional banks, alternative lenders, and no-doc/low-doc options.'
        },
        {
          q: 'What types of funding can you help me find?',
          a: 'We help with business term loans, lines of credit, SBA loans, revenue-based financing, equipment financing, and alternative funding options. Amounts range from $10K to $5M+ depending on your qualifications.'
        },
        {
          q: 'Do you charge fees for funding connections?',
          a: 'No, we don\'t charge fees for connecting you with lenders. Our revenue comes from membership fees only. The lenders pay us referral fees, but this doesn\'t affect your rates or terms.'
        },
        {
          q: 'How long does the funding process take?',
          a: 'It varies by lender and loan type. Some alternative lenders can approve and fund within 24-48 hours, while traditional bank loans may take 30-60 days. We help speed up the process with proper preparation.'
        }
      ]
    },
    {
      title: 'Legal & Disputes',
      icon: FiShield,
      questions: [
        {
          q: 'Are your dispute letters legally valid?',
          a: 'Yes, our AI-generated letters are based on actual consumer protection laws (FCRA, FDCPA, TCPA, etc.) and are legally valid. However, we recommend consulting an attorney for complex cases.'
        },
        {
          q: 'What is secondary dispute support?',
          a: 'Beyond the "Big 3" credit bureaus, we help you dispute items with secondary agencies like ChexSystems, LexisNexis, and others that can affect your ability to get loans or open accounts.'
        },
        {
          q: 'Can you help with identity theft?',
          a: 'Yes, we provide specialized dispute letters and guidance for identity theft situations. We help you remove fraudulent accounts and restore your credit profile.'
        },
        {
          q: 'What if a dispute doesn\'t work?',
          a: 'If initial disputes are unsuccessful, we provide follow-up letter templates and escalation strategies. Our litigation support can also help you understand your legal options.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Olagix services and how we can help improve your credit and secure funding.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: categoryIndex * 0.1}}
              className="bg-white rounded-2xl card-shadow overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                <div className="flex items-center space-x-3 text-white">
                  <SafeIcon icon={category.icon} className="w-6 h-6" />
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, questionIndex) => {
                  const itemKey = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[itemKey];

                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 pr-4">{faq.q}</h3>
                          <SafeIcon 
                            icon={isOpen ? FiChevronUp : FiChevronDown} 
                            className="w-5 h-5 text-gray-500 flex-shrink-0" 
                          />
                        </div>
                      </button>
                      
                      {isOpen && (
                        <motion.div
                          initial={{opacity: 0, height: 0}}
                          animate={{opacity: 1, height: 'auto'}}
                          exit={{opacity: 0, height: 0}}
                          transition={{duration: 0.3}}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.5}}
          className="mt-12 bg-gray-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Support
            </button>
            <a 
              href="https://discord.gg/olagix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Join Discord Community
            </a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FAQ;