import React, { useState } from 'react';
import AuthModal from './AuthModal';
import ChatInterface from './ChatInterface';

const LandingPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [brandAssets, setBrandAssets] = useState({
    colors: [] as string[],
    fonts: [] as string[],
    logos: [] as File[]
  });
  const [showColorPopover, setShowColorPopover] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);

  const suggestionPills = [
    'Facebook Ad Generator',
    'Google Display Image Creator', 
    'LinkedIn Carousel Creator',
    'Instagram Reel Script',
    'Landing Page Builder',
    'Campaign Performance Summary',
    'A/B Test Result Analyzer',
    'Customer Feedback Analyzer',
    'Audience Insights Generator',
    'Social Media Post Analytics'
  ];

  const promptTemplates: { [key: string]: string } = {
    'Facebook Ad Generator': "Write three high-performing Facebook ads for [product/service]. Include: (1) headline, (2) body copy, (3) link description, and (4) suggested CTA button. Each variation should target a different persona: [Persona 1], [Persona 2], [Persona 3]. Use persuasive, scroll-stopping language optimized for mobile. Match tone to brand voice: [e.g., bold and funny / premium and professional]. Suggest ideal visual (static, carousel, video) and copy placement strategy.",
    
    'Google Display Image Creator': "Generate copy and creative specs for a Google Display ad campaign promoting [product/offering]. Provide headlines (max 30 characters), long headlines (max 90 characters), descriptions (max 90 characters), and call-to-action text. Suggest image styles for static or responsive ads — including layout ideas, background imagery, color palette, and logo placement. Output a ready-to-use creative brief.",
    
    'LinkedIn Carousel Creator': "Design a 6-slide LinkedIn carousel for [B2B topic/product]. Start with a strong hook slide, followed by 4 slides breaking down the concept, benefit, or framework, and a final slide with a call to action (CTA). Include slide titles, suggested visuals (e.g., charts, emojis, photos), and slide copy. Keep the tone expert yet casual. Optimize for scrolling behavior and shareability.",
    
    'Instagram Reel Script': "Write a 30-second Instagram Reel script to promote [product]. Structure it as: (1) Hook (first 3 seconds), (2) Problem/Situation, (3) Solution with your product, (4) CTA. Keep the language punchy, Gen Z-friendly, and visually suggestive. Include music style, suggested on-screen text, pacing, and recommended visuals or B-roll ideas.",
    
    'Landing Page Builder': "Create a complete landing page for [offer/product], optimized for conversions. Include: headline, subheadline, three value propositions, testimonials, visual layout suggestions, CTA button text, and optional FAQ. Provide variant A (emotional tone) and variant B (rational/value-driven tone). Format for mobile-first display. Output as structured blocks ready for drag-and-drop editor or code handoff.",
    
    'Campaign Performance Summary': "Analyze performance of the campaign '[Campaign Name]' across Facebook, Google Ads, and email. Provide impressions, CTR, CPA, ROAS, conversions, and time-to-convert per channel. Visualize funnel breakdown and highlight best/worst performing creatives. Compare to benchmarks from past 30 days. End with top 3 data-backed recommendations for optimization.",
    
    'A/B Test Result Analyzer': "Review the results of an A/B test comparing [Version A] and [Version B] across [channel]. Show statistical significance, highlight which variant won and why (based on copy, layout, CTA, etc.). Break down performance by audience segment and device. Suggest what to keep, what to discard, and what to test next. Return visual summary + bullet recommendations.",
    
    'Customer Feedback Analyzer': "Analyze collected feedback from surveys, support chats, NPS responses, and user reviews related to [product/campaign]. Categorize by theme (e.g., price, UX, value, performance), summarize sentiment for each, and extract sample quotes. Flag critical blockers or feature requests. Include impact rating and suggested actions per category.",
    
    'Audience Insights Generator': "Review all engagement, ad, and conversion data from the past 30 days and generate audience segments. Identify top-performing demographics, geographies, devices, and behaviors. Suggest three new micro-targeting personas based on real usage patterns. Highlight underserved but high-potential audience pockets. Format output for immediate use in Meta and Google Ads audiences.",
    
    'Social Media Post Analytics': "Analyze the last 10 organic posts across LinkedIn, Instagram, and TikTok. For each, provide engagement metrics (likes, comments, shares, watch time), content format, and caption summary. Determine which themes, tones, or styles are performing best. Suggest a 3-post content plan based on proven topics and patterns. Output includes a chart and narrative insights."
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // Start chat/workflow
    setCurrentPrompt(inputValue);
    setShowChatInterface(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    // After authentication, proceed with the workflow
    if (inputValue.trim()) {
      setCurrentPrompt(inputValue);
      setShowChatInterface(true);
    }
  };

  const handleBackToLanding = () => {
    setShowChatInterface(false);
    setCurrentPrompt('');
    setInputValue('');
  };

  const handleSignInClick = () => {
    setShowAuthModal(true);
  };

  const handleSignUpClick = () => {
    setShowAuthModal(true);
  };

  const handlePillClick = (suggestion: string) => {
    const prompt = promptTemplates[suggestion];
    if (prompt) {
      setInputValue(prompt);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleBrandColorAdd = (color: string) => {
    setBrandAssets(prev => ({
      ...prev,
      colors: [...prev.colors, color]
    }));
  };

  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => file.type.startsWith('image/'));
    setBrandAssets(prev => ({
      ...prev,
      logos: [...prev.logos, ...files]
    }));
  };

  const handleContinueChat = () => {
    // Navigate to existing chat or create new one
    setShowChatInterface(true);
    setCurrentPrompt(inputValue || 'Continue our conversation');
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeBrandColor = (index: number) => {
    setBrandAssets(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleColorPopoverOpen = () => {
    setTempColors([...brandAssets.colors]);
    setShowColorPopover(true);
  };

  const handleColorPopoverClose = () => {
    setShowColorPopover(false);
    setTempColors([]);
  };

  const handleTempColorAdd = (color: string) => {
    if (tempColors.length < 3 && !tempColors.includes(color)) {
      setTempColors(prev => [...prev, color]);
    }
  };

  const handleTempColorRemove = (index: number) => {
    setTempColors(prev => prev.filter((_, i) => i !== index));
  };

  const handleColorsSave = () => {
    setBrandAssets(prev => ({
      ...prev,
      colors: tempColors
    }));
    setShowColorPopover(false);
    setTempColors([]);
  };

  // Show ChatInterface if user is authenticated and has submitted a prompt
  if (showChatInterface && currentPrompt) {
    return (
      <ChatInterface 
        initialPrompt={currentPrompt}
        onBack={handleBackToLanding}
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <div>
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12C8 8 11 5 15 5C19 5 22 8 22 12V20C22 24 19 27 15 27C11 27 8 24 8 20V12Z" fill="#EC4899"/>
            <ellipse cx="6" cy="16" rx="3" ry="6" fill="#EC4899"/>
            <ellipse cx="24" cy="16" rx="3" ry="6" fill="#EC4899"/>
            <ellipse cx="12" cy="30" rx="2" ry="4" fill="#1F2937"/>
            <ellipse cx="18" cy="30" rx="2" ry="4" fill="#1F2937"/>
            <ellipse cx="10" cy="34" rx="4" ry="2" fill="white"/>
            <ellipse cx="20" cy="34" rx="4" ry="2" fill="white"/>
            <circle cx="13" cy="14" r="1.5" fill="#1F2937"/>
            <circle cx="17" cy="14" r="1.5" fill="#1F2937"/>
            <path d="M12 18C13 19 14 19.5 15 19.5C16 19.5 17 19 18 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round"/>
            <text x="35" y="25" fill="#E5E7EB" fontSize="16" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Typpi</text>
          </svg>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {isAuthenticated ? (
            <button 
              onClick={handleContinueChat}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Continue Chat
            </button>
          ) : (
            <>
              <button 
                onClick={handleSignInClick}
                style={{
                  background: 'transparent',
                  border: '1px solid #333',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Sign In
              </button>
              <button 
                onClick={handleSignUpClick}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.1' }}>
          What's your next<br />campaign idea?
        </h1>
        <p style={{ color: '#888', fontSize: '18px' }}>
          Tell Typpi once. It'll build and launch it for you.
        </p>
      </div>

      {/* Input Container */}
      <div style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
        <div style={{
          position: 'relative',
          borderRadius: '20px',
          padding: '2px',
          background: 'linear-gradient(45deg, #00ff88, #00d4ff, #ff00ff, #ffaa00)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 3s ease infinite'
        }}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '18px',
            overflow: 'hidden'
          }}>
          {/* Text Area */}
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '16px 24px'
          }}>
            <textarea
              style={{
                width: '100%',
                height: '200px',
                background: 'transparent',
                color: 'white',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: '16px',
                fontFamily: 'inherit',
                lineHeight: '1.5'
              }}
              placeholder="How can Typpi help you today"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Button Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderTop: '1px solid #333',
            background: '#1a1a1a'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Documents Button */}
              <input
                type="file"
                id="documents-upload"
                multiple
                accept=".pdf,.doc,.docx,.txt,.md"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="documents-upload"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #555',
                  background: '#1a1a1a',
                  color: '#ccc',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 2 2h12a2 2 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Documents
              </label>

              {/* Brand Assets Button */}
              <input
                type="file"
                id="brand-assets-upload"
                multiple
                accept="image/*"
                onChange={handleBrandLogoUpload}
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="brand-assets-upload"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #555',
                  background: '#1a1a1a',
                  color: '#ccc',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Brand Assets
              </label>

              {/* Brand Colors Button */}
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={handleColorPopoverOpen}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #555',
                    background: '#1a1a1a',
                    color: '#ccc',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2a10 10 0 0 0 0 20c5.523 0 10-4.477 10-10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Brand Colors
                </button>

                {/* Color Popover */}
                {showColorPopover && (
                  <>
                    {/* Backdrop */}
                    <div 
                      onClick={handleColorPopoverClose}
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9998
                      }}
                    />
                    {/* Popover */}
                    <div style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      padding: '16px',
                      minWidth: '280px',
                      zIndex: 9999,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                    }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#ccc' }}>
                        Add Brand Colors (max 3)
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <input
                          type="color"
                          id="temp-color-picker"
                          style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        />
                        <button 
                          onClick={() => {
                            const colorInput = document.getElementById('temp-color-picker') as HTMLInputElement;
                            if (colorInput) {
                              handleTempColorAdd(colorInput.value);
                            }
                          }}
                          disabled={tempColors.length >= 3}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: '1px solid #555',
                            background: tempColors.length >= 3 ? '#333' : '#2a2a2a',
                            color: tempColors.length >= 3 ? '#666' : '#ccc',
                            cursor: tempColors.length >= 3 ? 'not-allowed' : 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Add Color
                        </button>
                      </div>
                      
                      {tempColors.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                          {tempColors.map((color, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: '#2a2a2a',
                              border: '1px solid #444',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: '#ccc'
                            }}>
                              <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: color, border: '1px solid #333' }}></div>
                              <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{color}</span>
                              <button 
                                onClick={() => handleTempColorRemove(index)}
                                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px' }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={handleColorPopoverClose}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #555',
                          background: 'transparent',
                          color: '#ccc',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleColorsSave}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          background: '#ec4899',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleInputSubmit}
              disabled={!inputValue.trim()}
              style={{
                color: '#ec4899',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12l4-4 4 4M12 16V8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          </div>
        </div>

        {/* Uploaded Files Summary */}
        {(uploadedFiles.length > 0 || brandAssets.logos.length > 0 || brandAssets.colors.length > 0) && (
          <div style={{ marginTop: '16px', marginBottom: '16px' }}>
            {uploadedFiles.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
                  Documents ({uploadedFiles.length})
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#ccc'
                    }}>
                      <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.name}
                      </span>
                      <button 
                        onClick={() => removeUploadedFile(index)}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '16px' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {brandAssets.logos.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
                  Brand Assets ({brandAssets.logos.length})
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {brandAssets.logos.map((file, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#ccc'
                    }}>
                      <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.name}
                      </span>
                      <button 
                        onClick={() => setBrandAssets(prev => ({ ...prev, logos: prev.logos.filter((_, i) => i !== index) }))}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '16px' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {brandAssets.colors.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
                  Brand Colors ({brandAssets.colors.length})
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {brandAssets.colors.map((color, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#ccc'
                    }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: color, border: '1px solid #333' }}></div>
                      <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{color}</span>
                      <button 
                        onClick={() => removeBrandColor(index)}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '16px' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggestion Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '24px'
        }}>
          {suggestionPills.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handlePillClick(suggestion)}
              style={{
                background: '#1a1a1a',
                border: '1px solid #333',
                color: '#ccc',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;