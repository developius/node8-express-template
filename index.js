// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const http = require('http')
const handler = require('./function/handler')

const server = http.createServer((req, res) => {
  const body = ''
  req.on('data', chunk => {
    body += chunk
  })

  req.on('end', async () => {
    let result = await handler(body).catch(console.error)

    if (isObject(result) || isArray(result)) {
      result = JSON.stringify(result)
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(result)
    res.end()
  })
}).listen(3000, () => {
    console.log('OpenFaaS Node.js listening on port: 3000')
})

function isArray(a) {
    return Array.isArray(a)
}

function isObject(a) {
    return (!!a) && (a.constructor === Object)
}

