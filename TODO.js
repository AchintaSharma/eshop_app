
// only keep objects in array where obj.field !== 'money'
myArray = myArray.filter(function( obj ) {
    return obj.field !== 'money';
});

console.log(myArray);

// npm install nodemon

// Add product request body validator