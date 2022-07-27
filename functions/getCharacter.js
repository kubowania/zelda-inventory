const fetch = require('node-fetch')

exports.handler = async () => {
    const query = `
    query {
      characters ( value: {character_id: "22222222-2222-2222-2222-222222222222"}) {
        values {
          character_id
          current_health
          max_health
          name
          shield_slot
          speed
          stamina
          weapon_slot
        }
      }
    }`

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