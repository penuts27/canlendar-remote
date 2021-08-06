# :date: 行事曆 Calendar

## 成品與資源連結
- Pages
  - [首頁index](https://penuts27.github.io/canlendar-remote/)
  
## 功能 (以 User stories 的方式表達)

- 使用者可以使用萬年曆，瀏覽日期，日期依照年份月份改變，期按鈕可以切換月份
`prev`: 上一月
`next`: 下一月
`preYear`:上一年
`nextYear`:下一年

- 使用者可以點擊日曆填寫代辦清單，並將資訊儲存在該日期，一直到瀏覽器資料被清空為止

## 使用前端工具

`node npm - gulp`  
`ejs`  
`javascript` 

## RWD斷點
#### mobole device: (sm)
螢幕解析度寬度 798px 以下支援

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

- lib 
  - index.js 
  - style.css 
- index.html


