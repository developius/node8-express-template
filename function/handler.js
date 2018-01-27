"use strict"

// return a promise or use an async function

module.exports = async input => {
  return { status: 'You said: ' + JSON.stringify(input) }
}

