import fs from 'node:fs';
import path from 'node:path';
import { parse, stringify } from 'yaml';
import { parseCourse } from '@compass/studio-kit/content';
export function loadCourse(){
  const root=path.join(process.cwd(),'content/fa');
  const manifest=parse(fs.readFileSync(path.join(root,'course.yml'),'utf8'));
  const first=parse(fs.readFileSync(path.join(root,'stages/stage-01-setting-out.yml'),'utf8'));
  manifest.stages[0].scenes=first.scenes;
  return parseCourse(stringify(manifest));
}
