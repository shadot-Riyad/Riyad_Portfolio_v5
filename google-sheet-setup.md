# 📊 Suggestion গুলো Google Sheet এ পাঠানোর সেটআপ (একবারই করতে হবে, ~3 মিনিট)

1. Google Sheets এ নতুন Sheet খোলো (নাম: `Portfolio Suggestions`)।
2. উপরের মেনু: **Extensions → Apps Script**।
3. পুরনো কোড মুছে নিচের কোডটা paste করো, তারপর 💾 Save:

```javascript
// প্রতিটা suggestion Sheet এর নতুন row তে যোগ হবে
function doPost(e) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Time", "Type", "Rating", "Suggestion", "Email", "Page"]);
  }
  var p = e.parameter;
  sh.appendRow([new Date(), p.type || "", p.rating || "", p.suggestion || "", p.email || "", p.page || ""]);
  return ContentService.createTextOutput("ok");
}
```

4. **Deploy → New deployment → Select type ⚙️ → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** চাপো, Google permission চাইলে Allow করো।
5. যে **Web app URL** পাবে (`https://script.google.com/macros/s/.../exec`) সেটা কপি করো।
6. `js/data.js` খুলে এখানে বসাও:
   ```js
   sheetUrl:"https://script.google.com/macros/s/XXXX/exec",
   ```
7. সাইট আবার upload করো। এখন suggestion দিলে Sheet এ row যোগ হবে ✅

> ⚠️ কোড বদলালে **Deploy → Manage deployments → Edit → New version** করতে হবে, নাহলে পুরনো কোডই চলবে।
> `sheetUrl` ফাঁকা থাকলে suggestion গুলো Formspree এ (তোমার mail এ) যায়, হারায় না।
