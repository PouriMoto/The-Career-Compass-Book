# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pwa.spec.ts >> cold offline reopen preserves answers and complete shell
- Location: tests\browser\pwa.spec.ts:2:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.evaluate: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [aria-hidden] [ref=e4]: ✧
      - generic [ref=e5]:
        - text: CAREER COMPASS
        - heading "قطب‌نمای مسیر تو" [level=1] [ref=e6]
    - status [ref=e7]: یادداشت‌ها روی این دستگاه ذخیره‌اند
    - generic [ref=e8]:
      - generic [ref=e9]:
        - generic [ref=e10]: پیشرفت کل مسیر
        - generic [ref=e11]: 0٪
      - progressbar "پیشرفت کل مسیر" [ref=e12]
    - generic [ref=e13]:
      - text: 01 / 09
      - heading "شروع مسیر" [level=2] [ref=e14]
      - paragraph [ref=e15]: هر قدم کوچک، شناختی تازه. مسیر حرفه‌ای‌ات را با تأمل و تمرین بساز.
      - button "شروع سفر ←" [ref=e16] [cursor=pointer]
    - heading "مسیر کشف تو" [level=2] [ref=e17]
    - generic [ref=e18]:
      - button "01 شروع مسیر Setting Out ←" [ref=e19] [cursor=pointer]:
        - generic [ref=e20]: "01"
        - generic [ref=e21]:
          - strong [ref=e22]: شروع مسیر
          - generic [ref=e23]: Setting Out
        - generic [ref=e24]: ←
      - button "02 داستان تو History در دست ساخت" [disabled] [ref=e25]:
        - generic [ref=e26]: "02"
        - generic [ref=e27]:
          - strong [ref=e28]: داستان تو
          - generic [ref=e29]: History
        - generic [ref=e30]: در دست ساخت
      - button "03 ترجیح‌ها و امکان‌ها Preferences & Possibilities در دست ساخت" [disabled] [ref=e31]:
        - generic [ref=e32]: "03"
        - generic [ref=e33]:
          - strong [ref=e34]: ترجیح‌ها و امکان‌ها
          - generic [ref=e35]: Preferences & Possibilities
        - generic [ref=e36]: در دست ساخت
      - button "04 چرخ کار و زندگی Work/Life Wheel در دست ساخت" [disabled] [ref=e37]:
        - generic [ref=e38]: "04"
        - generic [ref=e39]:
          - strong [ref=e40]: چرخ کار و زندگی
          - generic [ref=e41]: Work/Life Wheel
        - generic [ref=e42]: در دست ساخت
      - button "05 انتخاب‌ها در بستر زندگی Choices in Context در دست ساخت" [disabled] [ref=e43]:
        - generic [ref=e44]: "05"
        - generic [ref=e45]:
          - strong [ref=e46]: انتخاب‌ها در بستر زندگی
          - generic [ref=e47]: Choices in Context
        - generic [ref=e48]: در دست ساخت
      - button "06 نقشه ارتباط‌ها Networking Map در دست ساخت" [disabled] [ref=e49]:
        - generic [ref=e50]: "06"
        - generic [ref=e51]:
          - strong [ref=e52]: نقشه ارتباط‌ها
          - generic [ref=e53]: Networking Map
        - generic [ref=e54]: در دست ساخت
      - button "07 یک روز از زندگی A Day in the Life در دست ساخت" [disabled] [ref=e55]:
        - generic [ref=e56]: "07"
        - generic [ref=e57]:
          - strong [ref=e58]: یک روز از زندگی
          - generic [ref=e59]: A Day in the Life
        - generic [ref=e60]: در دست ساخت
      - button "08 کاوش مسیرها Path Exploration در دست ساخت" [disabled] [ref=e61]:
        - generic [ref=e62]: "08"
        - generic [ref=e63]:
          - strong [ref=e64]: کاوش مسیرها
          - generic [ref=e65]: Path Exploration
        - generic [ref=e66]: در دست ساخت
      - button "09 برنامه اقدام Action Plan در دست ساخت" [disabled] [ref=e67]:
        - generic [ref=e68]: "09"
        - generic [ref=e69]:
          - strong [ref=e70]: برنامه اقدام
          - generic [ref=e71]: Action Plan
        - generic [ref=e72]: در دست ساخت
    - generic [ref=e73]:
      - paragraph [ref=e74]: محتوای آزمایشی مرحله اول؛ تطبیق با تمرین‌های کتاب هنوز در انتظار بازبینی است.
      - generic [ref=e75]:
        - button "دریافت پشتیبان JSON" [ref=e76] [cursor=pointer]
        - generic [ref=e77] [cursor=pointer]:
          - text: بازیابی پشتیبان
          - button "بازیابی پشتیبان" [ref=e78]
      - alert
      - text: با پاک‌شدن داده‌های مرورگر، یادداشت‌ها از دست می‌روند؛ پشتیبان بگیر.
  - alert [ref=e79]
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | test('cold offline reopen preserves answers and complete shell',async({page,context})=>{
> 3  |   await page.goto('/legacy');await page.evaluate(()=>navigator.serviceWorker.ready.then(()=>true));
     |                                         ^ Error: page.evaluate: Test timeout of 30000ms exceeded.
  4  |   await page.getByRole('button',{name:'شروع سفر'}).click();await page.locator('textarea').fill('پاسخ پایدار برای بازگشت آفلاین');await expect(page.locator('.save-status')).toContainText('ذخیره‌اند');
  5  |   await page.close();await context.setOffline(true);const offline=await context.newPage();await offline.goto('/legacy');await offline.getByRole('button',{name:'شروع سفر'}).click();await expect(offline.locator('textarea')).toHaveValue('پاسخ پایدار برای بازگشت آفلاین');
  6  |   expect(await offline.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  7  |   const manifest=await offline.evaluate(async()=>await (await fetch('/manifest.webmanifest')).json());expect(manifest.display).toBe('standalone');
  8  |   await offline.screenshot({path:'docs/qa-pwa-offline.png',fullPage:true});
  9  | });
  10 | 
```