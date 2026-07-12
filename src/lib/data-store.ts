export interface AppDataOverrides {
  hero?: {
    imageUrl: string;
    videoUrl: string | null;
    caption: string | null;
  };
  moments?: Record<string, {
    imageUrl: string;
    caption: string;
    description: string;
    aspect?: '3/4' | 'square' | '4/5' | '9/16' | '2/3';
  }>;
}

export async function fetchOverrides(): Promise<AppDataOverrides> {
  try {
    const res = await fetch(`/admin-overrides.json?t=${Date.now()}`);
    if (!res.ok) return {};
    return await res.json();
  } catch (err) {
    return {};
  }
}

export async function saveOverrides(data: AppDataOverrides): Promise<void> {
  const res = await fetch('/api/save-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data, null, 2),
  });
  if (!res.ok) throw new Error('Failed to save data');
}
