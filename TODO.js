//check why the password is not getting removed - user.controller.js
var myArray = [
    {field: 'id', operator: 'eq', value: 'id'}, 
    {field: 'cStatus', operator: 'eq', value: 'cStatus'}, 
    {field: 'money', operator: 'eq', value: 'money'}
];

// only keep objects in array where obj.field !== 'money'
myArray = myArray.filter(function( obj ) {
    return obj.field !== 'money';
});

console.log(myArray);