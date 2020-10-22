# multicraft-api-node

A Node.js wrapper for the Multicraft API.


### Example use

`npm i multicraft-api-node`

```
const MulticraftAPI = require('multicraft-api-node');

const api = new MulticraftAPI({
    url: "https://localhost/api.php",
    user: "username",
    key: "apiKey"
});

api.listServersByConnection({ connection_id: '1' })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

// {
//     success: true,
//     errors: [],
//     data: { Servers: { '1': 'test', '2': 'Minecraft Server' } }
// }

```
To view more examples of use, check out the `examples.js` file.

### Manual Updating

The `methods.json` file automatically generates the functions. To update this file:

1. Download the latest MulticraftAPI.php file (from the Multicraft panel files)
2. Convert the array to a JSON object.
3. Paste into the `methods.json` file (and test that it works).
