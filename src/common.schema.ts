import { z } from 'zod';

//NOTE: webサイトの入力フォームのスキーマ
export const WebSchema = z.object({
  nowMood: z.string(),
  genre: z.string(),
  comment: z.string().optional(),
});
export type WebSchema = z.infer<typeof WebSchema>;

export const MusicQuerySchema = z.object({
  recipeName: z.string()
}).array();

export type MusicQuerySchema = z.infer<typeof MusicQuerySchema>;