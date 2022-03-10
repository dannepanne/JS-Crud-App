//function för att sortera ALLT, 
//Måste tydligen skicka in array för att modulen inte kommer åt denna annars
export function sortMyStuff(typeToSort, MyArr){   
    const arrToSort = MyArr;
    let result;   
    if(arrToSort.isAscending == false || rememberTypeSorted != typeToSort){
        result = arrToSort.sort(function(a,b){       
            if(a[typeToSort] < b[typeToSort]){
                return -1;
            }
            if(a[typeToSort] > b[typeToSort]){
                return 1;
            }
            return 0;
        });

        temp=typeToSort;
        console.log(temp)
        console.log(arrToSort.isAscending)
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
let rememberTypeSorted = null;