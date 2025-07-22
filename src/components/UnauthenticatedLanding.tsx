import React from 'react';

interface UnauthenticatedLandingProps {
  onSignUp: () => void;
  onGetStarted: () => void;
}

const UnauthenticatedLanding: React.FC<UnauthenticatedLandingProps> = ({
  onSignUp,
  onGetStarted
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '120px 24px 80px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Build and Launch Campaigns in Minutes, Not Days
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#888',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Tell Typpi your idea once. Get complete campaigns with ads, landing pages, and content - all optimized and ready to deploy.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onGetStarted}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Building Free
            </button>
            <button
              onClick={onSignUp}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              See a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 24px',
        background: '#0a0a0a'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            Everything You Need to Launch Successful Campaigns
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#888',
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            From idea to execution, Typpi handles every aspect of your marketing campaigns
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {/* Feature 1 */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid #333',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#ec4899';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#333';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '12px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                AI Campaign Builder
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6'
              }}>
                From idea to execution in one conversation. Our AI understands your goals and creates comprehensive campaigns tailored to your brand.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid #333',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#ec4899';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#333';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '12px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Multi-Platform Output
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6'
              }}>
                Facebook ads, Google ads, landing pages, email campaigns, and more. One input creates assets for every platform you need.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid #333',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#ec4899';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#333';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '12px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="8" x2="2" y2="22" stroke="white" strokeWidth="2"/>
                  <line x1="17.5" y1="15" x2="9" y2="15" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Brand Integration
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6'
              }}>
                Upload your brand assets once and use them everywhere. Consistent branding across all your campaigns automatically.
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid #333',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#ec4899';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#333';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '12px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Performance Optimization
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6'
              }}>
                AI-optimized copy and targeting suggestions based on industry best practices and real performance data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '80px 24px',
        background: '#111'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            Three Steps to Campaign Success
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#888',
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            Simple, fast, and effective campaign creation process
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Step 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                1
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Describe
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6',
                fontSize: '16px'
              }}>
                Tell Typpi your campaign idea, target audience, and goals. Our AI understands context and asks the right questions to get everything it needs.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                2
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Review
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6',
                fontSize: '16px'
              }}>
                Get complete campaign assets in minutes. Review ad copy, landing pages, targeting suggestions, and creative briefs all in one place.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                3
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Launch
              </h3>
              <p style={{
                color: '#888',
                lineHeight: '1.6',
                fontSize: '16px'
              }}>
                Deploy across platforms with one click. Export to Facebook Ads Manager, Google Ads, or download assets for manual upload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            Ready to Transform Your Marketing?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#888',
            marginBottom: '40px'
          }}>
            Join thousands of marketers who've already streamlined their campaign creation
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onGetStarted}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started Free
            </button>
            <button
              onClick={onSignUp}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              See a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnauthenticatedLanding;