import { z } from 'zod';
import { parse } from 'yaml';

const scene = z.object({ id: z.string().min(1), kind: z.enum(['exercise','visualization','reflection']), title: z.string().min(1), prompt: z.string().min(1), minLength: z.number().int().positive().default(3) });
export const courseSchema = z.object({
  id: z.string().min(1), version: z.number().int().positive(), title: z.string(), description: z.string(),
  labels: z.record(z.string(), z.string()),
  stages: z.array(z.object({ id: z.string(), title: z.string(), subtitle: z.string(), available: z.boolean(), scenes: z.array(scene) })).min(1),
}).superRefine((course, ctx) => {
  const ids = new Set<string>();
  for (const stage of course.stages) {
    if (ids.has(stage.id)) ctx.addIssue({code:'custom', message:'Duplicate stage id'});
    ids.add(stage.id);
    if (stage.available && stage.scenes.map(s=>s.kind).join(',') !== 'exercise,visualization,reflection') ctx.addIssue({code:'custom', message:'Available stages require exercise, visualization, reflection in order'});
    const scenes = new Set<string>();
    for (const s of stage.scenes) { if(scenes.has(s.id)) ctx.addIssue({code:'custom',message:'Duplicate scene id'}); scenes.add(s.id); }
  }
});
export type Course = z.infer<typeof courseSchema>;
export type Stage = Course['stages'][number];
export function parseCourse(source: string): Course { return courseSchema.parse(parse(source)); }
