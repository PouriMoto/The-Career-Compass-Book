# Career Compass OS — Assets Inventory

## برنامه سبک جدید — 2026-09-13

برای بازطراحی آینده، نیازهای فونت، SVG راهنما، شکل‌های Rough.js و خروجی گزارش در [سند هویت بصری و گزارش‌ها](planning/05-visual-reports-and-roughjs.md) ثبت شده‌اند. این نیازها planned هستند؛ هیچ asset، فونت یا صدا در این نوبت اضافه یا جایگزین نشده است. آیکون‌های PWA ساخته‌شده فاز دوم در `studio/generated-assets.json` ثبت‌اند و نباید دوباره «تهیه‌نشده» محسوب شوند.

## به‌روزرسانی 2026-09-10

کاتالوگ کامل ماشین‌خوان در `studio/asset-catalog.json` تولید شد: ۵۸ فایل، شامل ۲۵ صوت و ۳۳ تصویر، مجموع ۶٬۹۲۳٬۹۷۷ بایت. هر رکورد مسیر اصلی، اندازه، SHA-256، نوع و برای PNG ابعاد تصویر دارد. هیچ فایلی تغییر نام یا جابه‌جا نشده است.

وضعیت preview و مجوز همه فایل‌ها هنوز بازبینی‌نشده است؛ هیچ asset وارد runtime نشده. این کاتالوگ با `node scripts/catalog-assets.mjs` بازتولید می‌شود و snapshot آن در Studio نسخه 0.1.0 موجود است. نسخه استودیو metadata را نگه می‌دارد؛ فایل‌های اصلی داخل assets همین پروژه باقی می‌مانند.

رابط فعلی با CSS و یک نشان متنی ساخته شده و به دانلود تصویر یا فونت وابسته نیست. فونت فارسی محلی و آیکون‌های نصب هنوز نیازهای فاز بعدند.

این فایل فهرست assetهایی است که در طول توسعه باید تهیه یا تولید شوند.

## اولویت انتشار

| نوع | مسیر | نام فایل | توضیح |
|---|---|---|---|
| PWA icon | `public/icons/` | `icon-192.png` | آیکون نصب موبایل |
| PWA icon | `public/icons/` | `icon-512.png` | آیکون بزرگ |
| Maskable icon | `public/icons/` | `maskable-512.png` | سازگار با Android adaptive icon |
| Favicon | `public/` | `favicon.ico`, `favicon.svg` | مرورگر |
| Font | `public/fonts/` | `Vazirmatn-Regular.woff2` | متن عادی فارسی |
| Font | `public/fonts/` | `Vazirmatn-SemiBold.woff2` | تیتر و کنترل‌ها |
| Font | `public/fonts/` | `Vazirmatn-Bold.woff2` | تأکید و نتیجه |

## هویت بصری پیشنهادی

| نوع | مسیر | نام فایل |
|---|---|---|
| Logo | `public/brand/` | `logo.svg`, `wordmark.svg` |
| Sketch icon | `public/illustrations/icons/` | `compass.svg`, `path.svg`, `reflection.svg`, `plan.svg` |
| Coach states | `public/illustrations/coach/` | `coach-idle.svg`, `coach-thinking.svg`, `coach-celebrate.svg` |
| Texture | `public/textures/` | `paper-noise.webp` |

## صدا، در صورت نیاز

صدا برای MVP لازم نیست. در صورت اضافه‌شدن، این فایل‌ها lightweight باشند و خاموش‌کردنشان در تنظیمات ممکن باشد:

- `public/audio/stage-complete.ogg`
- `public/audio/stage-unlock.ogg`
- `public/audio/ui-error.ogg`

## قرارداد تحویل asset

- نام فایل‌ها فقط lowercase و با خط تیره باشد.
- SVGها ترجیحاً به‌صورت vector و بدون وابستگی خارجی تحویل شوند.
- فونت‌ها با مجوز قابل استفاده در محصول تهیه شوند.
- برای هر asset نهایی، منبع یا مجوز استفاده در همین فایل ثبت شود.
- هیچ assetی نباید برای درک محتوا یا تکمیل مسیر اجباری باشد.
