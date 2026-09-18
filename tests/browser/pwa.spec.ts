import {test,expect} from '@playwright/test';
test('cold offline reopen preserves answers and complete shell',async({page,context})=>{
  await page.goto('/legacy');await page.evaluate(()=>navigator.serviceWorker.ready.then(()=>true));
  await page.getByRole('button',{name:'شروع سفر'}).click();await page.locator('textarea').fill('پاسخ پایدار برای بازگشت آفلاین');await expect(page.locator('.save-status')).toContainText('ذخیره‌اند');
  await page.close();await context.setOffline(true);const offline=await context.newPage();await offline.goto('/legacy');await offline.getByRole('button',{name:'شروع سفر'}).click();await expect(offline.locator('textarea')).toHaveValue('پاسخ پایدار برای بازگشت آفلاین');
  expect(await offline.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const manifest=await offline.evaluate(async()=>await (await fetch('/manifest.webmanifest')).json());expect(manifest.display).toBe('standalone');
  await offline.screenshot({path:'docs/qa-pwa-offline.png',fullPage:true});
});
