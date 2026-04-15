// ─────────────────────────────────────────────
// Pagination & envelope types
// ─────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ApiSingleResponse<T> {
  data: T;
}

// ─────────────────────────────────────────────
// Content types
// ─────────────────────────────────────────────

export interface Blog {
  guid: string;
  short_title: string;
  long_title: string;
  short_description: string;
  long_description: string;
  status: string;
  /** HTML or markdown content for the full post body */
  content: string;
  author_name: string;
  author_bio: string;
  author_image: string;
  category: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Career {
  guid: string;
  title: string;
  description: string;
  duties: string;
  active: boolean;
  social_link: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Page {
  guid: string;
  slug: string;
  short_title: string;
  long_title: string;
  description: string;
  meta: string;
  membership_required: boolean;
  main_content_1: string;
  main_content_2: string;
  main_content_3: string;
  image_1: string;
  image_2: string;
  image_3: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PricingProduct {
  guid: string;
  title: string;
  description: string;
  popular: boolean;
  /** JSON array of feature strings */
  features: string[];
  price_month: number;
  price_year: number;
  stripe_id_monthly: string;
  stripe_id_yearly: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Menu {
  guid: string;
  label: string;
  icon: string;
  target: string;
  link: string;
  /** Order index */
  oid: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupportMessage {
  name: string;
  requester_email: string;
  subject: string;
  type: string;
  message: string;
}
