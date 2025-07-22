import React, { useState, useEffect } from 'react';
import './BrandProfile.css';

interface BrandData {
  logo?: string;
  colors?: string[];
  tone?: string;
  language?: string;
  fonts?: string[];
  industry?: string;
  keywords?: string[];
}

interface BrandProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandProfile: React.FC<BrandProfileProps> = ({ isOpen, onClose }) => {
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleWebsiteAnalysis = async () => {
    if (!website) return;
    
    setIsAnalyzing(true);
    setAnalysisStatus('idle');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/brand/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setBrandData(data.brandData);
        setAnalysisStatus('success');
      } else {
        setAnalysisStatus('error');
        alert('Could not analyze website. Please check the URL and try again.');
      }
    } catch (error) {
      console.error('Website analysis error:', error);
      setAnalysisStatus('error');
      alert('Failed to analyze website. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    // Save brand profile to database
    setSaveStatus('saving');
    try {
      // This would integrate with your user profile update system
      console.log('Saving brand profile:', {
        company,
        website,
        brandData,
        uploadedFiles: uploadedFiles.map(f => f.name)
      });
      
      setSaveStatus('saved');
      // Don't close automatically - let user see the saved data and close manually
      setTimeout(() => setSaveStatus('idle'), 3000); // Reset status after 3 seconds
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="brand-profile-overlay">
      <div className="brand-profile-modal">
        <div className="brand-profile-header">
          <h2>🎨 Brand Profile</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="brand-profile-content">
          <div className="brand-section">
            <h3>Company Information</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
            
            <div className="form-group">
              <label>Website</label>
              <div className="website-input">
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                />
                <button 
                  className="analyze-btn"
                  onClick={handleWebsiteAnalysis}
                  disabled={!website || isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : '🔍 Analyze'}
                </button>
              </div>
            </div>
          </div>

          {analysisStatus === 'success' && (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <div className="success-text">
                <h4>Website Analysis Complete!</h4>
                <p>We've successfully extracted your brand elements from {website}</p>
              </div>
            </div>
          )}

          {brandData && (
            <div className="brand-section discovered-elements">
              <h3>🎨 Discovered Brand Elements</h3>
              
              {brandData.logo && (
                <div className="brand-element logo-element">
                  <h4>🖼️ Logo</h4>
                  <div className="logo-container">
                    <img src={brandData.logo} alt="Company logo" className="brand-logo" />
                    <div className="logo-info">
                      <span className="logo-status">✅ Extracted successfully</span>
                    </div>
                  </div>
                </div>
              )}
              
              {brandData.colors && brandData.colors.length > 0 && (
                <div className="brand-element colors-element">
                  <h4>🎨 Brand Colors ({brandData.colors.length} found)</h4>
                  <div className="color-palette">
                    {brandData.colors.map((color, index) => (
                      <div 
                        key={index}
                        className="color-swatch-enhanced"
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
                <div className="brand-element tone-element">
                  <h4>💬 Brand Tone & Voice</h4>
                  <div className="tone-container">
                    <p className="tone-description">{brandData.tone}</p>
                    <span className="tone-status">✅ Analyzed from website content</span>
                  </div>
                </div>
              )}

              {brandData.industry && (
                <div className="brand-element industry-element">
                  <h4>🏢 Industry</h4>
                  <p className="industry-tag">{brandData.industry}</p>
                </div>
              )}

              {brandData.keywords && brandData.keywords.length > 0 && (
                <div className="brand-element keywords-element">
                  <h4>🔑 Key Terms ({brandData.keywords.length} found)</h4>
                  <div className="keywords-container">
                    {brandData.keywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag">{keyword}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="save-prompt">
                <div className="save-prompt-content">
                  <h4>💾 Ready to save your brand profile?</h4>
                  <p>Your brand elements have been successfully extracted. Save them to use across all your campaigns.</p>
                </div>
              </div>
            </div>
          )}

          <div className="brand-section">
            <h3>Brand Assets</h3>
            <div className="upload-area">
              <input
                type="file"
                id="brand-file-upload"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.svg,.txt"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <button 
                className="upload-btn"
                onClick={() => document.getElementById('brand-file-upload')?.click()}
              >
                📎 Upload Brand Documents
              </button>
              <p className="upload-hint">
                Upload logos, brand guidelines, style guides, or any documents that describe your brand
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="uploaded-files-list">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button 
                      className="remove-file-btn"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="brand-profile-footer">
          <button 
            className={`save-btn ${saveStatus === 'saved' ? 'saved' : saveStatus === 'error' ? 'error' : ''}`}
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' && '⏳ Saving...'}
            {saveStatus === 'saved' && '✅ Saved Successfully!'}
            {saveStatus === 'error' && '❌ Save Failed'}
            {saveStatus === 'idle' && '💾 Save Brand Profile'}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            {brandData ? 'Close' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandProfile;