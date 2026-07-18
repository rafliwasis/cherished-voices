import { supabase, supabasePublic } from './supabase';
import type { MomentItem } from '../types';

export interface HeroContent {
  imageUrl: string;
  videoUrl: string | null;
  caption: string | null;
}

export interface MomentRow extends MomentItem {
  sortOrder: number;
}

export async function getHero(): Promise<HeroContent | null> {
  const { data, error } = await supabasePublic
    .from('hero_highlights')
    .select('image_url, video_url, caption')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return { imageUrl: data.image_url, videoUrl: data.video_url, caption: data.caption };
}

export async function saveHero(content: HeroContent): Promise<void> {
  const { data: existing } = await supabase
    .from('hero_highlights')
    .select('id')
    .eq('is_active', true)
    .limit(1)
    .maybeSingle();

  const payload = {
    image_url: content.imageUrl,
    video_url: content.videoUrl,
    caption: content.caption,
    is_active: true,
  };

  const { error } = existing
    ? await supabase.from('hero_highlights').update(payload).eq('id', existing.id)
    : await supabase.from('hero_highlights').insert(payload);

  if (error) throw error;
}

export async function getMoments(): Promise<MomentRow[]> {
  const { data, error } = await supabasePublic
    .from('moments')
    .select('id, image_url, caption, description, aspect, sort_order')
    .order('sort_order', { ascending: true });

  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    imageUrl: row.image_url,
    caption: row.caption,
    description: row.description ?? undefined,
    aspect: row.aspect as MomentItem['aspect'],
    sortOrder: row.sort_order,
  }));
}

export async function saveMoment(moment: {
  id?: string;
  imageUrl: string;
  caption: string;
  description: string;
  aspect: MomentItem['aspect'];
  sortOrder: number;
}): Promise<void> {
  const payload = {
    image_url: moment.imageUrl,
    caption: moment.caption,
    description: moment.description,
    aspect: moment.aspect,
    sort_order: moment.sortOrder,
  };

  const { error } = moment.id
    ? await supabase.from('moments').update(payload).eq('id', moment.id)
    : await supabase.from('moments').insert(payload);

  if (error) throw error;
}

export async function deleteMoment(id: string): Promise<void> {
  const { error } = await supabase.from('moments').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadMedia(bucket: string, path: string, file: File): Promise<string> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
