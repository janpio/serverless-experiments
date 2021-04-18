'use strict';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const crypto = require("crypto");
const lambdaid = crypto.randomBytes(16).toString("hex");

let invocation_count = 0
 
exports.handler = async function(event, context) {
  console.log({event})

  let testrun = ''
  if(event.queryStringParameters.testrun) {
    testrun = event.queryStringParameters.testrun
  }

  const upsert = await prisma.lambda.upsert({
    where: { lambdaid: lambdaid },
    create: {
      lambdaid: lambdaid,
      invocation_count: 1,
      testrun: {
        connectOrCreate: {
          where: { name: testrun },
          create: { name: testrun },
        }
      }
    },
    update: {
      invocation_count: {
        increment: 1
      }
    },
    include: {
      testrun: true
    }
  })
  console.log(upsert)

  invocation_count++
  console.log(invocation_count)
  
  await sleep(1000) // TODO distract DB time from sleep time

  let result = { invocation_count, testrun, upsert }
  console.log({ result })

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
