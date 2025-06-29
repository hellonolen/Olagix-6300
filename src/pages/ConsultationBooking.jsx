import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiDollarSign, FiVideo, FiMic, FiCheck, FiX, FiMessageCircle } = FiIcons;

const ConsultationBooking = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('discord');
  const [selectedType, setSelectedType] = useState('video');
  const [selectedScheduler, setSelectedScheduler] = useState('calendly');
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('');

  const platforms = [
    {
      id: 'discord',
      name: 'Discord',
      icon: FiMessageCircle,
      description: 'High-quality audio/video calls with screen sharing',
      features: ['Screen sharing', 'Recording available', 'No time limits', 'Premium quality']
    },
    {
      id: 'zoom',
      name: 'Zoom',
      icon: FiVideo,
      description: 'Professional video conferencing platform',
      features: ['HD video', 'Recording', 'Break-out rooms', 'Professional interface']
    }
  ];

  const schedulers = [
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Easy scheduling with automated confirmations',
      logo: 'https://via.placeholder.com/40x40/00a2ff/white?text=C'
    },
    {
      id: 'tidycal',
      name: 'TidyCal',
      description: 'Simple and efficient calendar booking',
      logo: 'https://via.placeholder.com/40x40/6366f1/white?text=T'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    urgency: 'normal',
    preparation: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with payment processing
    alert('Booking submitted! You will receive payment instructions shortly.');
    setBookingStep(4);
  };

  const renderPlatformSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Consultation - $997</h2>
        <p className="text-gray-600">
          30-minute focused session with our credit and funding experts. Get straight to the point solutions.
        </p>
      </div>

      {/* Pricing Info */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Expert Consultation</h3>
            <ul className="text-orange-100 text-sm space-y-1">
              <li>• 30 minutes of focused expert guidance</li>
              <li>• Personalized credit strategy</li>
              <li>• Funding roadmap and recommendations</li>
              <li>• Dispute strategy and next steps</li>
              <li>• Q&A session with solutions</li>
            </ul>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">$997</div>
            <div className="text-orange-100 text-sm">30 minutes</div>
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Platform</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedPlatform === platform.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <SafeIcon icon={platform.icon} className="w-6 h-6 text-orange-600" />
                <h4 className="text-lg font-semibold text-gray-900">{platform.name}</h4>
              </div>
              <p className="text-gray-600 mb-4">{platform.description}</p>
              <ul className="space-y-1">
                {platform.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <SafeIcon icon={FiCheck} className="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Type</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedType('video')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              selectedType === 'video'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <SafeIcon icon={FiVideo} className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">Video Call</h4>
            <p className="text-sm text-gray-600">Face-to-face consultation with screen sharing</p>
          </button>
          <button
            onClick={() => setSelectedType('audio')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              selectedType === 'audio'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <SafeIcon icon={FiMic} className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">Audio Only</h4>
            <p className="text-sm text-gray-600">Voice-only consultation for privacy</p>
          </button>
        </div>
      </div>

      <button
        onClick={() => setBookingStep(2)}
        className="w-full btn-primary"
      >
        Continue to Scheduling
      </button>
    </div>
  );

  const renderScheduling = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Scheduler</h2>
        <p className="text-gray-600">Choose your preferred scheduling platform</p>
      </div>

      {/* Scheduler Selection */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {schedulers.map((scheduler) => (
          <div
            key={scheduler.id}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedScheduler === scheduler.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            }`}
            onClick={() => setSelectedScheduler(scheduler.id)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <img src={scheduler.logo} alt={scheduler.name} className="w-10 h-10 rounded" />
              <h4 className="text-lg font-semibold text-gray-900">{scheduler.name}</h4>
            </div>
            <p className="text-gray-600">{scheduler.description}</p>
          </div>
        ))}
      </div>

      {/* Mock Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
        <div className="grid md:grid-cols-4 gap-3 mb-6">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                selectedTime === time
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        
        {selectedTime && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">Selected Time</h4>
            <p className="text-blue-800">Today at {selectedTime} (30 minutes)</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setBookingStep(1)}
          className="flex-1 btn-secondary"
        >
          Back
        </button>
        <button
          onClick={() => setBookingStep(3)}
          disabled={!selectedTime}
          className="flex-1 btn-primary disabled:opacity-50"
        >
          Continue to Details
        </button>
      </div>
    </div>
  );

  const renderBookingForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Consultation Details</h2>
        <p className="text-gray-600">Help us prepare for your session</p>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={bookingForm.name}
              onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={bookingForm.email}
              onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
              className="input-field"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={bookingForm.phone}
              onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
              className="input-field"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
            <select
              value={bookingForm.urgency}
              onChange={(e) => setBookingForm(prev => ({ ...prev, urgency: e.target.value }))}
              className="input-field"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent - Need immediate help</option>
              <option value="critical">Critical - Time sensitive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Topic/Goal *</label>
          <select
            required
            value={bookingForm.topic}
            onChange={(e) => setBookingForm(prev => ({ ...prev, topic: e.target.value }))}
            className="input-field"
          >
            <option value="">Select your main focus</option>
            <option value="credit-repair">Credit Repair Strategy</option>
            <option value="business-funding">Business Funding Guidance</option>
            <option value="dispute-strategy">Dispute Strategy & Letters</option>
            <option value="funding-optimization">Funding Profile Optimization</option>
            <option value="tradeline-advice">Tradeline Recommendations</option>
            <option value="comprehensive">Comprehensive Review</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What specific outcomes do you need? *
          </label>
          <textarea
            required
            rows={4}
            value={bookingForm.preparation}
            onChange={(e) => setBookingForm(prev => ({ ...prev, preparation: e.target.value }))}
            className="input-field"
            placeholder="Be specific about what you want to accomplish in this 30-minute session. The more detailed you are, the better we can help you."
          />
        </div>

        {/* Session Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Session Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Platform:</span>
              <span className="font-medium capitalize">{selectedPlatform}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium capitalize">{selectedType} call</span>
            </div>
            <div className="flex justify-between">
              <span>Scheduler:</span>
              <span className="font-medium capitalize">{selectedScheduler}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">Today at {selectedTime}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total:</span>
              <span>$997</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-medium text-yellow-900 mb-2">Important Notes</h5>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Payment is required before the session</li>
            <li>• Sessions are focused and time-limited to 30 minutes</li>
            <li>• Come prepared with specific questions</li>
            <li>• Recording available for your reference</li>
            <li>• Rescheduling available with 24hr notice</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setBookingStep(2)}
            className="flex-1 btn-secondary"
          >
            Back
          </button>
          <button type="submit" className="flex-1 btn-primary">
            Book Session & Pay $997
          </button>
        </div>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Submitted!</h2>
        <p className="text-gray-600">
          You will receive payment instructions and calendar invite shortly.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
        <h4 className="font-medium text-blue-900 mb-3">Next Steps:</h4>
        <ol className="text-sm text-blue-800 space-y-2">
          <li>1. Complete payment via the link we'll send you</li>
          <li>2. You'll receive a calendar invite with {selectedPlatform} link</li>
          <li>3. Prepare your specific questions and goals</li>
          <li>4. Join the call at your scheduled time</li>
        </ol>
      </div>

      <button
        onClick={() => window.location.href = '/#/dashboard'}
        className="btn-primary"
      >
        Return to Dashboard
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Expert Consultation</h1>
          <p className="text-gray-600">
            Get personalized guidance from our credit and funding experts. $997 for 30 minutes of focused solutions.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= bookingStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < bookingStep ? <SafeIcon icon={FiCheck} className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 ${
                    step < bookingStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="grid grid-cols-4 gap-8 text-xs text-gray-600">
              <span>Platform</span>
              <span>Schedule</span>
              <span>Details</span>
              <span>Confirm</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-8 card-shadow">
          <motion.div
            key={bookingStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {bookingStep === 1 && renderPlatformSelection()}
            {bookingStep === 2 && renderScheduling()}
            {bookingStep === 3 && renderBookingForm()}
            {bookingStep === 4 && renderConfirmation()}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsultationBooking;