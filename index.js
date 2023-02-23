
//SELECTED ELEMENTS

let buttonElement = document.getElementById("button")
let ulElement = document.getElementById("ul")
let inputElement = document.getElementById("input")
inputElement.focus()
let filterIcon = document.getElementById("down-gray")
let cardBody = document.querySelector(".card-body")

let tasks = []

//ADD TASK
function addTask() {
//EDIT ICON
let editElement=document.createElement("img")
editElement.setAttribute("src","images/edit.svg")
editElement.setAttribute("style","width:20px;height:30px")


//DELETE ICON 
    let delElement = document.createElement("img")
    let delIconGraySrc = "images/delGray.svg"
    let delIconVioletSrc = "images/delViolet.svg"
    delElement.setAttribute("src", delIconGraySrc)

    delElement.onmouseover = function () {
        delElement.setAttribute("src", delIconVioletSrc)
    }
    delElement.onmouseout = function () {
        delElement.setAttribute("src", delIconGraySrc)
    }
//LIST ELEMENT 
    let listElement = document.createElement("li")
    let inputValue = inputElement.value
    if (!inputValue) {
        alert("Please Enter Any Task");
        inputElement.focus()
        return;
    }
    else if (tasks.includes(inputValue)) {
        alert("There is already such task");
        inputElement.value = ""
        inputElement.focus()
        return;
    }
    else {
        listElement.innerText = inputValue
        listElement.setAttribute("style", "font-size:1.6rem;height:30px;display:flex;align-items:center")
     
        let listDivElement = document.createElement("div")
        listDivElement.setAttribute("style", "display:flex;justify-content:space-between;")
        listDivElement.appendChild(editElement)
        listDivElement.appendChild(listElement)
        listDivElement.appendChild(delElement)
        
        editElement.onclick=()=>{
            let newInput = document.createElement("input");
            newInput.setAttribute("style","font-size:1.6rem;height:30px;text-align:center")
            newInput.value = listElement.innerText;
            listDivElement.replaceChild(newInput, listElement);
            newInput.focus();
            newInput.addEventListener("blur",()=>{
                let index = tasks.indexOf(listElement.innerText);
                tasks[index] = newInput.value;
                listElement.innerText = newInput.value;
                listDivElement.replaceChild(listElement, newInput);
            })
        }
  
        ulElement.appendChild(listDivElement)
        tasks.push(listElement.innerText)
        cardBody.style.display = "block"
       
        inputElement.value = ""

        function deleteElement() {
            ulElement.removeChild(listDivElement)
            let index = tasks.indexOf(listElement.innerText)
            tasks.splice(index, 1)
            inputElement.focus()
        }
        delElement.onclick = deleteElement

        inputElement.focus()

    }

}
buttonElement.addEventListener("click", addTask)

//FILTER ICON DISPLAY


let downGraySrc = "images/downGray.svg";
let downBlackSrc = "images/downBlack.svg";
let upGraySrc = "images/upGray.svg";
let upBlackSrc = "images/upBlack.svg";

filterIcon.addEventListener("mouseover", function () {
    if (filterIcon.src.endsWith(downGraySrc)) {
        filterIcon.setAttribute("src", downBlackSrc)
    }
    else if (filterIcon.src.endsWith(upGraySrc)) {
        filterIcon.setAttribute("src", upBlackSrc)
    }

})
filterIcon.addEventListener("mouseout", function () {
    if (filterIcon.src.endsWith(upBlackSrc)) {
        filterIcon.setAttribute("src", upGraySrc)
    }
    else if (filterIcon.src.endsWith(downBlackSrc)) {
        filterIcon.setAttribute("src", downGraySrc)
    }


})


//SORT TODO LIST
let sortOrder = 1;

filterIcon.addEventListener("click", function () {

    tasks.sort((a, b) => {
        if (a < b) {
            return -sortOrder;
        }
        if (a > b) {
            return sortOrder;
        }
        return 0;
    });
    console.log(tasks)
    ulElement.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        //EDIT ICON
        let editElement=document.createElement("img")
        editElement.setAttribute("src","images/edit.svg")
        editElement.setAttribute("style","width:20px;height:30px")
        // DELETE ICON 
        let delElement = document.createElement("img")
        let delIconGraySrc = "images/delGray.svg"
        let delIconVioletSrc = "images/delViolet.svg"
        delElement.setAttribute("src", delIconGraySrc)

        delElement.onmouseover = function () {
            delElement.setAttribute("src", delIconVioletSrc)
        }
        delElement.onmouseout = function () {
            delElement.setAttribute("src", delIconGraySrc)
        }
        let task = tasks[i];
        let listElement = document.createElement("li");
        listElement.innerText = task;
        listElement.setAttribute("style", "font-size:1.6rem;height:30px;display:flex;align-items:center");
        let listDivElement = document.createElement("div");
        listDivElement.setAttribute("style", "display:flex;justify-content:space-between;")
        listDivElement.appendChild(editElement)
        listDivElement.appendChild(listElement)
        listDivElement.appendChild(delElement)
        editElement.onclick=()=>{
            let newInput = document.createElement("input");
            newInput.setAttribute("style","font-size:1.6rem;height:30px;text-align:center")
            newInput.value = listElement.innerText;
            listDivElement.replaceChild(newInput, listElement);
            newInput.focus();
            newInput.addEventListener("blur",()=>{
                let index = tasks.indexOf(listElement.innerText);
                tasks[index] = newInput.value;
                listElement.innerText = newInput.value;
                listDivElement.replaceChild(listElement, newInput);
            })
        }
        ulElement.appendChild(listDivElement)

        function deleteElement() {
            ulElement.removeChild(listDivElement)
            let index = tasks.indexOf(listElement.innerText)
            tasks.splice(index, 1)
            inputElement.focus()
        }
        delElement.onclick = deleteElement

        inputElement.focus()

    }
    sortOrder *= -1;
    if(sortOrder===1){
        filterIcon.setAttribute("src", upBlackSrc)
    }
    else{
        filterIcon.setAttribute("src", downBlackSrc)
    }
})

