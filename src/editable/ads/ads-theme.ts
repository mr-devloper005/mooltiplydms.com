// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

export const adSkin: AdSkin = {
  radius: '16px',
  border: '1px solid rgba(255,255,255,0.06)',
  shadow: '0 8px 30px rgba(0,0,0,0.4)',
  background: '#111827',
  labelClassName: 'bg-[#38bdf8] text-[#080c18]',
}

export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '12px', shadow: 'none', border: '1px solid rgba(255,255,255,0.08)' },
  popup: { radius: '24px' },
  header: { radius: '20px', background: '#0d1224' },
  rail: { radius: '14px' },
  feature: { radius: '18px' },
  interstitial: { radius: '20px', shadow: '0 20px 60px rgba(0,0,0,0.6)' },
  anchor: { radius: '12px', shadow: '0 6px 24px rgba(0,0,0,0.4)' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
