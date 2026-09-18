# Studio Kit 0.1.0

بسته مستقل و واقعی؛ رابط محصول از همین کد استفاده می‌کند. کد منبع مرجع فعلاً در این پروژه است. نسخه خروجی استودیو یک snapshot نسخه‌دار است، ویرایش اصلی باید اینجا انجام شود.

| Export | مسئولیت | وابستگی |
|---|---|---|
| `engine` | انتقال صحنه، اعتبار پاسخ، تکمیل، بازیابی | فقط type محتوای ورودی |
| `content` | YAML و اعتبارسنجی schema | yaml، zod |
| `storage` | قرارداد repository و adapter محلی با کنترل revision | Dexie |
| `session` | autosave، retry، hydration، جلوگیری از race | Zustand، repository تزریق‌شده |
| `ui` | AppShell، ActionButton، ProgressMeter | React و stylesheet |

## استفاده در پروژه دیگر

بسته را به dependencies با `file:../Career-Compass-Studio/releases/0.1.0/studio-kit` اضافه کن و peerDependencies ثبت‌شده در package.json را نصب کن. این نسخه سورس TypeScript صادر می‌کند و مصرف‌کننده باید bundler سازگار داشته باشد؛ خروجی مستقل JavaScript برای Node هنوز آماده نیست.

```ts
import { createSession } from '@compass/studio-kit/session';
import { DexieJourneyRepository } from '@compass/studio-kit/storage';
const session = createSession(validatedCourse, new DexieJourneyRepository('my-product'));
await session.hydrate();
// React: useStore(session.store); writes: session.update(transform); await session.flush();
```

هیچ متن کتاب یا نام محصولی داخل موتور نیست. شناسه course و نسخه content برای هر پروژه ثابت و مشخص باشد. نسخه ناسازگار پشتیبان بدون migration رد می‌شود. بعد از ویرایش مرحله تکمیل‌شده، completion مرحله و مراحل بعدی باطل می‌شود. ذخیره شکست‌خورده draft را در حافظه نگه می‌دارد؛ در خطای تعارض، کاربر باید خروجی بگیرد و صفحه را تازه کند. موتور sync ابری ندارد.

CSS لازم برای ui در `styles.css` همراه snapshot صادر می‌شود. این stylesheet فعلاً baseline بصری پروژه نیز هست؛ جداسازی کامل CSS ویژگی‌ها در backlog قرار دارد.
