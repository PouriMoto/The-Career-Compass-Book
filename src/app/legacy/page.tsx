import {loadCourse} from '@/content/load-course';
import {JourneyApp} from '@/features/journey/journey-app';
import {PwaStatus} from '@/features/journey/pwa-status';
export default function Legacy(){return <><JourneyApp course={loadCourse()}/><div className="app-shell"><PwaStatus/></div></>;}
