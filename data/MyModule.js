//function för att sortera ALLT, 
//Måste tydligen skicka in array för att modulen inte kommer åt denna annars
export function sortMyStuff(typeToSort, MyArr){   
    const arrToSort = MyArr;
    let result;

    if(arrToSort.isAscending == false){
        result = arrToSort.sort(function(a,b){       
            if(a[typeToSort] < b[typeToSort]){
                return -1;
            }
            if(a[typeToSort] > b[typeToSort]){
                return 1;
            }
            return 0;
        });
    }
    else{
        result = arrToSort.sort(function(a,b){       
            if(a[typeToSort] > b[typeToSort]){
                return -1;
            }
            if(a[typeToSort] < b[typeToSort]){
                return 1;
            }
            return 0;
        });
    }
    result.isAscending = !result.isAscending;
    return result;
}
