import type {
  Blog,
  Career,
  Menu,
  Page,
  PricingProduct,
  ApiListResponse,
} from '../types/api';

// ─────────────────────────────────────────────
// Base fetch — server-side uses API_URL
// ─────────────────────────────────────────────

function apiBase(): string {
  return import.meta.env.API_URL ?? 'http://localhost:1337';
}

async function apiFetch<T>(path: string): Promise<T> {
  const url = `${apiBase()}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error ${res.status} fetching ${url}`);
  }
  return res.json() as Promise<T>;
}

// ─────────────────────────────────────────────
// Menus
// ─────────────────────────────────────────────

export async function getMenus(): Promise<Menu[]> {
  const res = await apiFetch<ApiListResponse<Menu>>('/api/menus');
  return (res.data ?? []).sort((a, b) => (a.oid ?? 0) - (b.oid ?? 0));
}

// ─────────────────────────────────────────────
// Blogs
// ─────────────────────────────────────────────

export async function getBlogs(pageSize = 25): Promise<Blog[]> {
  const res = await apiFetch<ApiListResponse<Blog>>(`/api/blogs?pageSize=${pageSize}`);
  return res.data ?? [];
}

export async function getBlogByGuid(guid: string): Promise<Blog | null> {
  const res = await apiFetch<ApiListResponse<Blog>>(
    `/api/blogs?filters[guid][$eq]=${encodeURIComponent(guid)}`
  );
  const items = res.data ?? [];
  return items[0] ?? null;
}

// ─────────────────────────────────────────────
// Careers
// ─────────────────────────────────────────────

export async function getActiveCareers(): Promise<Career[]> {
  const res = await apiFetch<ApiListResponse<Career>>(
    '/api/careers?filters[active][$eq]=true'
  );
  return res.data ?? [];
}

// ─────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const res = await apiFetch<ApiListResponse<Page>>(
    `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  const items = res.data ?? [];
  return items[0] ?? null;
}

// ─────────────────────────────────────────────
// Pricing products
// ─────────────────────────────────────────────

export async function getPricingProducts(): Promise<PricingProduct[]> {
  const res = await apiFetch<ApiListResponse<PricingProduct>>('/api/pricing-products');
  return res.data ?? [];
}
