import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/services/Home';
import WebDevelopment from './pages/services/WebDevelopment';
import AppDevelopment from './pages/services/AppDevelopment';
import SoftwareDevelopment from './pages/services/SoftwareDevelopment';
import AIAutomation from './pages/services/AIAutomation';
import CloudDevOps from './pages/services/CloudDevOps';
import SecurityManagedIT from './pages/services/SecurityManagedIT';
import BlockchainDevelopment from './pages/services/BlockchainDevelopment';
import GrowthMarketing from './pages/services/GrowthMarketing';
import DedicatedTeam from './pages/services/DedicatedTeam';
import StartupSolution from './pages/solutions/Startup';
import Enterprise from './pages/solutions/Enterprise';
import WhiteLabel from './pages/solutions/WhiteLabel';
import Contact from './pages/Contact';
import AboutUs from './pages/company/AboutUs';
import Partnership from './pages/company/Partnership';
import HowWeWork from './pages/company/HowWeWork';
import WhyChooseUs from './pages/company/WhyChooseUs';
import Blog from './pages/resources/Blog';
import BlogPost from './pages/resources/BlogPost';
import Appointment from './pages/resources/Appointment';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogEditor from './pages/admin/BlogEditor';
import AdminGuard from './components/AdminGuard';
import NotFound from './pages/NotFound';
import Work from './pages/Work';

function AdminLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <div>
      <Routes>
        {/* Admin routes — no Navbar */}
        <Route path="/admin" element={<AdminLayout><AdminLogin /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminGuard><AdminDashboard /></AdminGuard></AdminLayout>} />
        <Route path="/admin/blog/new" element={<AdminLayout><AdminGuard><BlogEditor /></AdminGuard></AdminLayout>} />
        <Route path="/admin/blog/:id" element={<AdminLayout><AdminGuard><BlogEditor /></AdminGuard></AdminLayout>} />

        {/* Public routes — with Navbar */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/app-development" element={<AppDevelopment />} />
              <Route path="/services/software-development" element={<SoftwareDevelopment />} />
              <Route path="/services/ai-automation" element={<AIAutomation />} />
              <Route path="/services/cloud-devops" element={<CloudDevOps />} />
              <Route path="/services/security-managed-it" element={<SecurityManagedIT />} />
              <Route path="/services/blockchain-development" element={<BlockchainDevelopment />} />
              <Route path="/services/growth-marketing" element={<GrowthMarketing />} />
              <Route path="/services/dedicated-team" element={<DedicatedTeam />} />
              <Route path="/solutions/startup" element={<StartupSolution />} />
              <Route path="/solutions/enterprise" element={<Enterprise />} />
              <Route path="/solutions/white-label" element={<WhiteLabel />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/company/about" element={<AboutUs />} />
              <Route path="/company/partnership" element={<Partnership />} />
              <Route path="/company/how-we-work" element={<HowWeWork />} />
              <Route path="/company/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/resources/blog" element={<Blog />} />
              <Route path="/resources/blog/:slug" element={<BlogPost />} />
              <Route path="/resources/appointment" element={<Appointment />} />
              <Route path="/work" element={<Work />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
