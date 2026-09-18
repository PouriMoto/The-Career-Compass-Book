import {test,expect} from '@playwright/test';
import {guidedCourse as course} from '../../src/content/guided-course';
test('all nine workbooks finish; answers and reports survive reload',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:course[0].steps[0].title})).toBeVisible();
 for(let index=0;index<course.length;index++){
  const stage=course[index];for(const step of stage.steps){
   await expect(page.getByRole('heading',{name:step.title,exact:true})).toBeVisible();
   if(step.kind==='review')await page.getByRole('button',{name:'این نقشه را مرور کردم',exact:true}).click();
   else if(step.kind==='rank')await page.getByRole('button',{name:'این ترتیب را تأیید می‌کنم'}).click();
   else if(step.kind==='scale')await page.locator('.scale-row button').nth(2).click();
   else if(step.kind==='wheel')await page.locator('.wheel-fields select').first().selectOption('3');
   else if(step.kind==='items'){await page.getByLabel('پاسخ کوتاه').fill('نمونه شخصی برای بررسی مسیر');await page.getByRole('button',{name:'افزودن',exact:true}).click();}
   else await page.locator('.choice-grid button').first().click();
   await page.locator('.step-controls .next-step').click();
  }
  await expect(page.locator('.report-toolbar h1')).toHaveText('نقشه این فصل');
  if(index<8)await page.getByRole('button',{name:'فصل بعدی'}).click();
 }
 await page.reload();await page.getByRole('button',{name:'اطلس من'}).click();await expect(page.locator('.report-sheet')).toHaveCount(9);await expect(page.locator('.report-sheet>p').filter({hasText:'مرور شده'})).toHaveCount(9);
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'پشتیبان JSON',exact:true}).click();expect((await download).suggestedFilename()).toContain('guided-v2');
});
test('responsive first page, choices persist, offline cold open',async({page,context})=>{
 await page.goto('/');await page.locator('.choice-grid button').nth(1).click();await expect(page.locator('.save-indicator')).toHaveText('ذخیره شد');await page.screenshot({path:'docs/guided-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'docs/guided-desktop.png',fullPage:true});
 await page.evaluate(()=>navigator.serviceWorker.ready.then(()=>true));await page.close();await context.setOffline(true);const offline=await context.newPage();await offline.goto('/');await expect(offline.locator('.choice-grid button').nth(1)).toHaveAttribute('aria-pressed','true');expect(await offline.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
