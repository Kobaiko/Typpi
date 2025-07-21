import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  company?: string;
  industry?: string;
  subscription_tier: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  preview?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  type: 'user' | 'assistant' | 'system' | 'thinking';
  content: string;
  metadata: any;
  created_at: string;
}

export interface Workflow {
  id: string;
  session_id?: string;
  user_id: string;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  current_step: number;
  steps: any[];
  result?: any;
  error?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const signUp = async (
  email: string, 
  password: string, 
  fullName: string, 
  company?: string, 
  website?: string, 
  brandData?: any
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company,
        website,
        brand_data: brandData
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Chat helpers
export const getChatSessions = async (): Promise<ChatSession[]> => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createChatSession = async (title: string, preview?: string): Promise<ChatSession> => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({ title, preview })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getChatMessages = async (sessionId: string): Promise<ChatMessage[]> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

export const createChatMessage = async (
  sessionId: string, 
  type: ChatMessage['type'], 
  content: string, 
  metadata?: any
): Promise<ChatMessage> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      type,
      content,
      metadata: metadata || {}
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Profile helpers
export const getProfile = async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) return null;
  return data;
};

export const updateProfile = async (updates: Partial<Profile>): Promise<Profile> => {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};