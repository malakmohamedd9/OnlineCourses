exports.removeTask = function (someArray , obj){
    for (var i =0; i < someArray.length; i++){
        if (someArray[i].title === obj) {
            someArray.splice(i,1);
            break;
        }
    }
}

exports.removeList = function (someArray , obj){
    for (var i =0; i < someArray.length; i++){
        if (someArray[i].listName === obj) {
            someArray.splice(i,1);
            break;
        }
    }
}

exports.taskExists = function (arr, title) {
    return arr.some(function(el) {
      return el.title === title;
    }); 
}