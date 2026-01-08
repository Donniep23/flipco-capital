import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for API routes)
export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
};

// Database types
export interface InvestmentOpportunity {
  id: string;
  name: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  status_color: string;
  roi: number;
  projected_profit: number;
  purchase_price: number;
  renovation_budget: number;
  estimated_arv: number;
  timeline: string;
  image: string;
  investment_tiers: {
    bronze: number;
    silver: number;
    gold: number;
  };
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  experience: string;
  specialties: string[];
  linkedin: string;
  email: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContractorData {
  username: string;
  stats: {
    total_earnings: number;
    active_projects: number;
    completed_projects: number;
    average_rating: number;
    tasks_completed: number;
    pending_payments: number;
  };
  projects: any[];
  created_at?: string;
  updated_at?: string;
}

export interface InvestorPortfolio {
  id: string;
  investor_name: string;
  investor_email: string;
  total_invested: number;
  projects: any[];
  created_at?: string;
  updated_at?: string;
}
