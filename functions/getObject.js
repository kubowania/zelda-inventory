const fetch = require('node-fetch')

exports.handler = async (event) => {
    const object_id = event.body

    const query = `
    query {
      objects ( value: {object_id: ${object_id}}) {
        values {
          object_id
          description
          image
          name
          stackable
          type
          value_in_rupees
          weight
        }
      }
    }
    `

    const url = process.env.ASTRA_ENDPOINT
    const token = process.env.ASTRA_TOKEN

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-cassandra-token': token
        },
        body: JSON.stringify({ query })
    }

    const response = await fetch(url, options)

    try {
        const responseBody = await response.json()
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody)
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}