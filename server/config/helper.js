exports.removeCourse = function (someArray , obj){
    for (var i =0; i < someArray.length; i++){
        if (someArray[i].courseName === obj) {
            someArray.splice(i,1);
            break;
        }
    }
}

exports.removeCategory = function (someArray , obj){
    for (var i =0; i < someArray.length; i++){
        if (someArray[i].categoryName === obj) {
            someArray.splice(i,1);
            break;
        }
    }
}

exports.courseExists = function (arr, courseName) {
    return arr.some(function(el) {
      return el.courseName === courseName;
    }); 
}

exports.categoryExists = function (arr, categoryName) {
    return arr.some(function(el) {
      return el.categoryName === categoryName;
    }); 
}