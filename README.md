# :date: 行事曆 Calendar

## 成品與資源連結
- Pages
  - [首頁index](https://penuts27.github.io/canlendar-remote/)
  
## 功能 (以 User stories 的方式表達)

- 使用者可以瀏覽所有電影內容

- 使用者可以在搜尋欄輸入電影名關鍵字以尋找相符的電影，送出後會渲染新的畫面，若單純輸入空白，會顯示第一頁內容；若輸入的關鍵字找不到相符的電影，會跳出提示並且要求使用者重新輸入

- 使用者點選加號可以將人物加入喜愛清單中，並可以在收藏頁面瀏覽

- 收藏頁面中，點擊 - 號並可以取消收藏

- 使用者點擊more按鈕可以看到更詳細的電影資料

- 使用者可以自由切換電影顯示模式，可選 格子式排列/清單式排列

- 使用者可以點擊分頁，切換不同頁數，當前頁數會特別顯示，一頁顯示12筆

## 使用前端工具

`node npm - gulp`  
`ejs`  
`javascript` 

## 指令列表

- `gulp` - 執行開發模式(會開啟模擬瀏覽器並監聽相關檔案)
  - 若沒有自動開啟瀏覽器則可手動在瀏覽器上輸入 `http://localhost:8080/` 即可。
  - 假使監聽功能無效的話，可以檢查一下是否修改到資料夾的名稱等。
- `gulp build` - 執行編譯模式(不會開啟瀏覽器)
- `gulp clean` - 清除 dist 資料夾
- `gulp deploy` - 將 dist 資料夾部署至 GitHub Pages
  - 若無法部署到 GitHub Pages 的話，可以確定一下是否已經初始化專案等。

> 請務必確保已經在本機上輸入過 `npm install -g gulp`，否則電腦會不認識 `gulp` 指令哦。

## 資料夾結構

- App # 原始碼
  - assets # 靜態資源放置處
    - images # 圖片放置處
    - js # JavaScript 放置處
    - style # 樣式放置處
  - index.html # 首頁 HTML
  - layout.ejs # Layout ejs
- gulpfile.js # Gulp 原始碼
  - envOptions.js # Gulp 路徑變數
  - index.js # Gulp 核心原始碼


