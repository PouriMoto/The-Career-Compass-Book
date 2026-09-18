# معماری اجرایی — 2026-09-10

> یادداشت بازطراحی 2026-09-13: این فایل شرح معماری پیاده‌شده و تاریخچه فاز اول است. PWA در فاز دوم اضافه شد. برنامه معماری آینده برای تعامل‌های چندنوعی، Rules، گزارش‌ها و migration در [موتورها و Studio](planning/06-studio-and-migration.md) است؛ در نوبت برنامه‌ریزی هیچ کد این معماری تغییر نکرده است.

## مسیر وابستگی

`content/fa → loadCourse (سرور) → Course JSON → JourneyApp (کلاینت)`

`JourneyApp → session + engine + ui` و `session → JourneyRepository`.

Composition root داخل JourneyApp، Dexie adapter را تزریق می‌کند. فقط adapter به IndexedDB دسترسی دارد. موتور تصمیم‌گیری هیچ import از React، Next، Dexie یا نام مرحله‌های کتاب ندارد. schema ورودی در مرز محتوا validate می‌شود. Zustand فقط وضعیت session را نمایش می‌دهد؛ حقیقت پایدار، رکورد Dexie است.

## بسته مشترک

کد واقعی در `packages/studio-kit` است و اپ با npm workspace مصرفش می‌کند. کپی نام کامپوننت داخل یک فهرست، پیاده‌سازی محسوب نمی‌شود؛ فقط AppShell، ActionButton و ProgressMeter اکنون پیاده‌سازی قابل انتقال دارند. Scene editor و نقشه فعلاً داخل feature پروژه‌اند.

## قرارداد ذخیره

- debounce به مدت ۳۰۰ میلی‌ثانیه؛ هنگام Continue، flush و انتظار برای ذخیره موفق.
- revision با transaction بررسی می‌شود؛ تب قدیمی اجازه overwrite ندارد.
- failure باعث حفظ draft در حافظه و نمایش retry می‌شود.
- پیش از خروج در وضعیت ذخیره‌نشده، هشدار مرورگر فعال می‌شود. توقف ناگهانی سیستم قبل از commit همچنان ممکن است آخرین تایپ را از دست بدهد.
- backup شامل course id و contentVersion است؛ نسخه ناسازگار بدون migration پذیرفته نمی‌شود.
- IndexedDB داده شخصی است؛ service worker در آینده فقط shell و محتوا را cache می‌کند.
- برای پروژه بعدی، نام دیتابیس مستقل و course id مستقل تعیین شود.

## وضعیت این فاز

مرحله اول یک vertical slice اجرایی با محتوای آزمایشی است، نه محتوای بازبینی‌شده کتاب. هر ۹ مرحله روی مسیر دیده می‌شوند؛ مراحل ۲–۹ صریحاً در دست ساخت‌اند. AI، نصب PWA، offline cold start، PDF، cloud sync و deployment هنوز انجام نشده‌اند.

## توسعه بعدی

تعریف scene kindهای جدید در schema و engine همراه با renderer مستقل؛ extraction به Studio پس از استفاده واقعی. از ساخت abstraction برای providerهایی که فعلاً استفاده نمی‌شوند پرهیز شود. قرارداد JourneyRepository امکان adapter متفاوت را از همین نسخه فراهم می‌کند.
