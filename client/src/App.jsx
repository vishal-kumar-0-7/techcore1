import React, { lazy, Suspense } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/services/Home';
import AdminGuard from './components/AdminGuard';

const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const AppDevelopment = lazy(() => import('./pages/services/AppDevelopment'));
const SoftwareDevelopment = lazy(() => import('./pages/services/SoftwareDevelopment'));
const AIAutomation = lazy(() => import('./pages/services/AIAutomation'));
const CloudDevOps = lazy(() => import('./pages/services/CloudDevOps'));
const SecurityManagedIT = lazy(() => import('./pages/services/SecurityManagedIT'));
const BlockchainDevelopment = lazy(() => import('./pages/services/BlockchainDevelopment'));
const GrowthMarketing = lazy(() => import('./pages/services/GrowthMarketing'));
const DedicatedTeam = lazy(() => import('./pages/services/DedicatedTeam'));
const StartupSolution = lazy(() => import('./pages/solutions/Startup'));
const Enterprise = lazy(() => import('./pages/solutions/Enterprise'));
const WhiteLabel = lazy(() => import('./pages/solutions/WhiteLabel'));
const Contact = lazy(() => import('./pages/Contact'));
const AboutUs = lazy(() => import('./pages/Company/AboutUs'));
const Partnership = lazy(() => import('./pages/Company/Partnership'));
const HowWeWork = lazy(() => import('./pages/Company/HowWeWork'));
const WhyChooseUs = lazy(() => import('./pages/Company/WhyChooseUs'));
const Blog = lazy(() => import('./pages/resources/Blog'));
const BlogPost = lazy(() => import('./pages/resources/BlogPost'));
const Appointment = lazy(() => import('./pages/resources/Appointment'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Work = lazy(() => import('./pages/Work'));

function AdminLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <div>
      {/* Pages are code-split; Home stays in the main bundle for a fast first paint */}
      <Suspense fallback={<div className="min-h-screen" />}>
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
      </Suspense>
    </div>
  );
}

export default App;
