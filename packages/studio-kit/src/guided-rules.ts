import type {GuidedState,GuidedStage} from './guided';
import {stageFacts} from './guided';
export interface GuidedInsight {id:string;text:string;evidence:string[];}
export function guidedInsights(stage:GuidedStage,state:GuidedState):GuidedInsight[]{
 const facts=stageFacts(stage,state);const result:GuidedInsight[]=[];const unknown=facts.filter(f=>f.answer?.status==='unknown');
 if(unknown.length)result.push({id:'unknown-fields',text:`${unknown.length} بخش را برای مرور بعدی باز گذاشته‌ای. لازم نیست برای پیش‌رفتن پاسخ ساختگی بدهی.`,evidence:unknown.map(f=>f.id)});
 const answers=Object.fromEntries(facts.map(f=>[f.id,f.answer]));
 if(stage.id==='setting-out'&&answers.capacity?.values.includes('یک نوبت کوتاه')&&answers.horizon?.values.includes('چند هفته آینده'))result.push({id:'small-step',text:'افق نزدیک و وقت محدود انتخاب کردی؛ یک اقدام کوچک‌تر می‌تواند نقطه شروع قابل مرور باشد.',evidence:['capacity','horizon']});
 if(stage.id==='setting-out'&&answers.obstacles?.values.includes('اطلاعات ناکافی'))result.push({id:'research',text:'اطلاعات ناکافی را مانع دانستی. می‌توانی یک سؤال تحقیق را به قدم بعدی تبدیل کنی.',evidence:['obstacles']});
 if(stage.id==='wheel'){const now=answers.now?.numbers??{},future=answers.future?.numbers??{};for(const name of Object.keys(now)){if(future[name]!==undefined&&future[name]>now[name])result.push({id:`gap-${name}`,text:`در «${name}» وضعیت فعلی ${now[name]} و مطلوب ${future[name]} ثبت شده؛ این فاصله خوداظهاری است، نه اولویت خودکار.`,evidence:['now','future']});}}
 if(!result.length)result.push({id:'summary',text:'این تصویر فقط انتخاب‌ها و یادداشت‌های خودت را کنار هم قرار می‌دهد؛ معنای آن را هنگام بازتاب تأیید یا اصلاح کن.',evidence:facts.filter(f=>f.answer).map(f=>f.id)});
 return result;
}
