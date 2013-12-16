function dynamicSort(pa,pb,pc) {
    var sortOrder = -1;
    return function (a,b) {
    	if(a[pa] != b[pa]){
        	var result = (a[pa] < b[pa]) ? -1 : (a[pa] > b[pa]) ? 1 : 0;
        }
        else if(a[pb] != b[pb]){
        	var result = (a[pb] < b[pb]) ? -1 : (a[pb] > b[pb]) ? 1 : 0;
        }
        else{
        	var result = (a[pc] < b[pc]) ? -1 : (a[pc] > b[pc]) ? 1 : 0;
        }
        return result * sortOrder;

    }
};

function dynamicSort2(pa) {
    var sortOrder = -1;
    return function (a,b) {
        var result = (a[pa] < b[pa]) ? -1 : (a[pa] > b[pa]) ? 1 : 0;
        return result * sortOrder;

    }
};
function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToARGB(i){
    return ((i>>24)&0xFF).toString(16) + 
           ((i>>16)&0xFF).toString(16) + 
           ((i>>8)&0xFF).toString(16) + 
           (i&0xFF).toString(16);
}
