import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiStar, FiHeart, FiMessageCircle, FiShare2, FiAward } = FiIcons;

const SocialProofSystem = () => {
  const { isFeatureEnabled } = useAdmin();
  const [successStories, setSuccessStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    if (!isFeatureEnabled('socialProofSystem')) return;

    // Mock success stories data
    setSuccessStories([
      {
        id: 1,
        name: 'Sarah M.',
        location: 'Austin, TX',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
        beforeScore: 580,
        afterScore: 750,
        timeframe: '4 months',
        story: 'Olagix helped me go from 580 to 750 in just 4 months! The AI recommendations were spot-on, and the dispute letters actually worked. I got approved for a $300K mortgage!',
        category: 'Credit Improvement',
        verified: true,
        likes: 234,
        achievement: 'mortgage'
      },
      {
        id: 2,
        name: 'Marcus R.',
        location: 'Miami, FL',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        beforeScore: 620,
        afterScore: 720,
        timeframe: '3 months',
        story: 'Built credit for 5 different LLCs using Olagix strategies. Secured over $500K in business funding across all entities. The business credit module is incredible!',
        category: 'Business Funding',
        verified: true,
        likes: 189,
        achievement: 'business'
      },
      {
        id: 3,
        name: 'Jennifer L.',
        location: 'Phoenix, AZ',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        beforeScore: 540,
        afterScore: 680,
        timeframe: '6 months',
        story: 'After identity theft destroyed my credit, Olagix helped me rebuild from scratch. The dispute center removed all fraudulent accounts, and I\'m now approved for credit cards again!',
        category: 'Identity Theft Recovery',
        verified: true,
        likes: 312,
        achievement: 'recovery'
      },
      {
        id: 4,
        name: 'David K.',
        location: 'Seattle, WA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        beforeScore: 650,
        afterScore: 780,
        timeframe: '2 months',
        story: 'The tradeline service was a game-changer. Added 130 points to my score in 2 months. Used it to qualify for a business loan at prime rate!',
        category: 'Tradeline Success',
        verified: true,
        likes: 156,
        achievement: 'tradeline'
      }
    ]);

    // Auto-rotate stories every 10 seconds
    const interval = setInterval(() => {
      setCurrentStoryIndex(prev => (prev + 1) % 4);
    }, 10000);

    return () => clearInterval(interval);
  }, [isFeatureEnabled]);

  const getAchievementIcon = (achievement) => {
    switch (achievement) {
      case 'mortgage': return FiTrendingUp;
      case 'business': return FiUsers;
      case 'recovery': return FiShare2;
      case 'tradeline': return FiAward;
      default: return FiStar;
    }
  };

  const getAchievementColor = (achievement) => {
    switch (achievement) {
      case 'mortgage': return 'text-green-600 bg-green-100';
      case 'business': return 'text-blue-600 bg-blue-100';
      case 'recovery': return 'text-purple-600 bg-purple-100';
      case 'tradeline': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isFeatureEnabled('socialProofSystem') || !isFeatureEnabled('successStoriesFeed')) {
    return null;
  }

  const currentStory = successStories[currentStoryIndex];

  return (
    <div className="space-y-6">
      {/* Featured Success Story */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Success Story Spotlight</h3>
          <div className="flex space-x-1">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStoryIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStoryIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStory && (
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={currentStory.avatar}
                  alt={currentStory.name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{currentStory.name}</h4>
                    {currentStory.verified && (
                      <SafeIcon icon={FiAward} className="w-4 h-4 text-yellow-300" />
                    )}
                    <span className="text-green-100 text-sm">{currentStory.location}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{currentStory.beforeScore}</div>
                      <div className="text-green-100 text-sm">Before</div>
                    </div>
                    <div className="text-center">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-green-100 text-sm">{currentStory.timeframe}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{currentStory.afterScore}</div>
                      <div className="text-green-100 text-sm">After</div>
                    </div>
                  </div>
                  
                  <p className="text-green-100 text-sm mb-3">"{currentStory.story}"</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-white/20 text-green-100 rounded-full text-xs">
                      {currentStory.category}
                    </span>
                    <div className="flex items-center space-x-1 text-green-100">
                      <SafeIcon icon={FiHeart} className="w-4 h-4" />
                      <span className="text-sm">{currentStory.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Metrics */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Success Metrics</h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">15,420</div>
            <div className="text-sm text-green-700">Members Helped</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">+127</div>
            <div className="text-sm text-blue-700">Avg Score Increase</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">$2.1B</div>
            <div className="text-sm text-purple-700">Funding Secured</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">94%</div>
            <div className="text-sm text-orange-700">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Recent Success Stories Grid */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Success Stories</h3>
          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {successStories.slice(1, 3).map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900">{story.name}</h4>
                    {story.verified && (
                      <SafeIcon icon={FiAward} className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-2 text-sm">
                    <span className="text-gray-600">{story.beforeScore} → {story.afterScore}</span>
                    <span className="text-green-600 font-medium">+{story.afterScore - story.beforeScore} pts</span>
                    <span className="text-gray-500">{story.timeframe}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{story.story}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getAchievementColor(story.achievement)}`}>
                      <SafeIcon icon={getAchievementIcon(story.achievement)} className="w-3 h-3" />
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiHeart} className="w-4 h-4" />
                        <span className="text-sm">{story.likes}</span>
                      </div>
                      <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                      <SafeIcon icon={FiShare2} className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Achievements */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Achievements</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Credit Champions</h4>
            <p className="text-sm text-gray-600">2,340 members improved 100+ points</p>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Funding Winners</h4>
            <p className="text-sm text-gray-600">8,950 secured business funding</p>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiAward} className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Dispute Masters</h4>
            <p className="text-sm text-gray-600">12,100 successful dispute resolutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSystem;