
import { Pattern, PatternStatus, User, Subscription, SubscriptionPlan, SubscriptionStatus, MotionVideo } from './types';

// Production environment: No mock data is pre-loaded. 
// Assets are fetched dynamically from the Supabase database.
export const MOCK_PATTERNS: Pattern[] = [];
export const MOCK_MOTION_VIDEOS: MotionVideo[] = [];

// Default fallback values (not used for data rendering, only for type initializers if needed)
export const DEFAULT_USER_ROLE: 'user' | 'admin' = 'user';
