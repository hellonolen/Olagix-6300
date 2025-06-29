import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShare2, FiDollarSign, FiUsers, FiCopy, FiCheck, FiGift, FiTrendingUp, FiMail, FiMessageCircle } = FiIcons;

const ReferralProgram = () => {
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 12,
    successfulSignups: 8,
    totalEarnings: 240,
    pendingPayouts: 60
  });

  const [referralHistory, setReferralHistory] = useState([
    { id: 1, name: 'John D.', email: 'john@example.com', status: 'Active', signupDate: '2024-01-15', reward: 30 },
    { id: 2, name: 'Sarah M.', email: 'sarah@example.com', status: 'Active', signupDate: '2024-01-12', reward: 30 },
    { id: 3, name: 'Mike R.', email: 'mike@example.com', status: 'Pending', signupDate: '2024-01-10', reward: 30 }
  ]);

  useEffect(() => {
    // Generate unique referral link
    const userId = user?.id || 'demo-user';
    const baseUrl = window.location.origin;
    setReferralLink(`${baseUrl}/#/register?ref=${userId}`);
  }, [user]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Email',
      icon: FiMail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: () => {
        const subject = 'Check out Olagix - Credit & Business Funding Platform';
        const body = `I've been using Olagix to improve my credit and find business funding. You should check it out! Use my referral link: ${referralLink}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }
    },
    {
      name: 'Text Message',
      icon: FiMessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: () => {
        const message = `Check out Olagix for credit improvement and business funding: ${referralLink}`;
        window.open(`sms:?body=${encodeURIComponent(message)}`);
      }
    },
    {
      name: 'Social Media',
      icon: FiShare2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Olagix - Credit & Business Funding',
            text: 'Improve your credit and find business funding with Olagix',
            url: referralLink
          });
        }
      }
    }
  ];

  const rewardTiers = [
    { referrals: 1, reward: 30, title: 'First Referral', description: 'Get started with your first successful referral' },
    { referrals: 5, reward: 200, title: 'Bronze Ambassador', description: '5 successful referrals + bonus' },
    { referrals: 10, reward: 500, title: 'Silver Ambassador', description: '10 successful referrals + larger bonus' },
    { referrals: 25, reward: 1500, title: 'Gold Ambassador', description: '25 successful referrals + premium bonus' }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Program</h1>
          <p className="text-gray-600">
            Earn $30 for each successful referral. Help others improve their credit while earning rewards!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{referralStats.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{referralStats.successfulSignups}</div>
            <div className="text-sm text-gray-600">Successful Signups</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">${referralStats.totalEarnings}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiGift} className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">${referralStats.pendingPayouts}</div>
            <div className="text-sm text-gray-600">Pending Payouts</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Referral Link */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h3>
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 input-field bg-gray-50"
                />
                <button
                  onClick={copyReferralLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  <SafeIcon icon={copied ? FiCheck : FiCopy} className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Share this link with friends and colleagues. You'll earn $30 for each person who signs up for a paid plan.
              </p>

              {/* Share Options */}
              <div className="grid md:grid-cols-3 gap-4">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
                  >
                    <div className={`w-8 h-8 ${option.bgColor} rounded-full flex items-center justify-center`}>
                      <SafeIcon icon={option.icon} className={`w-4 h-4 ${option.color}`} />
                    </div>
                    <span className="font-medium text-gray-900">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Referral History */}
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral History</h3>
              <div className="space-y-3">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{referral.name}</h4>
                      <p className="text-sm text-gray-600">{referral.email}</p>
                      <p className="text-xs text-gray-500">Signed up: {referral.signupDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
                      </span>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        ${referral.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Share Your Link</h4>
                    <p className="text-sm text-gray-600">Send your unique referral link to friends</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">They Sign Up</h4>
                    <p className="text-sm text-gray-600">Your friend creates an account and subscribes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">You Get Paid</h4>
                    <p className="text-sm text-gray-600">Earn $30 credited to your account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reward Tiers */}
            <div className="bg-white rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward Tiers</h3>
              <div className="space-y-3">
                {rewardTiers.map((tier, index) => {
                  const isUnlocked = referralStats.successfulSignups >= tier.referrals;
                  const isCurrent = index === rewardTiers.findIndex(t => referralStats.successfulSignups < t.referrals);
                  
                  return (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        isUnlocked 
                          ? 'border-green-200 bg-green-50' 
                          : isCurrent 
                            ? 'border-orange-200 bg-orange-50'
                            : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{tier.title}</h4>
                        {isUnlocked && <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{tier.description}</p>
                      <div className="text-sm font-bold text-orange-600">${tier.reward} total</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Program Terms</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• $30 per successful paid signup</li>
                <li>• Payouts processed monthly</li>
                <li>• Referrals must remain active for 30 days</li>
                <li>• Bonus tiers unlock additional rewards</li>
                <li>• Self-referrals not permitted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralProgram;