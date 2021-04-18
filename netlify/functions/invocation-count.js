'use strict';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let invocation_count = 0
 
exports.handler = async function(event, context) {
  invocation_count++
  console.log(invocation_count)
  
  await sleep(1000)

  return {
    statusCode: 200,
    body: JSON.stringify({ invocation_count })
  }
}
