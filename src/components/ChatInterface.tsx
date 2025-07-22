import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import BrandProfile from './BrandProfile';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'thinking' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  icon?: string;
}

interface ChatInterfaceProps {
  initialPrompt: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialPrompt, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showBrandProfile, setShowBrandProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Initialize with user's request
  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: '1',
      type: 'user',
      content: initialPrompt,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    // Start processing after a brief delay
    setTimeout(() => {
      startAIProcessing();
    }, 1000);
  }, [initialPrompt]);

  const startAIProcessing = async () => {
    setIsThinking(true);
    
    // Add thinking message
    const thinkingMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'thinking',
      content: 'Analyzing your request and planning the marketing campaign...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, thinkingMessage]);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsThinking(false);

    // Start workflow steps
    const steps = generateWorkflowSteps(initialPrompt);
    setWorkflowSteps(steps);
    setIsProcessing(true);

    // Add system message about starting workflow
    const systemMessage: ChatMessage = {
      id: Date.now().toString() + '_system',
      type: 'system',
      content: `I need to build your marketing campaign. Based on your request, I'll need to complete ${steps.length} key steps:`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev.filter(m => m.type !== 'thinking'), systemMessage]);

    // Process each step
    for (let i = 0; i < steps.length; i++) {
      await processWorkflowStep(steps[i], i);
    }

    // Complete the workflow
    setIsProcessing(false);
    const completionMessage: ChatMessage = {
      id: Date.now().toString() + '_complete',
      type: 'assistant',
      content: '🎉 Your marketing campaign is ready! I\'ve analyzed your requirements, conducted market research, developed a comprehensive strategy, generated content, and optimized everything for maximum impact. Would you like me to show you the results or make any adjustments?',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, completionMessage]);
  };

  const processWorkflowStep = async (step: WorkflowStep, index: number) => {
    // Update step to running
    setWorkflowSteps(prev => 
      prev.map((s, i) => i === index ? { ...s, status: 'running' } : s)
    );

    // Add step message
    const stepMessage: ChatMessage = {
      id: `step_${index}`,
      type: 'assistant',
      content: `${step.icon} **${step.name}**\n${step.description}`,
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages(prev => [...prev, stepMessage]);

    // Simulate processing time with streaming effect
    const processingTime = 3000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Complete the step
    setWorkflowSteps(prev => 
      prev.map((s, i) => i === index ? { ...s, status: 'completed' } : s)
    );

    // Update message to show completion
    setMessages(prev => 
      prev.map(m => 
        m.id === `step_${index}` 
          ? { ...m, content: `${step.icon} **${step.name}** ✅\n${step.description}\n\n*Completed successfully*`, isStreaming: false }
          : m
      )
    );
  };

  const generateWorkflowSteps = (prompt: string): WorkflowStep[] => {
    let steps = [
      {
        id: '1',
        name: 'Request Analysis',
        description: 'Understanding your marketing objectives and target audience',
        status: 'pending' as const,
        icon: '🔍'
      },
      {
        id: '2',
        name: 'Market Research',
        description: 'Gathering industry insights and competitive intelligence',
        status: 'pending' as const,
        icon: '📊'
      },
      {
        id: '3',
        name: 'Strategy Development',
        description: 'Creating comprehensive marketing framework and approach',
        status: 'pending' as const,
        icon: '🎯'
      },
      {
        id: '4',
        name: 'Content Generation',
        description: 'Producing marketing copy, visuals, and campaign materials',
        status: 'pending' as const,
        icon: '✨'
      },
      {
        id: '5',
        name: 'Campaign Optimization',
        description: 'Fine-tuning strategy for maximum ROI and impact',
        status: 'pending' as const,
        icon: '🚀'
      }
    ];

    // Customize based on prompt type
    if (prompt.toLowerCase().includes('brand monitoring')) {
      steps[1] = {
        ...steps[1],
        name: 'Social Media Scanning',
        description: 'Monitoring brand mentions across Twitter, Reddit, news, and forums',
        icon: '👁️'
      };
      steps[3] = {
        ...steps[3],
        name: 'Sentiment Analysis',
        description: 'Analyzing brand perception and identifying trending topics',
        icon: '💭'
      };
    } else if (prompt.toLowerCase().includes('email')) {
      steps[2] = {
        ...steps[2],
        name: 'Email Classification',
        description: 'Categorizing emails and extracting key metadata',
        icon: '📧'
      };
      steps[3] = {
        ...steps[3],
        name: 'Response Templates',
        description: 'Creating personalized email response templates',
        icon: '📝'
      };
    }

    return steps;
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      const aiResponse: ChatMessage = {
        id: Date.now().toString() + '_ai',
        type: 'assistant',
        content: 'I understand your request. Let me help you with that...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Add a message about uploaded files
    const fileMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'system',
      content: `📎 Uploaded ${files.length} brand asset${files.length > 1 ? 's' : ''}: ${files.map(f => f.name).join(', ')}. I'll use these to understand your brand better.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fileMessage]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      {/* Left Sidebar - Context */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <button className="back-button" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="project-info">
            <h3>Marketing Campaign Builder</h3>
            <p>AI-powered campaign generation</p>
          </div>
        </div>

        <div className="context-section">
          <h4>Executive Summary</h4>
          <div className="context-item">
            <strong>Objective:</strong> Build comprehensive marketing campaign
          </div>
          <div className="context-item">
            <strong>Request:</strong> {initialPrompt.substring(0, 100)}...
          </div>
          <div className="context-item">
            <strong>Status:</strong> {isProcessing ? 'In Progress' : 'Ready'}
          </div>
        </div>

        <div className="context-section">
          <h4>Problem Statement</h4>
          <ul className="problem-list">
            <li>Need comprehensive marketing strategy</li>
            <li>Require targeted content generation</li>
            <li>Must optimize for maximum ROI</li>
            <li>Ensure brand consistency</li>
          </ul>
        </div>

        <div className="context-section">
          <h4>Goals & KPIs</h4>
          <div className="goal-item">
            <span className="goal-label">Primary Goal:</span>
            <span className="goal-value">Campaign Launch</span>
          </div>
          <div className="goal-item">
            <span className="goal-label">Success Metric:</span>
            <span className="goal-value">ROI Optimization</span>
          </div>
        </div>

        <div className="context-section">
          <h4>Chat History</h4>
          <div className="chat-history">
            <div className="history-item active">
              <div className="history-title">Current Campaign</div>
              <div className="history-preview">{initialPrompt.substring(0, 40)}...</div>
            </div>
            <div className="history-item">
              <div className="history-title">Brand Monitoring</div>
              <div className="history-preview">Monitor social media mentions...</div>
            </div>
            <div className="history-item">
              <div className="history-title">Email Campaign</div>
              <div className="history-preview">Create email marketing strategy...</div>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="profile-button" onClick={() => setShowBrandProfile(true)}>
            <div className="profile-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="profile-info">
              <div className="profile-name">User</div>
              <div className="profile-status">Free Plan</div>
            </div>
          </button>
        </div>
      </div>

      {/* Middle - Chat */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="header-info">
            <h3>Campaign Builder</h3>
            <span className="status-indicator">
              {isProcessing ? '🔄 Building...' : '✅ Ready'}
            </span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              {message.type === 'thinking' && (
                <div className="thinking-indicator">
                  <div className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="thinking-text">{message.content}</span>
                </div>
              )}
              
              {message.type === 'user' && (
                <div className="user-message">
                  <div className="message-content">{message.content}</div>
                </div>
              )}
              
              {(message.type === 'assistant' || message.type === 'system') && (
                <div className="assistant-message">
                  <div className="message-content">
                    {message.content.split('\n').map((line, i) => (
                      <div key={i}>
                        {line.startsWith('**') && line.endsWith('**') ? (
                          <strong>{line.slice(2, -2)}</strong>
                        ) : line.startsWith('*') && line.endsWith('*') ? (
                          <em>{line.slice(1, -1)}</em>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                  {message.isStreaming && (
                    <div className="streaming-indicator">
                      <div className="pulse-dot"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Workflow Steps Progress */}
          {workflowSteps.length > 0 && (
            <div className="workflow-progress">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className={`progress-step ${step.status}`}>
                  <div className="step-indicator">
                    {step.status === 'completed' ? '✅' : 
                     step.status === 'running' ? '⏳' : '⭕'}
                  </div>
                  <div className="step-info">
                    <span className="step-name">{step.name}</span>
                    <span className="step-desc">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isThinking && (
            <div className="message thinking">
              <div className="thinking-indicator">
                <div className="thinking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="thinking-text">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="input-wrapper">
            <div className="input-actions">
              <button 
                className="upload-button"
                onClick={() => document.getElementById('file-upload')?.click()}
                title="Upload brand assets (images, PDFs, documents)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.svg,.txt"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
            <textarea
              className="chat-input"
              placeholder="Type a message or upload brand assets..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!currentInput.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <h4>📎 Brand Assets</h4>
              <div className="file-list">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{(file.size / 1024).toFixed(1)}KB</span>
                    </div>
                    <button 
                      className="remove-file"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Canvas/Output */}
      <div className="canvas-area">
        <div className="canvas-header">
          <div className="canvas-tabs">
            <button className="canvas-tab active">Preview</button>
            <button className="canvas-tab">Export</button>
          </div>
        </div>
        
        <div className="canvas-content">
          {isProcessing ? (
            <div className="canvas-loading">
              <div className="loading-animation">
                <div className="loading-spinner"></div>
                <h3>Creating Your Campaign...</h3>
                <p>AI is analyzing your requirements and generating content</p>
              </div>
            </div>
          ) : (
            <div className="campaign-output">
              <div className="output-section">
                <h3>🎯 Campaign Overview</h3>
                <div className="campaign-card">
                  <div className="campaign-type">
                    {initialPrompt.toLowerCase().includes('facebook') ? '📘 Facebook Ad Campaign' :
                     initialPrompt.toLowerCase().includes('google') ? '🔍 Google Display Campaign' :
                     initialPrompt.toLowerCase().includes('linkedin') ? '💼 LinkedIn Carousel' :
                     initialPrompt.toLowerCase().includes('instagram') ? '📸 Instagram Reel Script' :
                     initialPrompt.toLowerCase().includes('email') ? '📧 Email Campaign' :
                     '🚀 Multi-Platform Campaign'}
                  </div>
                  <div className="campaign-details">
                    <div className="detail-item">
                      <span className="label">Target Audience:</span>
                      <span className="value">Marketing professionals, 25-45</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Budget Range:</span>
                      <span className="value">$1,000 - $5,000</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Duration:</span>
                      <span className="value">2-4 weeks</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="output-section">
                <h3>📝 Generated Content</h3>
                <div className="content-preview">
                  {initialPrompt.toLowerCase().includes('facebook') && (
                    <div className="facebook-ad-preview">
                      <div className="ad-header">
                        <div className="brand-info">
                          <div className="brand-avatar">B</div>
                          <div>
                            <div className="brand-name">Your Brand</div>
                            <div className="sponsored">Sponsored</div>
                          </div>
                        </div>
                      </div>
                      <div className="ad-content">
                        <div className="ad-text">
                          🚀 Transform your marketing with AI-powered campaigns that deliver results! 
                          Get professional-grade ads, landing pages, and content in minutes, not days.
                        </div>
                        <div className="ad-image-placeholder">
                          [Campaign Visual - Generated based on your brand]
                        </div>
                        <div className="ad-cta">
                          <button className="cta-button">Get Started Free</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {initialPrompt.toLowerCase().includes('google') && (
                    <div className="google-ad-preview">
                      <div className="display-ad">
                        <div className="ad-headline">AI-Powered Marketing Campaigns</div>
                        <div className="ad-description">
                          Create professional campaigns in minutes. Get ads, landing pages, and content optimized for your brand.
                        </div>
                        <div className="ad-visual-placeholder">
                          [Display Banner - 728x90]
                        </div>
                        <div className="ad-url">yoursite.com</div>
                      </div>
                    </div>
                  )}

                  {initialPrompt.toLowerCase().includes('linkedin') && (
                    <div className="linkedin-carousel-preview">
                      <div className="carousel-slide">
                        <div className="slide-number">Slide 1 of 6</div>
                        <div className="slide-content">
                          <h4>🎯 Hook: The Marketing Problem</h4>
                          <p>Are you spending weeks creating campaigns that underperform?</p>
                        </div>
                      </div>
                      <div className="carousel-navigation">
                        <button>← Prev</button>
                        <span>1/6</span>
                        <button>Next →</button>
                      </div>
                    </div>
                  )}

                  {initialPrompt.toLowerCase().includes('instagram') && (
                    <div className="instagram-reel-preview">
                      <div className="reel-script">
                        <div className="script-section">
                          <div className="timestamp">0-3s</div>
                          <div className="script-content">
                            <strong>Hook:</strong> "Stop wasting time on campaigns that don't convert!"
                          </div>
                        </div>
                        <div className="script-section">
                          <div className="timestamp">3-10s</div>
                          <div className="script-content">
                            <strong>Problem:</strong> Show frustrated marketer at computer
                          </div>
                        </div>
                        <div className="script-section">
                          <div className="timestamp">10-25s</div>
                          <div className="script-content">
                            <strong>Solution:</strong> Demonstrate AI creating perfect campaign
                          </div>
                        </div>
                        <div className="script-section">
                          <div className="timestamp">25-30s</div>
                          <div className="script-content">
                            <strong>CTA:</strong> "Try it free - link in bio!"
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!initialPrompt.toLowerCase().includes('facebook') && 
                   !initialPrompt.toLowerCase().includes('google') && 
                   !initialPrompt.toLowerCase().includes('linkedin') && 
                   !initialPrompt.toLowerCase().includes('instagram') && (
                    <div className="generic-campaign-preview">
                      <div className="campaign-elements">
                        <div className="element-card">
                          <h4>📧 Email Sequence</h4>
                          <p>5-part welcome series with personalized content</p>
                        </div>
                        <div className="element-card">
                          <h4>📱 Social Media Posts</h4>
                          <p>14 days of engaging content across platforms</p>
                        </div>
                        <div className="element-card">
                          <h4>🎯 Landing Page</h4>
                          <p>Conversion-optimized page with A/B test variants</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="output-section">
                <h3>🔧 Next Steps</h3>
                <div className="next-steps">
                  <div className="step-card">
                    <div className="step-icon">🔗</div>
                    <div className="step-content">
                      <h4>Connect Your Accounts</h4>
                      <p>Link Facebook Ads Manager, Google Ads, or other platforms to deploy directly</p>
                      <button className="step-button">Connect Accounts</button>
                    </div>
                  </div>
                  <div className="step-card">
                    <div className="step-icon">📊</div>
                    <div className="step-content">
                      <h4>Review & Customize</h4>
                      <p>Fine-tune the generated content to match your brand voice</p>
                      <button className="step-button">Customize Content</button>
                    </div>
                  </div>
                  <div className="step-card">
                    <div className="step-icon">🚀</div>
                    <div className="step-content">
                      <h4>Launch Campaign</h4>
                      <p>Deploy your campaign across selected platforms</p>
                      <button className="step-button primary">Launch Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brand Profile Modal */}
      <BrandProfile
        isOpen={showBrandProfile}
        onClose={() => setShowBrandProfile(false)}
      />
    </div>
  );
};

export default ChatInterface;