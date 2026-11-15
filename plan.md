# خطة تحسين الأداء: التحويل لـ Vite

Branch: `perf/vite-migration`

## الهدف

1. نقل المشروع من Create React App (`react-scripts`، اللي بقى deprecated) لـ **Vite**.
2. تقليل اللي بيتحمّل عند الزائر: حجم الـ JS، والصور، والسكريبتات الخارجية.
3. من غير ما نغيّر أي سلوك أو شكل في الموقع، ومن غير ما نحتاج نغيّر إعدادات الـ deploy على Netlify.

---

## المشاكل اللي لقيناها قبل ما نبدأ

### 1. الـ build tool
- `react-scripts 5.0.1` (CRA) مش بيتطوّر من 2022، والـ dev server والـ build بطيئين.
- فيه ملفات `.js` فيها JSX، و`process.env.REACT_APP_*`، و`require()` للصور، و`%PUBLIC_URL%` في `index.html`. كل دي حاجات خاصة بـ CRA.

### 2. مفيش code splitting
- [`src/Routes/Routers.js`](src/Routes/Routers.js) بيعمل import مباشر لحوالي 30 صفحة، فكل الموقع بيبقى في ملف JS واحد كبير بيتحمّل من أول زيارة.

### 3. صور وملفات ميديا تقيلة (حجم `src/assets` = 25MB)
| الملف | الحجم | ملاحظة |
|---|---|---|
| `popupAds/ads(1).png` | 3.4MB | بتظهر في مودال اللوجين/التسجيل |
| `popupAds/ads(2).png` | 2.7MB | نفس الكلام |
| `popupAds/ads(3).png` | 1.7MB | نفس الكلام |
| `slider/01.png` | 1.9MB | مستخدمة في 24 ملف |
| `slider/02–04.png` | 1–1.4MB لكل صورة | |
| `exploreCountries/*.png`، `collection/*.png`، `blogs/01.png`، ... | 100–300KB لكل صورة | |
| `webFont/Montserrat-Arabic-Regular.ttf` | 241KB | TTF من غير `font-display` |

### 4. مكتبات مش مستخدمة أو مكررة
- **jQuery** بيتحمّل من CDN في `index.html`، ومفيش أي استخدام ليه (Bootstrap 5 مش محتاجه).
- **`@mui/x-date-pickers`** (مكتبة ضخمة) مستوردة في 6 ملفات بس عشان أيقونة `ClockIcon`.
- packages في `package.json` ومحدش بيعملها import:
  `react-helmet` و`react-icons` و`isotope-layout` و`react-masonry-css` و`filepond` (و3 packages تابعة ليها) و`react-modern-calendar-datepicker` و`react-modern-datepicker` و`react-phone-number-input` و`@fortawesome/fontawesome-svg-core` (موجودة كـ dependency لـ react-fontawesome) و`react-i18next` (كل استخداماتها متعلّقة) و`web-vitals` (`reportWebVitals()` بتتنادى من غير callback فمش بتعمل حاجة).
- `src/App.test.js` هو الـ test الافتراضي بتاع CRA ("learn react") وفاشل أصلًا.

### 5. سبع أدوات تتبع في `<head>`
GA وGTM وYandex Metrika (مع webvisor) وTikTok وSnapchat وMeta وX. كلهم بيتحمّلوا وبيشتغلوا في نفس وقت تحميل React وأول رسم للصفحة.

### 6. الـ sitemap
- `postbuild` بيكتب `sitemap.xml` جوه `public/` **بعد** الـ build، فالنسخة الجديدة مش بتوصل لفولدر `build/` اللي بيترفع. الـ sitemap اللي على السيرفر دايمًا قديم.

### 7. Context providers
- 11 provider متداخلين في `App.js`. محتاجين مراجعة: هل بيعملوا requests مش ضرورية أول ما الموقع يفتح؟ (مراجعة وتقرير، من غير تغييرات كبيرة في الـ branch ده).

---

## خطة الشغل (بالترتيب)

