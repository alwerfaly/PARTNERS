# منظمة الشراكة المجتمعية — Optimized Static Site v2

A clean, modern, fully static website rebuilt from the original cPanel export.

## 🌐 Live Site
Deploy on Netlify or GitHub Pages — no server required.

## 📁 Complete Site Structure
```
optimized-site/
├── index.html              → الصفحة الرئيسية (Home)
├── about.html              → من نحن (About)
├── projects.html           → المشاريع (Projects listing)
├── news.html               → آخر الأخبار (News listing)
├── articles.html           → المقالات (Articles listing)
├── health.html             → البوابة الصحية (Health Portal)
├── contact.html            → تواصل معنا (Contact)
├── join.html               → انضم إلينا (Join Us)
│
│   — Article Detail Pages —
├── article-taqarib.html    → مشروع تقارب
├── article-livelihood.html → مشروع سبل كسب العيش
├── article-voice.html      → مشروع صوت التغيير
├── article-sharp.html      → مشروع SHARP
├── article-advocacy.html   → تدريب حول المناصرة
├── article-civil.html      → جلسة حوارية — سياسة المجتمع المدني
│
├── netlify.toml            → Netlify deploy config
└── assets/
    ├── css/style.css       → All styles (RTL, responsive, ~32KB)
    ├── js/main.js          → JavaScript (ticker, animations, ~5KB)
    └── images/
        ├── logo.png        → Organization logo
        ├── hero-bg.jpg     → Hero section background
        ├── project-*.jpg   → Project images
        ├── news-*.jpg      → News images
        ├── health-*.jpg    → Health portal images
        └── partners/       → Partner logo folder (add your logos here)
            ├── partner-1.png  → السفارة الكندية
            ├── partner-2.png  → وزارة الحكم المحلي
            ├── partner-3.png  → المجلس الأعلى للإدارة المحلية
            ├── partner-4.png  → بلدية بني وليد
            ├── partner-5.png  → مشروع تقارب
            └── partner-6.png  → برنامج الأمم المتحدة الإنمائي
```

## 🖼️ Adding Partner Logos
Replace the placeholder files in `assets/images/partners/` with your actual logos:
- Recommended size: **200×80px** (landscape) or **100×100px** (square)
- Formats: PNG (with transparency) or JPG
- Keep the same filenames: `partner-1.png` through `partner-6.png`
- The animated ticker carousel will display them automatically

## 🔗 Social Media Links
The Facebook page is linked to the confirmed URL:
`https://www.facebook.com/منظمةالشراكة-المجتمعية-104727611304372/`

To update Twitter / Instagram / YouTube links, search for `href="#"` in all HTML files
and replace with your actual social media profile URLs.

## 🚀 Deploy on Netlify
1. Drag & drop this folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo and set **Publish directory** to `optimized-site`

## 🚀 Deploy on GitHub Pages
1. Push this folder to a GitHub repo
2. Go to **Settings → Pages → Source → main branch / root**

## 🖼️ Partner Logos — How to Add
The partners ticker shows **styled name badges** (no broken images). To add actual logos:
1. Create `assets/images/partners/` folder if it doesn't exist
2. Place your logo files there (recommended: **200×80px PNG** with transparent background)
3. Update the `partners-ticker__track` HTML in each page to use:
   ```html
   <div class="partner-logo__badge">
     <img src="assets/images/partners/your-logo.png" alt="Partner Name" />
   </div>
   ```
4. The ticker CSS already handles grayscale → color hover effect

## 📸 Photo Galleries
All 6 article pages have **9-image photo galleries** using actual event photos from the original site:

| Article | Gallery Images |
|---|---|
| تدريب المناصرة | advocacy-1..6.png + advocacy-event-1..2.jpg |
| مشروع SHARP | sharp-1..3.png + sharp-event-1..5.jpg |
| جلسة حوارية | civil-1..3.png + civil-event-1..6.jpg |
| مشروع تقارب | taqarib-1..6.jpg + taqarib-event-1..3.png |
| سبل كسب العيش | livelihood-1..6.png + taqarib-event-4..6.png |
| صوت التغيير | mix of taqarib + sharp + civil images |

## 📁 Documents
- `documents/index.html` — Documents listing page
- `documents/verify/index.html` — Domain verification page (from original site)

## ✨ What's Included (v3 Final)
- **14 HTML pages** — all RTL Arabic, full layout with header/footer/social icons
- **43 event/project photos** in `assets/images/gallery/` — real photos from original site
- **6 health portal images** — actual pexels stock photos from original site
- **Animated partners carousel** — elegant name badge cards (no broken imgs), CSS ticker loops seamlessly
- **Social media icons** — Facebook (linked to real page), Twitter, Instagram, YouTube everywhere
- **Studio scroll animations** — IntersectionObserver reveal on all cards and images
- **Photo gallery grids** — 9 actual images per article, hover zoom + lightbox-ready
- **RTL topbar** with contact info (address, phone, email) + social icons
- **Health Portal** — 6 categories, 6 article cards with real pexels health images
- **Documents folder** — verify page and documents listing

## 📊 Size Comparison
| | Original | Optimized v2 |
|---|---|---|
| PHP/Backend files | ~2MB | 0 |
| JS frameworks | ~800KB | ~5KB |
| CSS files | ~500KB | ~32KB |
| Images | ~50MB+ | ~5MB |
| **Total pages** | **17 PHP** | **14 clean HTML** |
| **Total size** | **~1.5GB** | **~5MB** |

## 🎨 Design
- **Font:** Cairo (Google Fonts — Arabic)
- **Colors:** #1f497d (primary), #466ab3 (secondary), #1a7f4b (health green)
- **Direction:** RTL throughout — header, nav, content, footer
- **Responsive:** Mobile-first, hamburger menu, touch-friendly
- **Animations:** IntersectionObserver reveal, CSS ticker, image shimmer, counter

## 📞 Contact
- **Address:** بني وليد / وسط المدينة
- **Phone:** +218927242142
- **Email:** info@partnership.org.ly
- **Facebook:** https://www.facebook.com/منظمةالشراكة-المجتمعية-104727611304372/
