import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { AdminProvider } from './contexts/AdminContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Pricing from './pages/Pricing';
import Membership from './pages/Membership';
import Login from './pages/Login';
import Register from './pages/Register';
import OnboardingFlow from './pages/OnboardingFlow';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import PersonalProfile from './pages/PersonalProfile';
import BusinessProfiles from './pages/BusinessProfiles';
import FundingMatch from './pages/FundingMatch';
import Analytics from './pages/Analytics';
import DisputeCenter from './pages/DisputeCenter';
import SecondaryBureaus from './pages/SecondaryBureaus';
import LitigationSupport from './pages/LitigationSupport';
import SecondaryDisputes from './pages/SecondaryDisputes';
import RentReporting from './pages/RentReporting';
import TradelineService from './pages/TradelineService';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Support from './pages/Support';
import AdminCenter from './pages/AdminCenter';

// Legacy imports for backward compatibility
import PersonalCredit from './pages/PersonalCredit';
import BusinessCredit from './pages/BusinessCredit';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AdminProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/onboarding" element={<OnboardingFlow />} />

                {/* Dashboard Routes - NO AUTHENTICATION REQUIRED IN DEV */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/personal-profile" element={<PersonalProfile />} />
                <Route path="/business-profiles" element={<BusinessProfiles />} />
                <Route path="/funding-match" element={<FundingMatch />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/dispute-center" element={<DisputeCenter />} />
                <Route path="/secondary-bureaus" element={<SecondaryBureaus />} />
                <Route path="/litigation-support" element={<LitigationSupport />} />
                <Route path="/secondary-disputes" element={<SecondaryDisputes />} />
                <Route path="/rent-reporting" element={<RentReporting />} />
                <Route path="/tradeline-service" element={<TradelineService />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="/admin-center" element={<AdminCenter />} />

                {/* Legacy routes for backward compatibility */}
                <Route path="/personal-credit" element={<PersonalCredit />} />
                <Route path="/business-credit" element={<BusinessCredit />} />
              </Routes>
            </div>
          </Router>
        </AdminProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;