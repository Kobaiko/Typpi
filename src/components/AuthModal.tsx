import React, { useState } from 'react';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, initialMode = 'signup' }) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  
  // Reset form state only when mode changes, not when modal reopens
  React.useEffect(() => {
    setIsSignUp(initialMode === 'signup');
  }, [initialMode]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScrapingWebsite, setIsScrapingWebsite] = useState(false);
  const [brandData, setBrandData] = useState<any>(null);
  const [showBrandPreview, setShowBrandPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Real Supabase signup with brand data
        const { signUp } = await import('../lib/supabase');
        const { data, error } = await signUp(email, password, name, company, website, brandData);
        
        if (error) {
          alert('Signup error: ' + error.message);
          setIsLoading(false);
          return;
        }
        
        alert('Signup successful! Check your email to verify your account.');
      } else {
        // Real Supabase signin
        const { signIn } = await import('../lib/supabase');
        const { data, error } = await signIn(email, password);
        
        if (error) {
          alert('Signin error: ' + error.message);
          setIsLoading(false);
          return;
        }
      }
      
      setIsLoading(false);
      onAuthSuccess();
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleWebsiteScrape = async () => {
    if (!website) return;
    
    setIsScrapingWebsite(true);
    try {
      // Check if backend is available
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      if (!apiUrl) {
        throw new Error('API URL not configured');
      }

      // Call backend to scrape website and extract brand data including logo
      const response = await fetch(`${apiUrl}/brand/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          website,
          extractLogo: true,
          extractColors: true,
          extractFonts: true,
          company: company
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setBrandData(data);
        setShowBrandPreview(true);
      } else {
        // Fallback: Try to extract basic brand info including favicon
        console.warn('Backend response failed, attempting basic extraction');
        
        let logoUrl: string | null = null;
        try {
          // Try to get favicon as logo fallback
          const domain = new URL(website).origin;
          logoUrl = `${domain}/favicon.ico`;
          
          // Test if favicon exists
          const faviconTest = new Image();
          faviconTest.onload = () => {
            setBrandData((prev: any) => prev ? { ...prev, logo: logoUrl } : prev);
          };
          faviconTest.onerror = () => {
            // Try common logo paths
            const commonLogoPaths = ['/logo.png', '/logo.svg', '/assets/logo.png', '/images/logo.png'];
            for (const path of commonLogoPaths) {
              const testUrl = `${domain}${path}`;
              const logoTest = new Image();
              logoTest.onload = () => {
                setBrandData((prev: any) => prev ? { ...prev, logo: testUrl } : prev);
                return;
              };
              logoTest.src = testUrl;
            }
          };
          faviconTest.src = logoUrl;
        } catch (e) {
          console.warn('Could not extract logo from website');
        }

        const mockBrandData = {
          name: company || 'Your Company',
          colors: ['#EC4899', '#8B5CF6', '#10B981'],
          fonts: ['Inter', 'Roboto'],
          logo: logoUrl,
          description: `AI-powered marketing platform for ${company || 'your business'}`,
          industry: 'Technology',
          tone: 'Professional and innovative',
          website: website
        };
        setBrandData(mockBrandData);
        setShowBrandPreview(true);
      }
    } catch (error) {
      console.error('Website scraping error:', error);
      
      // Fallback: Try to extract basic brand info including favicon
      console.warn('Backend not available, attempting basic extraction');
      
      let logoUrl: string | null = null;
      try {
        // Try to get favicon as logo fallback
        const domain = new URL(website).origin;
        logoUrl = `${domain}/favicon.ico`;
        
        // Test if favicon exists
        const faviconTest = new Image();
        faviconTest.onload = () => {
          setBrandData((prev: any) => prev ? { ...prev, logo: logoUrl } : prev);
        };
        faviconTest.onerror = () => {
          // Try common logo paths
          const commonLogoPaths = ['/logo.png', '/logo.svg', '/assets/logo.png', '/images/logo.png'];
          for (const path of commonLogoPaths) {
            const testUrl = `${domain}${path}`;
            const logoTest = new Image();
            logoTest.onload = () => {
              setBrandData((prev: any) => prev ? { ...prev, logo: testUrl } : prev);
              return;
            };
            logoTest.src = testUrl;
          }
        };
        faviconTest.src = logoUrl;
      } catch (e) {
        console.warn('Could not extract logo from website');
      }

      const mockBrandData = {
        name: company || 'Your Company',
        colors: ['#EC4899', '#8B5CF6', '#10B981'],
        fonts: ['Inter', 'Roboto'],
        logo: logoUrl,
        description: `AI-powered marketing platform for ${company || 'your business'}`,
        industry: 'Technology',
        tone: 'Professional and innovative',
        website: website
      };
      setBrandData(mockBrandData);
      setShowBrandPreview(true);
    } finally {
      setIsScrapingWebsite(false);
    }
  };

  const handleBrandPreviewConfirm = () => {
    setShowBrandPreview(false);
    // Continue with signup process with brand data
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setName('');
    setCompany('');
    setWebsite('');
    setBrandData(null);
    setShowBrandPreview(false);
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="auth-header">
          <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
          <p>{isSignUp ? 'Start building your marketing campaigns' : 'Sign in to continue'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name (Optional)</label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Company Website (Optional)</label>
                <div className="website-input-group">
                  <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                  {website && (
                    <button
                      type="button"
                      className="scrape-btn"
                      onClick={handleWebsiteScrape}
                      disabled={isScrapingWebsite}
                    >
                      {isScrapingWebsite ? (
                        <div className="mini-spinner"></div>
                      ) : (
                        '🔍 Analyze'
                      )}
                    </button>
                  )}
                </div>
                <small className="form-hint">
                  We'll analyze your website to understand your brand colors, logo, and tone
                </small>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" className="toggle-auth-btn" onClick={toggleMode}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

      {/* Brand Preview Modal */}
      {showBrandPreview && brandData && (
        <div className="brand-preview-overlay">
          <div className="brand-preview-modal">
            <h3>🎨 We found your brand!</h3>
            <p>Here's what we discovered about your brand. Does this look right?</p>
            
            <div className="brand-preview-content">
              {brandData.logo && (
                <div className="brand-section">
                  <h4>Logo</h4>
                  <img src={brandData.logo} alt="Company logo" className="brand-logo-preview" />
                </div>
              )}
              
              {brandData.colors && brandData.colors.length > 0 && (
                <div className="brand-section">
                  <h4>Brand Colors</h4>
                  <div className="color-palette">
                    {brandData.colors.map((color: string, index: number) => (
                      <div 
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        <span className="color-code">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {brandData.tone && (
                <div className="brand-section">
                  <h4>Brand Tone</h4>
                  <p className="brand-tone">{brandData.tone}</p>
                </div>
              )}
              
              {brandData.language && (
                <div className="brand-section">
                  <h4>Language</h4>
                  <p className="brand-language">{brandData.language}</p>
                </div>
              )}
            </div>
            
            <div className="brand-preview-actions">
              <button 
                className="brand-confirm-btn"
                onClick={handleBrandPreviewConfirm}
              >
                ✅ Looks Great!
              </button>
              <button 
                className="brand-skip-btn"
                onClick={() => setShowBrandPreview(false)}
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;