- [x] **Task 0: Baseline.** build بـ CRA وتسجيل الأحجام عشان نقارن بعدين.
- [x] **Task 1: التحويل لـ Vite**
  - تثبيت `vite` و`@vitejs/plugin-react`، وشيل `react-scripts`.
  - `vite.config.js`:
    - `outDir: "build"` عشان إعدادات Netlify متتغيرش.
    - aliases للـ absolute imports (`Components/` و`Pages/` و`context/` و...) زي `baseUrl: src`.
    - `envPrefix: ["VITE_", "REACT_APP_"]` عشان متغير `REACT_APP_API_BASE_URL` الموجود على Netlify يفضل شغال.
  - نقل `public/index.html` للـ root، وشيل `%PUBLIC_URL%`، وإضافة `<script type="module" src="/src/index.jsx">`.
  - تغيير اسم الملفات `.js` اللي فيها JSX لـ `.jsx`.
  - `process.env.REACT_APP_*` تبقى `import.meta.env.REACT_APP_*`.
  - `require()` في `ImageLogin.jsx` يبقى `import`.
  - تحديث الـ scripts في `package.json` (`dev`/`start`، `build`، `preview`).
- [x] **Task 2: تنظيف المكتبات**
  - شيل jQuery من `index.html`.
  - `ClockIcon` من `@mui/x-date-pickers` اتبدلت بنسخة مطابقة في `src/assets/Icons/ClockIcon.jsx` (نفس الـ SVG، معمولة بـ `createSvgIcon` من `@mui/material`)، وبعدها اتشالت `@mui/x-date-pickers` و`dayjs`.
  - شيل الـ packages اللي مش مستخدمة (القايمة في المشكلة 4) والـ test الافتراضي و`reportWebVitals`.
  - `bootstrap.bundle` (كل الـ Bootstrap JS) اتشال من `App`. الاستخدام الوحيد كان tabs بـ `data-bs-toggle="pill"` في AccountUser وReservations، فبقوا يستوردوا `bootstrap/js/dist/tab` بس.
- [x] **Task 3: Lazy loading للـ routes.** استخدمنا `lazy` بتاع React Router لكل الصفحات ما عدا Home وLayout (الصفحة الحالية تفضل ظاهرة لحد ما الصفحة الجديدة تتحمّل)، و`React.lazy` لصفحة NotFound وللـ ChatBot، وchunk منفصل `vendor-react` عشان الـ cache.
- [x] **Task 4: تحسين الصور والخط**
  - تحويل الصور الكبيرة (أكبر من 100KB) لـ WebP مع تصغير أبعادها، وتحديث الـ imports.
  - تحويل الخط لـ WOFF2 وإضافة `font-display: swap`.
- [x] **Task 5: تأخير أدوات التتبع.** الـ stubs (`fbq` و`ttq` و`snaptr` و...) تفضل متعرّفة فورًا عشان مفيش events تضيع، وتحميل سكريبتاتهم الخارجية يتأخر لحد بعد `window.load`. GTM وGA يفضلوا زي ما هم.
- [x] **Task 6: إصلاح الـ sitemap.** `postbuild` يبقى `prebuild`، فالـ sitemap يتولّد في `public/` قبل الـ build ويتنسخ لـ `build/`.
- [x] **Task 7: مراجعة الـ contexts.** تقرير بالـ requests اللي بتحصل عند فتح الموقع.
- [x] **Task 8: التحقق.** `vite build` ينجح، ومقارنة الأحجام قبل وبعد، وتشغيل `vite preview` والتأكد إن الصفحات بتفتح.
- [x] **Task 9: من yarn لـ npm** (طلب إضافي)
  - مسح `yarn.lock`، و`package-lock.json` بقى هو المرجع الوحيد.
  - `.npmrc` فيه `legacy-peer-deps=true`، لأن `react-intl-tel-input` بيطلب React 16 كـ peer، ومن غيره `npm ci` بيفشل.
  - `.nvmrc` = `22`، لأن Vite 7 محتاج Node 20.19 أو أحدث.
  - README جديد بدل الـ README الافتراضي بتاع CRA.

---

