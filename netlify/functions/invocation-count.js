'use strict';
 
let invocation_count = 0
 
exports.handler = async function(event, context) {
  invocation_count++
  console.log(invocation_count)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ invocation_count })
  }
}
