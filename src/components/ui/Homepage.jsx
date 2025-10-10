import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Code2,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Coffee,
  FileCode,
  Code,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
// import { Button } from './ui/button';
// import { Card, CardContent } from './ui/card';
// import { Badge } from './ui/badge';

// ============================================
// MOCK DATA
// ============================================
const features = [
  {
    id: 1,
    title: "Smart Problem Library",
    description: "Access thousands of curated competitive coding problems ranging from beginner to advanced levels.",
    icon: "BookOpen"
  },
  {
    id: 2,
    title: "Multi-Language Support",
    description: "Write and test your solutions in Java, C, C++, and Python with our powerful online IDE.",
    icon: "Code2"
  },
  {
    id: 3,
    title: "AI Code Review",
    description: "Get instant, intelligent feedback on your code with our AI-powered review system that analyzes efficiency and best practices.",
    icon: "Sparkles"
  },
  {
    id: 4,
    title: "Real-time Execution",
    description: "Run your code instantly and see results in real-time with our optimized execution environment.",
    icon: "Zap"
  },
  {
    id: 5,
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics and performance metrics across all problems.",
    icon: "TrendingUp"
  },
  {
    id: 6,
    title: "Community Driven",
    description: "Learn from others' solutions and share your approaches with a vibrant community of coders.",
    icon: "Users"
  }
];

const supportedLanguages = [
  { name: "Java", icon: "Coffee" },
  { name: "C", icon: "FileCode" },
  { name: "C++", icon: "FileCode2" },
  { name: "Python", icon: "Code" }
];

const howItWorksSteps = [
  {
    step: 1,
    title: "Choose a Problem",
    description: "Browse our extensive library and select a problem that matches your skill level and interests."
  },
  {
    step: 2,
    title: "Write Your Solution",
    description: "Use our intuitive code editor to craft your solution in your preferred programming language."
  },
  {
    step: 3,
    title: "Get AI Feedback",
    description: "Submit your code and receive instant AI-powered analysis on code quality, efficiency, and optimization tips."
  },
  {
    step: 4,
    title: "Improve & Master",
    description: "Refine your solution based on feedback and track your progress as you master competitive coding."
  }
];

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Problems", value: "3000+" },
  { label: "Code Reviews", value: "100K+" },
  { label: "Languages", value: "4" }
];

// ============================================
// DARK MODE CONTEXT
// ============================================
const DarkModeContext = createContext();

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Problems', href: '#problems' },
    { label: 'Leaderboard', href: '#leaderboard' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              BIT Code Master
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full text-gray-700 dark:text-gray-300">
                Sign In
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ============================================
// ICON MAP
// ============================================
const iconMap = {
  BookOpen,
  Code2,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Coffee,
  FileCode,
  FileCode2: FileCode,
  Code
};

// ============================================
// MAIN HOMEPAGE COMPONENT
// ============================================
const HomePageContent = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections(prev => new Set([...prev, index]));
              }
            });
          },
          { threshold: 0.1 }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <section
        ref={addToRefs}
        className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Animated Background with Code Image */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          {/* Code Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1515879218367-8466d910aaa4)',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          ></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-blue-50/80 dark:from-gray-950/90 dark:via-gray-950/95 dark:to-blue-950/90"></div>
          
          {/* Animated Blobs */}
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
              animation: 'float 8s ease-in-out infinite reverse'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"
            style={{
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`,
              animation: 'float 7s ease-in-out infinite'
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div 
              className="inline-block animate-fade-in-down"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-4 py-1 hover:scale-105 transition-transform duration-300">
                AI-Powered Competitive Coding Platform
              </Badge>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight animate-fade-in-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              Master Competitive
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-500">
                Coding with AI
              </span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              Sharpen your coding skills with thousands of problems, multi-language support,
              and intelligent AI-powered code reviews.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up"
              style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                Start Coding Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:scale-105 hover:shadow-xl transition-all duration-300">
                View Problems
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in-up hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ animationDelay: `${1 + index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section
        ref={addToRefs}
        className={`py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-all duration-1000 delay-200 ${
          visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Code in Your Favorite Language
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Write, test, and optimize your code in multiple programming languages
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {supportedLanguages.map((lang, index) => {
              const Icon = iconMap[lang.icon];
              return (
                <Card 
                  key={index} 
                  className={`w-48 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer group ${
                    visibleSections.has(1) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`,
                    animation: visibleSections.has(1) ? 'bounce-in 0.6s ease-out' : 'none'
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {lang.name}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={addToRefs}
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-300 ${
          visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to become a competitive coding champion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card
                  key={feature.id}
                  className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer relative overflow-hidden ${
                    visibleSections.has(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/5 transition-all duration-500"></div>
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                      <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </CardContent>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={addToRefs}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-all duration-1000 delay-400 ${
          visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your journey to coding mastery in four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.step}
                className={`relative transition-all duration-700 group cursor-pointer ${
                  visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-2xl">
                      <span className="group-hover:scale-110 transition-transform">
                        {step.step}
                      </span>
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-blue-300 dark:bg-blue-700 overflow-hidden">
                        <div className="h-full bg-blue-600 dark:bg-blue-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                      </div>
                    )}
                    
                    {/* Animated ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 dark:border-blue-500 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-500 ${
          visibleSections.has(4) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 group overflow-hidden relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1515879218367-8466d910aaa4)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
            </div>
            
            <CardContent className="p-12 text-center relative z-10">
              <Terminal className="w-16 h-16 text-white mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
              <h2 className="text-4xl font-bold text-white mb-4 group-hover:scale-105 transition-transform">
                Ready to Level Up Your Coding Skills?
              </h2>
              <p className="text-xl text-blue-100 mb-8 group-hover:text-white transition-colors">
                Join thousands of developers mastering competitive coding with AI assistance
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 group/btn">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg hover:scale-110 transition-all duration-300">
                  Explore Problems
                </Button>
              </div>
            </CardContent>
            
            {/* Animated corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-full transform -translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BIT Code Master</span>
              </div>
              <p className="text-gray-400">
                AI-powered competitive coding platform for aspiring developers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Problems</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contests</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BIT Code Master. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

// ============================================
// MAIN EXPORT WITH DARK MODE PROVIDER
// ============================================
const HomePage = () => {
  return (
    <DarkModeProvider>
      <HomePageContent />
    </DarkModeProvider>
  );
};

export default HomePage;