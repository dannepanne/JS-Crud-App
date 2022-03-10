//function för att sortera ALLT, endast högt>lågt iplementerat. Switch sats för att byta ej gjord. 
//Måste skicka in players array för att modulen inte kommer åt denna annars
export function sortMyPlayers(typeToSort, playerArr){   
    const players = playerArr;
    console.log(typeToSort);
    console.log(typeof(typeToSort));
    let result = players.sort(function(a,b){       
        if(a[typeToSort] < b[typeToSort]){
            return -1;
        }
        if(a[typeToSort] > b[typeToSort]){
            return 1;
        }
        return 0;
    });
    
    return result;
}
