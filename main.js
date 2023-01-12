const inputButton = document.getElementById("input-btn"); 
let deleteButton = document.getElementById("delete-btn");
let tabBtn = document.getElementById("savetab-btn");
const inputEl = document.getElementById("input-el");
let ulEl = document.getElementById("ul-el");
let myLeads = [];


// getting the leads stored in local storage and storing the in a variable
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );
console.log(leadsFromLocalStorage);

// using truthy and falsy to always render the data stored in the local storage 
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
    }


inputButton.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    render(myLeads);
    inputEl.value = "";
// saving the value of my leads on the local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    console.log( localStorage.getItem("myLeads") );
})


// for loop that logs out all the items in an array
function render(Leads){
    let listItem = "";
    for(i = 0; i < Leads.length; i++){
    let output = Leads[i];
    listItem += `
    <li>
    <a href="${output}" target ='_blank'>${output}</a> 
    </li>`;
    }

ulEl.innerHTML = listItem;
}


// delete button function, when clicked removes stored data in the local storage
deleteButton.addEventListener('click', function(){
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML = "";
})



// save tab button 

// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]


tabBtn.addEventListener('click', function() {
        // console.log( tabs[0].url);
         // conversing with chrome api to get current tab
         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        myLeads.push( tabs[0].url );
        localStorage.setItem("myLeads", JSON.stringify( myLeads )  )
        render(myLeads);
    })

    
})