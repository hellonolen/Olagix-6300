import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiPlay, FiCheck, FiClock, FiStar, FiAward, FiUsers, FiTrendingUp } = FiIcons;

const CreditUniversity = () => {
  const { isFeatureEnabled } = useAdmin();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState(['credit-basics']);

  const courses = [
    {
      id: 'credit-basics',
      title: 'Credit Fundamentals',
      description: 'Master the basics of credit scores, reports, and how credit works',
      level: 'Beginner',
      duration: '2 hours',
      lessons: 8,
      rating: 4.9,
      students: 15420,
      category: 'fundamentals',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      objectives: [
        'Understand how credit scores are calculated',
        'Learn about the three credit bureaus',
        'Discover factors that impact your score',
        'Master credit report reading'
      ]
    },
    {
      id: 'advanced-optimization',
      title: 'Advanced Credit Optimization',
      description: 'Advanced strategies for maximizing your credit score quickly',
      level: 'Advanced',
      duration: '3 hours',
      lessons: 12,
      rating: 4.8,
      students: 8930,
      category: 'optimization',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      objectives: [
        'Advanced utilization strategies',
        'Credit mix optimization',
        'Timing strategies for applications',
        'Score manipulation techniques'
      ]
    },
    {
      id: 'business-credit-mastery',
      title: 'Business Credit Mastery',
      description: 'Build strong business credit profiles for funding success',
      level: 'Intermediate',
      duration: '4 hours',
      lessons: 15,
      rating: 4.9,
      students: 12100,
      category: 'business',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      objectives: [
        'Establish business credit from scratch',
        'Build multiple business profiles',
        'Vendor credit strategies',
        'Business funding preparation'
      ]
    },
    {
      id: 'dispute-mastery',
      title: 'Dispute Letter Mastery',
      description: 'Professional dispute strategies that get results',
      level: 'Intermediate',
      duration: '2.5 hours',
      lessons: 10,
      rating: 4.7,
      students: 9850,
      category: 'disputes',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop',
      objectives: [
        'Write effective dispute letters',
        'Understand dispute laws',
        'Follow-up strategies',
        'Secondary bureau disputes'
      ]
    },
    {
      id: 'funding-strategies',
      title: 'Funding Acquisition Strategies',
      description: 'Master the art of securing business and personal funding',
      level: 'Advanced',
      duration: '3.5 hours',
      lessons: 14,
      rating: 4.8,
      students: 7650,
      category: 'funding',
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop',
      objectives: [
        'Identify the right funding sources',
        'Optimize approval odds',
        'Application strategies',
        'Alternative funding options'
      ]
    },
    {
      id: 'legal-protection',
      title: 'Legal Protection & Rights',
      description: 'Know your rights and protect yourself legally',
      level: 'Intermediate',
      duration: '2 hours',
      lessons: 9,
      rating: 4.6,
      students: 6420,
      category: 'legal',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop',
      objectives: [
        'Understand consumer protection laws',
        'FCRA, FDCPA, TCPA compliance',
        'When to seek legal help',
        'Document everything properly'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: FiBook },
    { id: 'fundamentals', name: 'Fundamentals', icon: FiTrendingUp },
    { id: 'optimization', name: 'Optimization', icon: FiStar },
    { id: 'business', name: 'Business Credit', icon: FiUsers },
    { id: 'disputes', name: 'Disputes', icon: FiCheck },
    { id: 'funding', name: 'Funding', icon: FiAward },
    { id: 'legal', name: 'Legal', icon: FiBook }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCompleted = (courseId) => completedCourses.includes(courseId);

  const markAsCompleted = (courseId) => {
    if (!isCompleted(courseId)) {
      setCompletedCourses(prev => [...prev, courseId]);
    }
  };

  if (!isFeatureEnabled('educationContentEmpire') || !isFeatureEnabled('creditUniversity')) {
    return null;
  }

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    return (
      <div className="space-y-6">
        {/* Course Header */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="mb-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Courses
          </button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <SafeIcon icon={FiClock} className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">{course.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <SafeIcon icon={FiBook} className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">{course.lessons}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <SafeIcon icon={FiUsers} className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => markAsCompleted(course.id)}
                className={`btn-primary w-full ${isCompleted(course.id) ? 'opacity-50' : ''}`}
                disabled={isCompleted(course.id)}
              >
                {isCompleted(course.id) ? 'Completed' : 'Start Course'}
              </button>
            </div>

            <div>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Preview */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
          <div className="space-y-3">
            {Array.from({ length: course.lessons }, (_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPlay} className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-gray-900">
                    Lesson {i + 1}: {['Introduction', 'Key Concepts', 'Practical Application', 'Advanced Techniques', 'Case Studies'][i % 5]}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 20) + 5} min</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiBook} className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Credit University</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Master credit optimization with our comprehensive course library. Learn from experts and earn certificates.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{courses.length}</div>
            <div className="text-sm text-blue-700">Total Courses</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{completedCourses.length}</div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {courses.reduce((acc, course) => acc + course.lessons, 0)}
            </div>
            <div className="text-sm text-purple-700">Total Lessons</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {Math.round((completedCourses.length / courses.length) * 100)}%
            </div>
            <div className="text-sm text-orange-700">Progress</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={category.icon} className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden card-shadow hover:card-shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCourse(course.id)}
          >
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                {isCompleted(course.id) && (
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiBook} className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                  <span>{course.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{course.students.toLocaleString()} students</span>
                <button className="btn-primary text-sm">
                  {isCompleted(course.id) ? 'Review' : 'Start Course'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CreditUniversity;