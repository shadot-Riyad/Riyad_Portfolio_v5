# SQA Portfolio — v5.1

## Folder
- index.html : পেজের structure (Bangla comment এ কোথায় কী আছে লেখা)
- css/style.css : design (v5 এর নতুন অংশ ফাইলের শেষে)
- js/data.js : ✅ শুধু এই ফাইল edit করো (project, demo, link, formspree, sheetUrl, ছবি)
- js/app.js : 🚫 সাইটের logic, হাত দিতে হবে না
- images/ : ছবি (favicon.png/.ico = ব্রাউজার ট্যাবের লোগো)
- google-sheet-setup.md : Suggestion → Google Sheet সেটআপ



## Online (free)
GitHub repo → সব ফাইল upload → Settings > Pages > Branch main > Save.
(অথবা netlify.com/drop এ folder drag-drop)

## v5.1 এ যা নতুন
- Experience / Training / Education — সব card এ ডানপাশে ছবির জায়গা (ছবি না দিলে emoji দেখায়)
- About পেজে "What next" এর নিচে animated To-Do List (`todo:` এ edit করো)
- Contact পেজে info card: ছবি + Address + Phone + Email (`contact:` এ edit করো)

## সাধারণ কাজ (js/data.js এ)
- Experience/Education এ ছবি: item এ `img:"images/walton.jpg"` দাও (ছবি images/ এ রাখো), `link:` এ ওয়েবসাইট
- নতুন Experience/Course/Education: যেকোনো একটা `{...},` লাইন copy-paste করো
- To-Do: `{t:"কাজ",s:"todo"}` — s = done / doing / todo, doing হলে `p:60` (%) দিতে পারো
- Contact: `phone` এর "" এ নম্বর বসাও; ফাঁকা রাখলে ওই সারি লুকায়; `photo:""` দিলে ছবি লুকায়
- ভার্সিটির ছবি: `edu` এর BSc item এ `img:"images/eub.jpg"` দাও (ছবিটা images/ এ রাখো)। link আগে থেকেই আছে।
- Birthday Wish লুকাতে: ওই demo তে `hide:true`, দেখাতে `hide:false`
- Contact form: `formspree:` এর URL বসানো আছে
- Suggestion → Sheet: `sheetUrl:` এ Apps Script URL বসাও (google-sheet-setup.md দেখো)
- Favicon বদলাতে: images/favicon.png, favicon.ico, apple-touch-icon.png replace করো

## Color
Navbar এর 🎨 বাটনে 5 টা theme + custom color। Default: data.js এ `color:"sea"`।
