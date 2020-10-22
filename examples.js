// npm install multicraft-api-node
const MulticraftAPI = require('multicraft-api-node');

const api = new MulticraftAPI({
    url: "https://localhost/api.php",
    user: "admin",
    key: "5kd9HaPid@mWqK"
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

    try {
        const listServersByConnection = await api.listServersByConnection({ connection_id: '1' });
        console.log(listServersByConnection);
        // {
        //     success: true,
        //     errors: [],
        //     data: { Servers: { '1': 'test', '2': 'Minecraft Server' } }
        // }
    } catch (e) {
        console.log(e);
    }
}

examples()
