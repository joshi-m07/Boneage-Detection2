import type { PredictionResponse, AuthResponse } from './types';

export const API_BASE = '/api';

/** Build URL for Grad-CAM and other static files served by FastAPI under /storage */
export function gradcamSrc(gradcamPathOrUrl: string | undefined, cacheBust?: string): string {
  if (!gradcamPathOrUrl) return '';
  const path = gradcamPathOrUrl.startsWith('/')
    ? gradcamPathOrUrl
    : `/${gradcamPathOrUrl}`;
  const base = `${API_BASE}${path}`;
  if (!cacheBust) return base;
  const v = encodeURIComponent(cacheBust);
  return base.includes('?') ? `${base}&v=${v}` : `${base}?v=${v}`;
}

export function parseErrorMessage(raw: string): string {
  try {
    const j = JSON.parse(raw) as { detail?: unknown };
    if (typeof j.detail === 'string') return j.detail;
    if (Array.isArray(j.detail)) return JSON.stringify(j.detail);
    if (j.detail != null) return String(j.detail);
  } catch {
    /* plain text */
  }
  return raw.length > 400 ? `${raw.slice(0, 400)}…` : raw;
}

export async function predictBoneAge(
  patientId: string,
  gender: string,
  file: File
): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('patient_id', patientId.trim());
  formData.append('gender', gender);
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(parseErrorMessage(text) || `Request failed (${res.status})`);
  }

  return (await res.json()) as PredictionResponse;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(parseErrorMessage(text) || `Login failed (${res.status})`);
  }

  return (await res.json()) as AuthResponse;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(parseErrorMessage(text) || `Registration failed (${res.status})`);
  }

  return (await res.json()) as AuthResponse;
}
