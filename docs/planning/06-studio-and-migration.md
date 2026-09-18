# برنامه موتورهای مستقل، مهاجرت و انتقال به Studio

نسخه 2.0 — بازنگری 2026-09-13. این سند برنامه معماری است؛ قراردادهای زیر هنوز کد یا package آماده نیستند.

## آنچه واقعاً داریم

بسته فعلی `packages/studio-kit` شامل content، engine، storage، session و سه UI primitive است. schema فعلی هر مرحله فعال را به دقیقاً exercise/visualization/reflection محدود می‌کند، هر پاسخ string است، minLength ملاک عبور است و ویرایش، completion مرحله‌های بعدی را حذف می‌کند. این قراردادها برای تجربه چندتعامل و شاخه‌ای کافی نیستند. هسته storage، کنترل revision و autosave ارزش نگهداری دارند ولی با نوع داده جدید دوباره تست می‌شوند.

PWA فعلی الگوی تک‌صفحه‌ای است. اضافه‌شدن route یا محتوای پویا باید همراه بازنگری cache باشد. نمونه PWA یا SceneEditor فعلی صرفاً با نام‌گذاری موتور عمومی نمی‌شوند.

## مدل مفهومی جدید

Course ← Stage ← Section ← Step. Stage همان ۹ مرحله کتاب؛ Section یکی از Exercise/Visualization/Reflection؛ Step یک فعالیت خرد با interactionKind مستقل. نوع تعامل از نقش بخش جدا می‌شود: Reflection می‌تواند choice یا sentence-builder باشد.

هر Step دارای id پایدار، سؤال، راهنمایی، گزینه‌ها، حداقل/حداکثر انتخاب در صورت نیاز، branches با شرط صریح، fallback برای unknown، dataDependencies و reportBindings است. در نقشه content، مسیر خروج از هر شاخه تعریف شود و راهی برای حلقه بی‌پایان نباشد.

Answer یک مقدار typed است: انتخاب/چندانتخاب/ترتیب/مقیاس/متن/رویداد/رابطه/بازه زمان. status و منشأ پاسخ جدا از value نگهداری شوند. «نمی‌دانم» enum است، نه عدد صفر یا رشته خالی. پاسخ پیشنهادی سیستم، پاسخ تأییدشده کاربر و برداشت AI سه موجودیت متفاوت‌اند.

## موتورهای پیشنهادی

| ماژول | مسئولیت | ورودی/خروجی مفهومی | نباید بداند |
|---|---|---|---|
| Content | اعتبارسنجی stage/section/step و ارجاع‌ها | محتوا → graph معتبر | React، Dexie و provider AI |
| Journey | قدم فعال، شاخه، resume و وضعیت مرور | graph + answer state → transition | نام کتاب و متن سؤال |
| Interaction | قرارداد renderer و اعتبار نوع پاسخ | step spec → answer typed | امتیاز یا توصیه شغلی |
| Rules | قواعد deterministic و evidence refs | پاسخ ساختاریافته → نکته/سؤال/پیشنهاد | UI، شبکه و متن prompt مدل |
| Session/Persistence | autosave و revision و migration | تغییر + repository → وضعیت واقعی ذخیره | زیبایی نمودار |
| Visual Model | تبدیل داده تأییدشده به شکل معنایی | facts → nodes/edges/series | Canvas، DOM و فایل PDF |
| Sketch Renderer | نمایش همان مدل با Rough.js | مدل + theme + seed → SVG | تحلیل شخصیت و انتخاب شغل |
| Reports | snapshot، لایه‌های منشأ، layout و export | داده و مدل بصری → گزارش مرحله/جامع | تولید پاسخ به‌جای کاربر |
| AI Adapter | درخواست اختیاری پس از بازتاب و اعتبار پاسخ | snapshot منتخب → analysis contract | تغییر بی‌اجازه answers/actions |

این‌ها مرزهای منطقی‌اند؛ همه از روز اول package جدا نشوند. ابتدا در Studio Kit با entry pointهای کوچک، پس از استفاده واقعی و نیاز مستقل نسخه‌بندی جدا بررسی شود. dependency flow: content/data → journey/rules → visual model/report snapshot → renderer/export. UI coordinator است، نه محل نوشتن قواعد.

## برنامه استخراج از محصول

