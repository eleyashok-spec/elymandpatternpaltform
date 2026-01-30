
export enum SubscriptionPlan {
  FREE = 'Free',
  BASIC = 'Basic',
  PRO = 'Pro',
  ALL_ACCESS = 'All Access',
  ENTERPRISE = 'Enterprise'
}

export enum SubscriptionStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending'
}

export enum PatternStatus {
  PUBLISHED = 'Published',
  DRAFT = 'Draft',
  ARCHIVED = 'Archived'
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  subscriptionId?: string;
  name: string;
  createdAt: string;
  isVerified: boolean;
  profileImage?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  isCancelled?: boolean;
}

export interface Pattern {
  id: string;
  title: string;
  description: string;
  category: string;
  status: PatternStatus;
  thumbnail: string;
  downloadUrl: string;
  createdAt: string;
  tags?: string[];
  formats: string[];
}

export interface MotionVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  resolution: string;
  fps: string;
  format: string;
  thumbnail: string;
  previewUrl: string; // URL for watermarked video
  downloadUrl: string; // URL for original master file
  isLooping: boolean;
  hasAlpha: boolean;
  createdAt?: string;
  tags?: string[];
}

export interface DownloadLog {
  id: string;
  userId: string;
  assetId: string;
  assetType: 'pattern' | 'motion';
  timestamp: string;
  ip: string;
}

export interface AuthState {
  user: User | null;
  subscription: Subscription | null;
  isAuthenticated: boolean;
}
