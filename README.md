# ACT MEDIA 戶動媒體 — Official Website

**The Agency of Actions** · [www.act-m.com](http://www.act-m.com)

## 部署說明 (Deploy to Vercel)

### 方法一：GitHub + Vercel (推薦)

1. 將此資料夾所有檔案上傳到 GitHub repository
2. 前往 [vercel.com](https://vercel.com) → Import Project
3. 選擇你的 GitHub repo
4. Framework Preset 選 **Other**
5. Root Directory 保持預設 (`./`)
6. 點擊 **Deploy**

Vercel 會自動偵測靜態 HTML 網站，無需額外設定。

---

### 方法二：Vercel CLI

```bash
npm i -g vercel
cd act-media-website
vercel
```

---

## 檔案結構

```
act-media-website/
├── index.html          # 主頁面 (所有區塊)
├── css/
│   └── style.css       # 完整樣式表
├── js/
│   └── main.js         # 互動功能
├── vercel.json         # Vercel 部署設定
└── README.md           # 本說明文件
```

---

## 客製化建議

### 詢問表單
目前使用 `setTimeout` 模擬送出。建議替換為：
- **Netlify Forms**：在 `<form>` 加上 `netlify` 屬性
- **Formspree**：`action="https://formspree.io/f/YOUR_ID"`
- 自架 API endpoint

### 品牌顏色
在 `css/style.css` 的 `:root` 修改 CSS 變數：
```css
--phoenix: #f05a28;   /* 主色 - 鳳凰橙 */
--obsidian: #08080f;  /* 背景黑 */
```

### 聯絡資訊
在 `index.html` 搜尋以下字串直接替換：
- `+852 3111 2328` → 香港電話
- `+886 2 7708 0766` → 台灣電話
- `enquiry@act-m.com` → 電子郵件

---

## 技術規格

- **純靜態 HTML/CSS/JS** — 零框架依賴，極速載入
- **RWD 響應式設計** — 支援手機、平板、桌面
- **Google Fonts** — Big Shoulders Display + Instrument Sans + DM Mono
- **CSS 動畫** — Intersection Observer 滾動顯示
- **無障礙** — 語意化 HTML，ARIA 標籤

---

© 2025 ACT MEDIA 戶動媒體股份有限公司
