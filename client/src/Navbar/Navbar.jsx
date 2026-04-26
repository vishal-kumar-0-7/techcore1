import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Logo Component
const Logo = () => (
  <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="url(#gradient)" />
      <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
    <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
      TechCore
    </span>
  </Link>
);

// Desktop Dropdown Component
const DesktopDropdown = ({ item, onNavigate }) => (
  <li className="relative group">
    <button className="flex items-center gap-1 px-4 py-2.5 text-gray-600 font-medium text-[15px] rounded-lg hover:text-indigo-500 hover:bg-indigo-50 transition-all whitespace-nowrap">
      {item.name}
      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute top-full left-0 min-w-[240px] bg-white rounded-xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 border border-gray-100">
      {item.dropdown.map((subItem) => (
        <a
          key={subItem.name}
          href={subItem.path}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(subItem.path);
          }}
          className="block px-4 py-3 text-gray-600 text-sm rounded-lg hover:bg-indigo-50 hover:text-indigo-500 hover:pl-5 transition-all cursor-pointer"
        >
          {subItem.name}
        </a>
      ))}
    </div>
  </li>
);

// Desktop Nav Link Component
const DesktopNavLink = ({ item, onNavigate }) => (
  <li>
    <a
      href={item.path}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.path);
      }}
      className="block px-4 py-2.5 text-gray-600 font-medium text-[15px] rounded-lg hover:text-indigo-500 hover:bg-indigo-50 transition-all"
    >
      {item.name}
    </a>
  </li>
);

// Mobile Dropdown Component
const MobileDropdown = ({ item, activeDropdown, onToggle, onNavigate }) => {
  const isOpen = activeDropdown === item.name;
  
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => onToggle(item.name)}
        className="flex items-center justify-between w-full px-6 py-4 text-gray-900 font-medium text-base hover:bg-indigo-50 transition-colors"
        aria-expanded={isOpen}
      >
        {item.name}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        {item.dropdown.map((subItem) => (
          <a
            key={subItem.name}
            href={subItem.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(subItem.path);
            }}
            className="block px-6 py-3 pl-12 text-gray-600 text-[15px] hover:bg-indigo-50 hover:text-indigo-500 hover:pl-[52px] transition-all cursor-pointer"
          >
            {subItem.name}
          </a>
        ))}
      </div>
    </div>
  );
};

// Mobile Nav Link Component
const MobileNavLink = ({ item, onNavigate }) => (
  <div className="border-b border-gray-100">
    <a
      href={item.path}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.path);
      }}
      className="block px-6 py-4 text-gray-900 font-medium text-base hover:bg-indigo-50 transition-colors"
    >
      {item.name}
    </a>
  </div>
);

// CTA Button Component
const CTAButton = ({ onNavigate, isMobile = false }) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 transition-all cursor-pointer";
  const desktopClasses = "px-6 py-2.5 text-[15px]";
  const mobileClasses = "w-full px-6 py-3.5 text-base mx-6 my-4";
  
  return (
    <a
      href="/contact"
      onClick={(e) => {
        e.preventDefault();
        onNavigate('/contact');
      }}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      Talk to our team
    </a>
  );
};

// Mobile Menu Toggle Component
const MobileMenuToggle = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="lg:hidden flex items-center justify-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
    aria-label="Toggle menu"
    aria-expanded={isOpen}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

// Main Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      dropdown: [
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'App Development', path: '/services/app-development' },
        { name: 'Software Development', path: '/services/software-development' },
        { name: 'AI & Automation', path: '/services/ai-automation' },
        { name: 'Cloud & DevOps', path: '/services/cloud-devops' },
        // { name: 'Security & Managed IT', path: '/services/security-managed-it' },
        // { name: 'Blockchain Development', path: '/services/blockchain-development' },
        // { name: 'Growth & Marketing', path: '/services/growth-marketing' },
        // { name: 'Dedicated Team', path: '/services/dedicated-team' }
      ]
    },
    {
      name: 'Solutions',
      dropdown: [
        // { name: 'Startup Solution', path: '/solutions/startup' },
        // { name: 'Enterprise Solution', path: '/solutions/enterprise' },
        { name: 'White Label Solutions', path: '/solutions/white-label' }
      ]
    },
    {
      name: 'Company',
      dropdown: [
        { name: 'About Us', path: '/company/about' },
        { name: 'Partnership', path: '/company/partnership' },
        { name: 'How We Work', path: '/company/how-we-work' },
        { name: 'Why Choose Us', path: '/company/why-choose-us' }
      ]
    },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Blog', path: '/resources/blog' },
        { name: 'Appointment', path: '/resources/appointment' }
      ]
    },
    { name: 'Contact Us', path: '/contact' }
  ];

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    navigate(path);
  };

  const toggleMobileDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-gray-200/50' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-18 gap-12">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center flex-1 justify-center gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <DesktopDropdown
                  key={item.name}
                  item={item}
                  onNavigate={handleNavigation}
                />
              ) : (
                <DesktopNavLink
                  key={item.name}
                  item={item}
                  onNavigate={handleNavigation}
                />
              )
            )}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <CTAButton onNavigate={handleNavigation} />
          </div>

          {/* Mobile Toggle */}
          <MobileMenuToggle
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-400 ${
          isMobileMenuOpen ? 'max-h-[calc(100vh-72px)] overflow-y-auto' : 'max-h-0'
        }`}
      >
        {navItems.map((item) =>
          item.dropdown ? (
            <MobileDropdown
              key={item.name}
              item={item}
              activeDropdown={activeDropdown}
              onToggle={toggleMobileDropdown}
              onNavigate={handleNavigation}
            />
          ) : (
            <MobileNavLink
              key={item.name}
              item={item}
              onNavigate={handleNavigation}
            />
          )
        )}
        <CTAButton isMobile onNavigate={handleNavigation} />
      </div>
    </nav>
  );
};

export default Navbar;