## ملاحظات للـ deploy
- أمر الـ build هيفضل `npm run build`، وفولدر النشر هيفضل `build/`.
- متغير البيئة `REACT_APP_API_BASE_URL` مش محتاج يتغيّر.
- أمر الـ dev بقى `npm run dev` (و`npm start` هيفضل شغال كـ alias).
- Netlify هيستخدم npm تلقائيًا (لأن `yarn.lock` اتمسح)، وNode 22 (من `.nvmrc`).
- الـ build بقى بيعمل requests للـ API عشان الـ sitemap **قبل** الـ build. لو الـ API واقع، الـ sitemap القديم بيفضل زي ما هو والـ build بيكمل عادي.

## النتائج

### الأحجام (قبل CRA ← بعد Vite)
| المقياس | قبل | بعد |
|---|---|---|
| JS اللي بيتحمّل في أول زيارة (gzip) | 715KB (ملف واحد) | **303KB** |
| CSS (gzip) | 99KB | **73KB** |
| حجم فولدر `build/` | 21MB | **8.2MB** |
| الصور اللي اتحوّلت لـ WebP (19 صورة) | 15.2MB | **1.0MB** |
| صور الإعلانات في مودال اللوجين (3 صور) | 8MB | **377KB** |
| الخط | 241KB TTF | **77KB WOFF2** |
| عدد packages في `node_modules` | 1702 | **225** |

### التحقق
- اتعمل smoke test بـ Chrome headless على 17 route، على نسخة CRA القديمة ونسخة Vite الجديدة، والنتيجة **متطابقة** في كل صفحة. الـ screenshots كمان متطابقة.
- الأخطاء الوحيدة اللي ظهرت (في `/blogsPage` و`/eventsPage` و`/articals` و`/favoritePage` و`/aboutUs`) موجودة بالظبط في النسخة القديمة، وسببها إن الـ API مكانش متاح وقت الاختبار (انظر "مشاكل موجودة من قبل").

### قرار تقني: Vite 7 مش Vite 8
Vite 8 (اللي بيستخدم Rolldown) طلّع bundle فيه **نسختين من React** في chunks مختلفة، والموقع كله وقع بـ `Cannot read properties of null (reading 'useState')`. Vite 7 (بـ Rollup) شغال سليم وطلّع bundle أصغر كمان. نقدر نرجع نجرب Vite 8 لما Rolldown يستقر.

### Task 7: مراجعة الـ contexts
| Context | بيعمل إيه عند فتح أي صفحة | الإجراء |
|---|---|---|
| `SubCategoriesContext` | request لـ `getSubCategories`، **ومحدش بيستخدم النتيجة** | ✅ اتشال |
| `App.jsx` (`AppContent`) | كان بيستدعي `useHome()` من غير ما يستخدمه، فبيعمل re-render زيادة | ✅ اتشال |
| `HomeContext` | 3 requests (home data وsliders وcities) في **كل** صفحة، لأن الـ Navbar محتاج `notification_count` من بيانات الـ home | ⚠️ مقترح: endpoint خفيف لعدد الإشعارات بس، أو نخلي الـ queries دي `enabled` في الصفحة الرئيسية بس |
| `LanguageContext` | لو المستخدم عامل login، بيبعت `changeLanguage` للـ API في كل فتحة للموقع حتى لو اللغة متغيرتش | ⚠️ مقترح: نبعته بس لما اللغة تتغير فعلًا |
| `FooterContext` | footer social links | تمام (الـ footer في كل صفحة) |
| `ProfileContext` | البروفايل لو فيه login | تمام |
| Theme / Currency / Rates / Booking / Biography | من غير requests عند الفتح | تمام |

### مشاكل موجودة من قبل (مش من التحويل، محتاجة شغل منفصل)
- بعض الصفحات بتقع على صفحة الـ 404 لو الـ API رجّع error أو data فاضية (`undefined.length`)، بدل ما تعرض رسالة أو حالة فاضية.
- لو فيه Custom HTML tags جوه **GTM** بتعتمد على jQuery (`$`)، هتحتاج تتراجع، لأن jQuery اتشال من الصفحة (الكود نفسه مكانش بيستخدمه).
- لو أي pixel من اللي في `index.html` (Meta وTikTok وSnap وX وYandex) متعرّف كمان جوه GTM، يبقى بيتحمّل مرتين.
