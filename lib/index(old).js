//------gobal--------//
var monthData = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var date = new Date();
var tbody = document.querySelector("tbody");
//星期幾
var tempDate = date.getDay();
//月份-1
var tempMonth = date.getMonth();
var tempYear = date.getFullYear();
var tempDay = date.getDate();
//frontend save date
var object = { Note: []}

//------method--------//
//generate pre month
function pre(){
    if(tempMonth == 0){
        --tempYear
        tempMonth = 11
    }else{
        --tempMonth
    }
    LoadData(tempYear, tempMonth)
    createDate(tempYear,tempMonth)   
}
//generate pre year
function preYear(){
    --tempYear   
    LoadData(tempYear, tempMonth)
    createDate(tempYear,tempMonth)   
}
//generate next month
function next(){
    if(tempMonth == 11){
        ++tempYear
        tempMonth = 0
    }else{
        ++tempMonth
    }
    LoadData(tempYear, tempMonth)
    createDate(tempYear,tempMonth)
}
//generate next year
function nextYear(){
    ++tempYear
    LoadData(tempYear, tempMonth)
    createDate(tempYear,tempMonth)
}
//generate today
function today(){
    tempMonth = date.getMonth()
    tempYear = date.getFullYear()
    createDate(tempYear,tempMonth)   
    
}
//automatic generate this mouth's canlander
function createDate(Year,Month){
    // 初始化狀態
    tbody.innerHTML="";
    //更改title
    document.querySelector(".toolbar-title").innerHTML=`${monthData[Month]} ${Year}`
    // 月初第一天星期幾
    var firstDay = new Date(Year,Month,1).getDay();
    // 該月有幾天(加一個月 並 取得前個月的最後一天)
    var dayNums = new Date(Year,Month + 1,0).getDate();
    //前一個月有幾天
    var predayNums = new Date(Year,Month,0).getDate();
    //該月有幾週
    var weekNums = Math.ceil((dayNums + firstDay) / 7 );
    var day = 1;
    var nextday = 1
    //id
    for(i = 0;i < weekNums;i++){
        var tr = document.createElement("tr")
        for(e=0;e<7;e++){
            var td = document.createElement("td")
            var daygridDayFrame =document.createElement("div")
            daygridDayFrame.className="daygrid-day-frame"
            var dayridDayTop =document.createElement("div")
            dayridDayTop.className="day-grid-day-top"
            var daygridDayEvents= document.createElement("div")
            daygridDayEvents.className="daygrid-day-events"
            var dayGridDayNumber =document.createElement("a")
            dayGridDayNumber.className="day-grid-day-number"
            var numberText = document.createTextNode("")
            //上個月
            if(day<=firstDay){
                dayGridDayNumber.innerHTML= predayNums-firstDay+1
                dayridDayTop.classList.add("day-other")
                td.setAttribute("id",`${Month==0 ? Year-1 : Year}-${Month==0 ? 12: Month}-${predayNums-firstDay+1}`)
                predayNums++
            //下個月
            }else if(day > firstDay+dayNums){
                dayGridDayNumber.innerHTML = nextday
                dayridDayTop.classList.add("day-other")
                td.setAttribute("id",`${Month==11 ? Year+1 : Year}-${Month==11 ? 1:Month+2}-${nextday}`)
                nextday++
            //本月
            }else{
                dayGridDayNumber.innerHTML= day-firstDay;
                td.setAttribute("id",`${Year}-${Month+1}-${day-firstDay}`)
                daygridDayFrame.setAttribute("onclick","popLightbox('lightbox1',this)")
                daygridDayFrame.style.cursor="pointer";
            }
            daygridDayFrame.appendChild(dayridDayTop).appendChild(dayGridDayNumber).appendChild(numberText)
            daygridDayFrame.appendChild(daygridDayEvents)
            tr.appendChild(td).appendChild(daygridDayFrame)
            day++
        }
        tbody.appendChild(tr)
    }
    LoadData(Year, Month)
    showNoteOnTd(object.Note)
}
var title = document.querySelector(".inputTitle input")
var content = document.querySelector(".inputContent textarea")

//展開光箱
function popLightbox(lightbox,event){
    //open lightbox visibility
    document.getElementById("commonLightbox").style.visibility = "visible"
    //日期值傳給全域變數
    tempDay =event.childNodes[0].childNodes[0].innerHTML
    var backdrop = document.querySelector(".backdrop.fade")
    backdrop.classList.remove("fade")
    backdrop.classList.add("show")
    var lightbox = document.getElementById(lightbox)
    lightbox.classList.remove("fade")
    lightbox.classList.add("show")
    showDataOnFirstModal()
}
//收合光箱，若有資料帶入行事曆
function closeLightbox(lightbox){
    var backdrop = document.querySelector(".backdrop.show")
    //colse lightbox visibility
    document.getElementById("commonLightbox").style.visibility = "hidden"
    backdrop.classList.remove("show")
    backdrop.classList.add("fade")
    var lightbox = document.getElementById(lightbox)
    lightbox.classList.remove("show")
    lightbox.classList.add("fade")    
}
//開啟光箱2,關閉光箱1
function intoDetail(idValue){
    //預設按鈕名為add狀態
    document.getElementById("update").innerHTML="Add"
    var lightbox1 =document.getElementById("lightbox1")
    var lightbox2 =document.getElementById("lightbox2")
    var commonContent = document.getElementById("commonLightbox")
    var preSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    lightbox1.classList.remove("show")
    lightbox1.classList.add("fade")
    lightbox2.classList.remove("fade")
    lightbox2.classList.add("show")
    if(idValue){
        lightbox2.setAttribute("data-id", idValue);
    }
    var newSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    expendSection(commonContent,preSize,newSize)
}
//關閉光箱2,開啟光箱1
function intoList(){
    var lightbox1 =document.getElementById("lightbox1")
    var lightbox2 =document.getElementById("lightbox2")
    var commonContent = document.getElementById("commonLightbox")
    var preSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    lightbox2.classList.remove("show")
    lightbox2.classList.add("fade")
    lightbox1.classList.remove("fade")
    lightbox1.classList.add("show") 
    var newSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    expendSection(commonContent,preSize,newSize)
}
//動態過渡光箱method
function expendSection(commonContent,preSize,newSize){
    // console.log(preSize[0])
    // console.log(preSize[1])
    // console.log(newSize[0])
    // console.log(newSize[1])
    requestAnimationFrame(function(){
        commonContent.style.height = preSize[0] + "px"
        commonContent.style.width = preSize[1] + "px"
        commonContent.style.transiton = ""
         requestAnimationFrame(function(){
           commonContent.style.height = newSize[0] + "px"
           commonContent.style.width = newSize[1] + "px"
         })
      }) 
}
//點擊add按鈕資料，判斷是否為編輯模式，是的話更新該資料，否的話掛載新資料
function addNew(){
    var idValue = document.getElementById("lightbox2").getAttribute("data-id")
    //編輯模式
    if(idValue){
        console.log("編輯模式")
        object.Note.forEach((item,index,arr)=>{
            if(item.id==idValue){
                item.content = content.value
                item.title = title.value
         }})
         showDataOnFirstModal()
         SaveData(object.Note)
         document.getElementById("lightbox2").setAttribute("data-id","")
    }//正常模式
    else if (title.value != null){
        console.log("新增模式")
        let temp = {
            year: tempYear,
            month: tempMonth,
            date: tempDay,
            id: _uuid(),
            checked: false,
            title: title.value,
            content: content.value
        }
        object.Note.push(temp)
        SaveData(object.Note)
        showDataOnFirstModal()
    }
    intoList()
    showNoteOnTd(object.Note)
    document.querySelectorAll(".daygrid-day-events").innerHTML=""
title.value = ""
content.value = ""

}
function showDataOnFirstModal(){
    //初始化list
    document.querySelector(".l-list").innerHTML=""
    var targetObj = object.Note.filter(x=> (x.year == tempYear) && (x.month == tempMonth) && (x.date == tempDay))
    targetObj.forEach(x=>{
        var newList = `
        <div id=${x.id} class="item">
        <div class="itemInfo">
            <input onchange="checkedState(this)" name="checkbox" type="checkbox" aria-label="checkbox">
            <p>${x.title}</p>
            <p class="fade">${x.content}</p>
        </div>
        
        <div class="button-group">
            <div onclick="editItem('${x.id}')" class="edit" >edit</div>
            <div onclick="deleteItem('${x.id}')" class="delete" >delete</div>
        </div>
    </div>`
    document.querySelector(".l-list").insertAdjacentHTML("beforeend",newList)  
    // 帶入checkbox狀態
    var getId = document.getElementById(`${x.id}`)
    if(x.checked){
        getId.querySelector("input").checked = true
    }else{
        getId.querySelector("input").checked = false
    }

    })
}
//show the todolist on td
function showNoteOnTd(arrey){
    let all = document.querySelectorAll(".daygrid-day-events")
    all.forEach(x=>x.innerHTML="")
    //篩出當天的td
        arrey.forEach(x=>{
           var td = document.getElementById(`${x.year}-${x.month+1}-${x.date}`)
           console.log("td",td)
           var tdbody = td.querySelector(".daygrid-day-events")
           if (tdbody!=null){
              var newItem = `
                <div class="daygrid-event">
                    <div class="daygrid-event-dot"></div>
                    <div class="fc-event-title">${x.title}</div>
                </div>
           `
           tdbody.insertAdjacentHTML("beforeend",newItem) 
           }
        })
}
//delete模式
function deleteItem (deleteId){
    var index = object.Note.findIndex(item=>item.id==deleteId)
    object.Note.splice(index,1)
    // object.Note.forEach((item,index,arr)=>{
    //     if(item.id==deleteId){
    //         arr.splice(index,1)
    //     }})
    SaveData(object.Note)
    showDataOnFirstModal()
    showNoteOnTd(object.Note)
}
//edit模式
function editItem(editId){
    intoDetail(editId)
    var findId = object.Note.find(x=> x.id ==editId)
    title.value = findId.title
    content.value = findId.content
    document.getElementById("update").innerHTML="Edit"
}
// update new object to local storage
function SaveData(object){
    let key = "" + tempYear + tempMonth
    localStorage.setItem(key,JSON.stringify(object))
}
 // load local storage to object
 function LoadData(year, month){
    let key = "" + year + month
    var data = JSON.parse(localStorage.getItem(key)) || []
    dbToFront(data)
}
function dbToFront(value){
    //初始化object.Note
    object.Note=[]
    object.Note = [...object.Note,...value]
}
//generate uuid
function _uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  //save checkbox data to object.Note
function checkedState(event){
    //抓取id
    const tempId = event.parentNode.parentNode.id
    object.Note.forEach(obj=>{
        if(obj.id== tempId){
            obj.checked = event.checked 
        }
    })
    SaveData(object.Note)
}
//系統初始的日歷
createDate(tempYear,tempMonth)






