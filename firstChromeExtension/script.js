let myLeads = []
const inputLead = document.getElementById("inputID")
const saveEventListener = document.getElementById("saveInputButton")
const leadsRenderer = document.getElementById("renderingLeads")
const deleteListener = document.getElementById("deleteButton")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const saveListener = document.getElementById("saveTab")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLead(myLeads)
}

//Getting data from chrome api and storing it in the array for Rendering
saveListener.addEventListener("click", function(){    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLead(myLeads)
    })
})
//Checking the array and then rendering the data insite the array
function renderLead(leads){
    let leadsListItem = "" 
    for(let i=0;i<leads.length;i++){
       let renderLeadsArray = leads[i]
        leadsListItem += `<li>
        <a target='_blank' href="${renderLeadsArray}">
        ${renderLeadsArray} 
        </a>
        </li>`
        // This whole expression upper is the teplate string for this variable : "<li><a target='_blank' href='"+renderLeadsArray+"'>" + renderLeadsArray + "</a></li>">
    }
    
    leadsRenderer.innerHTML = leadsListItem
}
//Delete all the data from localStorage and from User Interface
deleteListener.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLead(myLeads)
})
//Getting the data inside the input field and storing in the array 
saveEventListener.addEventListener("click", function(){
    myLeads.push(inputLead.value)
    inputLead.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLead(myLeads)
console.log(localStorage.getItem("myLeads"))
})
localStorage.clear()