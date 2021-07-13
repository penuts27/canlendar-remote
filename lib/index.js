let can = (function(){
    //------gobal--------//
let monthData = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    date = new Date(),
    tbody = document.querySelector("tbody"),
    //星期幾
    tempDate = date.getDay(),
    //月份-1
    tempMonth = date.getMonth(),
    tempYear = date.getFullYear(),
    tempDay = date.getDate(),
    //frontend save date
    object = { Note: []},
    title = document.querySelector(".inputTitle input"),
    content = document.querySelector(".inputContent textarea")
    //-------class---------//
    class CreateCalendar{
        constructor(obj){
            this.pop = obj.onClickDate
        }
        //------method--------//
        //automatic generate this mouth's canlander
        createDate = (Year,Month)=>{
            // 初始化狀態
            tbody.innerHTML="";
            //更改title
            document.querySelector(".toolbar-title").innerHTML=`${monthData[Month]} ${Year}`
            // 月初第一天星期幾
            let firstDay = new Date(Year,Month,1).getDay();
            // 該月有幾天(加一個月 並 取得前個月的最後一天)
            let dayNums = new Date(Year,Month + 1,0).getDate();
            //前一個月有幾天
            let predayNums = new Date(Year,Month,0).getDate();
            //該月有幾週
            let weekNums = Math.ceil((dayNums + firstDay) / 7 );
            let day = 1;
            let nextday = 1
            //id
            for(let i = 0;i < weekNums;i++){
                let tr = document.createElement("tr")
                for(let e=0;e<7;e++){
                    let td = document.createElement("td")
                    let daygridDayFrame =document.createElement("div")
                    daygridDayFrame.className="daygrid-day-frame"
                    let dayridDayTop =document.createElement("div")
                    dayridDayTop.className="day-grid-day-top"
                    let daygridDayEvents= document.createElement("div")
                    daygridDayEvents.className="daygrid-day-events"
                    let dayGridDayNumber =document.createElement("a")
                    dayGridDayNumber.className="day-grid-day-number"
                    let numberText = document.createTextNode("")
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
                        this.pop(daygridDayFrame);
                        daygridDayFrame.style.cursor="pointer";

                    }
                    daygridDayFrame.appendChild(dayridDayTop).appendChild(dayGridDayNumber).appendChild(numberText)
                    daygridDayFrame.appendChild(daygridDayEvents)
                    tr.appendChild(td).appendChild(daygridDayFrame)
                    day++
                }
                tbody.appendChild(tr)
            }  
            this.LoadData(Year, Month)
            this.showNoteOnTd(object.Note)
        }
        
        //generate pre month
        pre = ()=>{
            if(tempMonth == 0){
                --tempYear
                tempMonth = 11
            }else{
                --tempMonth
            }
            this.LoadData(tempYear, tempMonth)
            this.createDate(tempYear,tempMonth)   
        }
        //generate pre year
        preYear = ()=>{
        --tempYear   
        this.LoadData(tempYear, tempMonth)
        this.createDate(tempYear,tempMonth)   
        }
        //generate next month
        next = ()=>{
            if(tempMonth == 11){
                ++tempYear
                tempMonth = 0
            }else{
                ++tempMonth
            }
            this.LoadData(tempYear, tempMonth)
            this.createDate(tempYear,tempMonth)
        }
        //generate next year
        nextYear = ()=>{
            ++tempYear
            this.LoadData(tempYear, tempMonth)
            this.createDate(tempYear,tempMonth)
        }
        //generate today
        today =()=>{
            tempMonth = date.getMonth()
            tempYear = date.getFullYear()
            this.createDate(tempYear,tempMonth)   
        }
        // load local storage to object
        LoadData=(year, month)=>{
            let key = "" + year + month
            let data = JSON.parse(localStorage.getItem(key)) || []
            this.dbToFront(data)
        }
        dbToFront=(value)=>{
            //初始化object.Note
            object.Note=[]
            object.Note = [...object.Note,...value]
        }
        
        //show the todolist on td
        showNoteOnTd=(arrey)=>{
        let all = document.querySelectorAll(".daygrid-day-events")
        all.forEach(x=>x.innerHTML="")
        //篩出當天的td
            arrey.forEach(x=>{
                let td = document.getElementById(`${x.year}-${x.month+1}-${x.date}`)
                // console.log("td",td)
                let tdbody = td.querySelector(".daygrid-day-events")
                if (tdbody!=null){
                    let newItem = `
                    <div class="daygrid-event">
                        <div class="daygrid-event-dot"></div>
                        <div class="fc-event-title">${x.title}</div>
                    </div>
                `
                tdbody.insertAdjacentHTML("beforeend",newItem) 
                }
            })
    }
    }  
    class CreateLightbox{
        constructor(lightbox){
            this.container= lightbox;
        }
    //展開光箱
    open= (e)=>{
        //open lightbox visibility
        document.getElementById("commonLightbox").style.visibility = "visible"
        //日期值傳給全域變數
        console.log("this",this)
        console.log("etarget",e.target)
        tempDay = e.currentTarget.childNodes[0].childNodes[0].innerHTML 
        let backdrop = document.querySelector(".backdrop.fade")
        backdrop.classList.remove("fade")
        backdrop.classList.add("show")
        //此處注意，this.container被判定不是字串，故用${}來包，否則找不到該id
        let lightbox = document.getElementById(`lightbox1`)
        lightbox.classList.remove("fade")
        lightbox.classList.add("show")
        this.showDataOnFirstModal()
    }
    //收合光箱，若有資料帶入行事曆
    close = ()=>{
        let backdrop = document.querySelector(".backdrop.show")
        //colse lightbox visibility
        document.getElementById("commonLightbox").style.visibility = "hidden"
        backdrop.classList.remove("show")
        backdrop.classList.add("fade")
        let lightbox = document.getElementById(`lightbox1`||`lightbox2`)
        lightbox.classList.remove("show")
        lightbox.classList.add("fade")  
    }
    //add task
    add= ()=>{
        // console.log("add")
        let idValue = document.getElementById("lightbox2").getAttribute("data-id")
        // console.log(idValue)
        //編輯模式
        if(idValue){
            // console.log("編輯模式")
            object.Note.forEach((item,index,arr)=>{
                if(item.id==idValue){
                    item.content = content.value
                    item.title = title.value
            }})
            this.showDataOnFirstModal()
            this.SaveData(object.Note)
            document.getElementById("lightbox2").setAttribute("data-id","")
        }//正常模式
        else if (title.value != null){
            // console.log("新增模式")
            let temp = {
                year: tempYear,
                month: tempMonth,
                date: tempDay,
                id: this._uuid(),
                checked: false,
                title: title.value,
                content: content.value
            }
            object.Note.push(temp)
            this.SaveData(object.Note)
            this.showDataOnFirstModal()
        }
        this.addToList()
        this.showNoteOnTd(object.Note)
        document.querySelectorAll(".daygrid-day-events").innerHTML=""
        title.value = ""
        content.value = ""
    } 
    //edit task
    put = (e) =>{
        let editId = e.target.dataset.id
        this.typeContent()
        document.getElementById("lightbox2").dataset.id = editId
        let findId = object.Note.find(x=> x.id ==editId)
        title.value = findId.title
        content.value = findId.content
        document.getElementById("update").innerHTML="Edit"
        } 
    //delete task
    del = (e)=>{
    let deleteId = e.target.dataset.id
    let index = object.Note.findIndex(item=>item.id==deleteId)
    object.Note.splice(index,1)
    // object.Note.forEach((item,index,arr)=>{
    //     if(item.id==deleteId){
    //         arr.splice(index,1)
    //     }})
    this.SaveData(object.Note)
    this.showDataOnFirstModal()
    this.showNoteOnTd(object.Note)
    }
    //開啟光箱2,關閉光箱1
    typeContent=()=>{
    let id = document.getElementById("lightbox2").dataset.id
    //預設按鈕名為add狀態
    document.getElementById("update").innerHTML="Add"
    let lightbox1 =document.getElementById("lightbox1")
    let lightbox2 =document.getElementById("lightbox2")
    let commonContent = document.getElementById("commonLightbox")
    let preSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    lightbox1.classList.remove("show")
    lightbox1.classList.add("fade")
    lightbox2.classList.remove("fade")
    lightbox2.classList.add("show")
    if(id != null){
        lightbox2.setAttribute("data-id",id);
    }
    let newSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    this.expendSection(commonContent,preSize,newSize)
    }
    //關閉光箱2,開啟光箱1
    addToList=()=>{
    // console.log("addToList")
    let lightbox1 =document.getElementById("lightbox1")
    let lightbox2 =document.getElementById("lightbox2")
    let commonContent = document.getElementById("commonLightbox")
    let preSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    lightbox2.classList.remove("show")
    lightbox2.classList.add("fade")
    lightbox1.classList.remove("fade")
    lightbox1.classList.add("show") 
    let newSize = [commonContent.scrollHeight,commonContent.scrollWidth]
    this.expendSection(commonContent,preSize,newSize)
    this.showDataOnFirstModal()
    }   
    //動態過渡光箱method
    expendSection=(commonContent,preSize,newSize)=>{
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
    showDataOnFirstModal=()=>{
        //初始化list
        document.querySelector(".l-list").innerHTML=""
        let targetObj = object.Note.filter(x=> (x.year == tempYear) && (x.month == tempMonth) && (x.date == tempDay))
        targetObj.forEach(x=>{
            let newList = `
            <div id=${x.id} class="item">
            <div class="itemInfo">
                <input name="checkbox" type="checkbox" aria-label="checkbox">
                <p>${x.title}</p>
                <p class="fade">${x.content}</p>
            </div>
            
            <div class="button-group">
                <div data-id='${x.id}' class="editItem" >edit</div>
                <div data-id='${x.id}' class="deleteItem" >delete</div>
            </div>
        </div>`
        document.querySelector(".l-list").insertAdjacentHTML("beforeend",newList)  
        document.querySelector(".itemInfo input").addEventListener("change",this.checkedState)
        document.querySelectorAll(".editItem").forEach(item=>item.addEventListener("click",this.put))
        document.querySelectorAll(".deleteItem").forEach(item=>item.addEventListener("click",this.del))
        // 帶入checkbox狀態
        let getId = document.getElementById(`${x.id}`)
        if(x.checked){
            getId.querySelector("input").checked = true
        }else{
            getId.querySelector("input").checked = false
        }
        })
    }
    //show the todolist on td
    showNoteOnTd=(arrey)=>{
        let all = document.querySelectorAll(".daygrid-day-events")
        all.forEach(x=>x.innerHTML="")
        //篩出當天的td
            arrey.forEach(x=>{
                let td = document.getElementById(`${x.year}-${x.month+1}-${x.date}`)
                // console.log("td",td)
                let tdbody = td.querySelector(".daygrid-day-events")
                if (tdbody!=null){
                    let newItem = `
                    <div class="daygrid-event">
                        <div class="daygrid-event-dot"></div>
                        <div class="fc-event-title">${x.title}</div>
                    </div>
                `
                tdbody.insertAdjacentHTML("beforeend",newItem) 
                }
            })
    }
    SaveData=(object)=>{
        let key = "" + tempYear + tempMonth
        localStorage.setItem(key,JSON.stringify(object))
    }
    //save checkbox data to object.Note
    checkedState=(event)=>{
        //抓取id
        const tempId = event.target.parentNode.parentNode.id
        object.Note.forEach(obj=>{
            if(obj.id== tempId){
                obj.checked = event.target.checked 
            }
        })
        this.SaveData(object.Note)
    }    
     //generate uuid
     _uuid=()=> {
        function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }  
    }
    let lightbox = new CreateLightbox()
    let calendar = new CreateCalendar({
        onClickDate: (item) => {
            item.addEventListener("click",lightbox.open)
        } //將lightbox拆為另一個模組，並該模組有提供方式如 lightbox.open()
    })
    //系統初始的日歷
    calendar.createDate(tempYear,tempMonth)
    //event
    document.querySelector(".l-close").addEventListener("click",lightbox.close)
    document.querySelector(".backdrop").addEventListener("click",lightbox.close)
    document.querySelector(".preYear-button").addEventListener("click",calendar.preYear)
    document.querySelector(".prev-button").addEventListener("click",calendar.pre)
    document.querySelector(".next-button").addEventListener("click",calendar.next)
    document.querySelector(".nextYear-button").addEventListener("click",calendar.nextYear)
    document.querySelector(".today-button").addEventListener("click",calendar.today )

    document.querySelector(".addNew").addEventListener("click",lightbox.typeContent)
    document.getElementById("update").addEventListener("click",lightbox.add)
    //public data
    return{
        object:object
    }
})()





