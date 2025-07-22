import React from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  subscription_tier: 'free' | 'pro' | 'enterprise';
}

interface Campaign {
  id: string;
  title: string;
  type: 'facebook_ad' | 'landing_page' | 'email_campaign' | 'social_media';
  status: 'draft' | 'in_progress' | 'completed' | 'launched';
  created_at: string;
  updated_at: string;
  thumbnail?: string;
  description: string;
}

interface Task {
  id: string;
  campaign_id: string;
  title: string;
  type: 'generation' | 'review' | 'optimization' | 'deployment';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  result_summary?: string;
}

interface AuthenticatedHomepageProps {
  user: User;
  campaigns: Campaign[];
  recentTasks: Task[];
  onNewCampaign: () => void;
  onCampaignClick: (campaign: Campaign) => void;
}

const AuthenticatedHomepage: React.FC<AuthenticatedHomepageProps> = ({
  user,
  campaigns,
  recentTasks,
  onNewCampaign,
  onCampaignClick
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white',
      padding: '24px'
    }}>
      {/* Quick Start Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '48px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Welcome back, {user.name || user.email}!
        </h1>
        
        <div style={{
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Start a New Campaign
          </h2>
          <button
            onClick={onNewCampaign}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Create New Campaign
          </button>
        </div>
      </div>

      {/* Campaign History */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '48px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          Recent Campaigns
        </h2>
        
        {campaigns.length === 0 ? (
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', marginBottom: '16px' }}>
              You haven't created any campaigns yet.
            </p>
            <button
              onClick={onNewCampaign}
              style={{
                padding: '12px 24px',
                background: '#ec4899',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Create Your First Campaign
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => onCampaignClick(campaign)}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  border: '1px solid #333',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ec4899';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {campaign.title}
                </h3>
                <p style={{
                  color: '#888',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  {campaign.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {new Date(campaign.created_at).toLocaleDateString()}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: campaign.status === 'completed' ? '#22c55e' : 
                              campaign.status === 'in_progress' ? '#f59e0b' : '#6b7280',
                    color: 'white'
                  }}>
                    {campaign.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Tasks */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          Recent Activity
        </h2>
        
        {recentTasks.length === 0 ? (
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888' }}>
              No recent activity to show.
            </p>
          </div>
        ) : (
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '24px'
          }}>
            {recentTasks.map((task, index) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 0',
                  borderBottom: index < recentTasks.length - 1 ? '1px solid #333' : 'none'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: task.status === 'completed' ? '#22c55e' : 
                            task.status === 'in_progress' ? '#f59e0b' : '#6b7280'
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '14px',
                    marginBottom: '4px'
                  }}>
                    {task.title}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {new Date(task.created_at).toLocaleString()}
                  </p>
                </div>
                <span style={{
                  fontSize: '12px',
                  color: '#888',
                  textTransform: 'capitalize'
                }}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticatedHomepage;