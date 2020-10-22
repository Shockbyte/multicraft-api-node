// npm install multicraft-api-node
const MulticraftAPI = require('multicraft-api-node');

const api = new MulticraftAPI({
    url: "https://localhost/api.php",
    user: "username",
    key: "apiKey"
});

async function examples() {
    try {
        const listServers = await api.listServers();
        console.log(listServers);
        // {
        //     success: true,
        //     errors: [],
        //     data: {
        //         Servers: { '1': 'test', '2': 'Minecraft Server', '3': 'Minecraft Server' }
        //     }
        // }
    } catch (e) {
        console.log(e);
    }

    api.listServersByConnection({ connection_id: '1' })
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    // {
    //     success: true,
    //     errors: [],
    //     data: { Servers: { '1': 'test', '2': 'Minecraft Server' } }
    // }
}

examples()
