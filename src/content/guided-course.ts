import {guidedCourseSchema} from '@compass/studio-kit/guided';
import course from '../../content/fa/guided-course.json';
export const guidedCourse=guidedCourseSchema.parse(course);
