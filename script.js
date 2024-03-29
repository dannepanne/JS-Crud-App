import { sortMyStuff } from "./data/MyModule.js"
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const playerTableBody = document.getElementById('playerTableBody')
const submitNewButton = document.getElementById('submitNewButton')
const submitEditButton = document.getElementById('submitEditButton')
const newName =  document.getElementById('newName')
const newBorn = document.getElementById('newBorn')
const newJersey = document.getElementById('newJersey')
const newAge = document.getElementById('newAge')
const editName =  document.getElementById('editName')
const editAge = document.getElementById('editAge')
const editJersey = document.getElementById('editJersey')
const editBorn = document.getElementById('editBorn')
const search = document.getElementById('search')
const sortPlayers = document.getElementById('sortPlayers')
const sortJersey = document.getElementById('sortJersey')
const sortCity = document.getElementById('sortCity')
const sortAge = document.getElementById('sortAge')
const cancelEditButton = document.getElementById('cancelEditButton')
const delPlayerButton = document.getElementById('delPlayerButton')
const cancelNewButton = document.getElementById('cancelNewButton')

const baseApi = 'https://hockeyplayers.systementor.se/danneee/player'

class hockeyPlayer{
    constructor(id, namn, jersey, age, born){
    this.id = id;
    this.namn = namn;
    this.jersey = jersey;
    this.age = age;
    this.born = born;
    }
}

sortPlayers.addEventListener("click", ()=>{
    let sortedPlayers = sortMyStuff("namn", players);
    playerTableBody.innerHTML ='';
    sortedPlayers.forEach((item)=>{
        renderTr(item);
        console.log(item);
    });
 })
    sortJersey.addEventListener("click", ()=>{
    let sortedJerseys = sortMyStuff("jersey", players);
    playerTableBody.innerHTML ='';
    sortedJerseys.forEach((item)=>{
        renderTr(item);
        console.log(item);
    });
 })

 sortAge.addEventListener("click", ()=>{
    let sortedAge = sortMyStuff("age", players);
    playerTableBody.innerHTML ='';
    sortedAge.forEach((item)=>{
        renderTr(item);
        console.log(item);
    });
 })
 sortCity.addEventListener("click", ()=>{
    let sortedBorn = sortMyStuff("born", players);
    playerTableBody.innerHTML ='';
    sortedBorn.forEach((item)=>{
        renderTr(item);
        console.log(item);
    });
 })


search.addEventListener("keyup", ()=>{

    const lowerCase = search.value.toLowerCase();

    const filteredList = players.filter(item=>item.namn.toLowerCase().includes(lowerCase));

    playerTableBody.innerHTML ='';

    filteredList.forEach((item)=>{
        renderTr(item);
        console.log(item);
     });
})


function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
}

listLink.addEventListener("click",()=>{ 
    showSection('sectionList');    
});

newLink.addEventListener("click",()=>{ 
    showSection('sectionNew');    
});


function renderTr(player){
    let jsCall = `editPlayer(${player.id})`;
    let template = `<tr>
                        <td>${player.namn}</td>
                        <td>${player.jersey}</td>
                        <td>${player.age}</td>
                        <td>${player.born}</td>
                        <td><a href="#" onclick="${jsCall}">EDIT</td>
                    </tr>`
    playerTableBody.innerHTML = playerTableBody.innerHTML + template;
    }

    function refreshItems(){
        players = [];   
        playerTableBody.innerHTML = '';
        fetch(baseApi)
            .then(response=>response.json())
            .then(array=>{              
                array.forEach(play=>{
                    let p = new hockeyPlayer(play.id, play.namn, play.jersey, play.age, play.born)
                    players.push(p)
                });   
                    players.forEach( (item) => {
                    renderTr(item);
                });        
            })
        }
    
        //nedan bör funka men fick inte till det på en gång så lämnar det för nu
    // function refreshItems(){
    //      const res = await fetch(baseApi);
    //      const array = await res.json();
    //      players = array.map(p=> new hockeyPlayer(p.id, p.namn, p.jersey, p.age, p.born));
    //      players.forEach(renderTr);
    //      }

    let editingPlayer = null;

    window.editPlayer = editPlayer;

    function editPlayer(id){
        editingPlayer = players.find((item)=>item.id == id)
        editName.value = editingPlayer.namn;
        editJersey.value = editingPlayer.jersey;
        editAge.value = editingPlayer.age;
        editBorn.value = editingPlayer.born;
        showSection('sectionEdit');    
    }
    

    cancelNewButton.addEventListener("click", ()=>{
        showSection('sectionList'); 
    });

    cancelEditButton.addEventListener("click", ()=>{
        showSection('sectionList'); 
    });
    
    submitEditButton.addEventListener("click",()=>{

        const changedPlayerValues = {
            namn: editName.value,
            jersey: editJersey.value,
            age: editAge.value,
            born: editBorn.value,           
        };

        const reqParams = {
            headers:{
                'Content-Type': 'application/json'
            },       
            method:"PUT",
            body:JSON.stringify(changedPlayerValues)
        };
        fetch(baseApi + '/' + editingPlayer.id ,reqParams)
            // .then(res=>res.json()) -> kan krasha
            // .then(res=>{
                .then(response=>{
                
                refreshItems();
                showSection('sectionList');    
            });
    });

    delPlayerButton.addEventListener("click", ()=>{
        alert("Not implemented in API?");
    })

    ///fixa skicka upp ny spelare! -done!
    submitNewButton.addEventListener("click",()=>{ 

        const newPlayer = { 
            namn: newName.value,
            jersey: newJersey.value,
            age: newAge.value,
            born: newBorn.value          
        };
    
        const reqParams = {
            headers:{
                'Content-Type': 'application/json'
            },  
            method:"POST",
            body:JSON.stringify(newPlayer)
        };
        fetch(baseApi,reqParams)
            .then(res=>res.json())
            .then(json=>{
                const play = new hockeyPlayer(
                    json.id,
                    newName.value,
                    newJersey.value, 
                    newAge.value,
                    newBorn.value)
    
                players.push(play); 
                renderTr(play);
                
                showSection('sectionList');    
            })
    });

    let players = [];
    refreshItems();
    console.log(players);
    
showSection('sectionList');




