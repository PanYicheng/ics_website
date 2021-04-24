// var Simditor = require('simditor');
require('utils/simditor')

console.log(module);
var $editor = $(module.elements).find('[name=content]');
console.log($editor);
var simditor = $editor.simditor();
// var editor = new Simditor({
//     textarea: $('[name=content]')
//     //optional options
// });  