| قطعه | نخستین مصرف | دومین شاهد استفاده | زمان قابل‌انتقال‌شدن |
|---|---|---|---|
| GuidedStepShell | Stage 1 | Stage 2 | پس از حذف متن محصول و تست RTL |
| ChoiceSet / Scale / SentenceBuilder | Stage 1 | Stage 3/4 | همراه spec پاسخ و تست keyboard |
| Rules engine | Stage 1 | قاعده متفاوت Stage 2 | پس از حذف شرط‌های ویژه کتاب از هسته |
| Timeline | Stage 2 | مسیرهای Stage 8 | پس از جداسازی renderer و داده |
| ReportCard / Snapshot | گزارش Stage 1 | گزارش Stage 2 | با منشأ داده و partial state |
| SVG export | گزارش مرحله | پوستر جامع | پس از تست فارسی و fonts |
| PWA recipe | همین محصول | پروژه دوم واقعی | فعلاً recipe با محدودیت ثبت‌شده |

## مهاجرت پاسخ‌های قبلی

1. قبل از migration خودکار، snapshot قابل export از داده v1 ایجاد شود.
2. id و version قدیمی حفظ و فیلدهای متنی به legacyNotes نگاشت شوند؛ تفسیر ماشینی متن به گزینه ممنوع.
3. کاربر در اولین ورود خلاصه می‌بیند: «پاسخ قبلی حفظ شده؛ این قسمت را با انتخاب‌های تازه مرور کن.»
4. یادداشت روز کاری به پیشنهاد Stage 7 منتقل شود، تنها با تأیید کاربر به داده فعال تبدیل شود.
5. completion نسخه قبل با completed جدید برابر فرض نشود؛ وضعیت imported/needsReview داشته باشد.
6. گزارش‌های قدیمی immutable بمانند؛ reports تازه بر اساس revision جدید ساخته شوند.
7. در شکست migration، v1 حذف یا overwrite نشود؛ مسیر خواندن و export داده قدیمی باقی بماند.
8. update worker هنگام migration وسط کار فعال نشود؛ چند تب، quota، restore و downgrade بررسی شوند.

## قرارداد انتقال استودیو

مسیر مرجع: `E:/Gamestorming-Gamification/ai-studio-for-making-digital-product`.

در این نوبت فقط سند طراحی به `projects/career-compass-guided-redesign/` منتقل می‌شود؛ هیچ release اجرایی جدیدی اعلام نمی‌شود. snapshotهای قبلی و مستندات Remember حفظ شوند. منشأ واقعی و وضعیت planned/implemented/tested/adopted جدا ثبت شوند. تغییر API Answer و Section در زمان ساخت یک تغییر ناسازگار است؛ همراه برنامه version و migration منتشر شود، نه overwrite نسخه 0.1.0.

هر milestone بعدی باید این موارد را به استودیو برگرداند: قرارداد component، نمونه کوچک فاقد محتوای کتاب، سناریوی test، metadata وابستگی و مجوز، محدودیت browser، snapshot نسخه‌دار و changelog. metadata کافی نیست؛ تا source/test وجود ندارد، برچسب implemented مجاز نیست.

## استفاده اقتصادی از context

برای ساخت Stage 1 فقط roadmap + storyboard Stage 1 + بخش قواعد مربوط را بخوان؛ برای renderer گزارش، سند visuals و قرارداد snapshot. پوشه OCR و کل تاریخ گفتگو وارد هر task نشود. گزارش هر task شامل هدف، فایل‌های تغییرکرده، تست واقعی، نکته پایدار و کار بعدی باشد. کاهش توکن باید از زمان/مصرف ثبت‌شده دو پروژه اندازه‌گیری شود؛ درصد صرفه‌جویی از پیش تضمین نمی‌شود.

## نقشه تأثیر تغییرها

گزینه انتخابی → شاخه فعال + facts + تصویر زنده؛ اصلاح یک تجربه → شاهد مهارت‌های وابسته needsReview؛ تغییر اولویت زندگی → مقایسه و سناریوی مرتبط stale؛ تغییر deadline → برنامه اقدام مرتبط needsReview؛ تعویض theme → فقط خروجی بصری؛ تعویض provider AI → فقط تحلیل تازه، بدون تغییر facts. برای این dependencyها id و نسخه ثبت شود تا همه مراحل بعدی بی‌جهت پاک نشوند.
