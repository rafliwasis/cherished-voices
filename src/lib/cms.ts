import { supabase, supabasePublic } from './supabase';
import type { MomentItem, Testimonial } from '../types';

export interface MomentRow extends MomentItem {
  sortOrder: number;
}

export const HERO_VIDEO_PATH = 'videos/hero-video.mp4';

export function getHeroVideoUrl(): string {
  return supabasePublic.storage.from('hero-media').getPublicUrl(HERO_VIDEO_PATH).data.publicUrl;
}

export async function uploadHeroVideo(file: File): Promise<string> {
  const { error } = await supabase.storage
    .from('hero-media')
    .upload(HERO_VIDEO_PATH, file, {
      upsert: true,
      contentType: file.type,
      cacheControl: 'no-cache',
    });
  if (error) throw error;
  return getHeroVideoUrl();
}

export async function heroVideoExists(): Promise<boolean> {
  const { data, error } = await supabase.storage.from('hero-media').list('videos');
  if (error || !data) return false;
  return data.length > 0;
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

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabasePublic
    .from('testimonials')
    .select('id, name, quote, photo_url, sort_order')
    .order('sort_order', { ascending: true });

  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    quote: row.quote,
    photoUrl: row.photo_url ?? undefined,
  }));
}

export async function saveTestimonial(testimonial: {
  id?: string;
  name: string;
  quote: string;
  photoUrl?: string;
  sortOrder: number;
}): Promise<void> {
  const payload = {
    name: testimonial.name,
    quote: testimonial.quote,
    photo_url: testimonial.photoUrl ?? null,
    sort_order: testimonial.sortOrder,
  };

  const { error } = testimonial.id
    ? await supabase.from('testimonials').update(payload).eq('id', testimonial.id)
    : await supabase.from('testimonials').insert(payload);

  if (error) throw error;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

export const ABOUT_VIDEO_PATH = 'videos/about-video.mp4';

export function getAboutVideoUrl(): string {
  return supabasePublic.storage.from('about-media').getPublicUrl(ABOUT_VIDEO_PATH).data.publicUrl;
}

export async function uploadAboutVideo(file: File): Promise<string> {
  const { error } = await supabase.storage
    .from('about-media')
    .upload(ABOUT_VIDEO_PATH, file, {
      upsert: true,
      contentType: file.type,
      cacheControl: 'no-cache',
    });
  if (error) throw error;
  return getAboutVideoUrl();
}

export async function aboutVideoExists(): Promise<boolean> {
  const { data, error } = await supabase.storage.from('about-media').list('videos');
  if (error || !data) return false;
  return data.length > 0;
}
