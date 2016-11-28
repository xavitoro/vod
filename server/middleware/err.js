// // Pattern 1
// module.exports = function(err, req, res, next) {
//   console.log(err.message);
//   res.status(500);
// };

// Pattern 2
module.exports = function() {
  return function(err, req, res, next) {
    console.log('This is the error:', err.message);
    res.status(500);
  };
}
