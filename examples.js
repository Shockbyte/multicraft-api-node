const MulticraftAPI = require('./index');

const api = new MulticraftAPI({
    url: "http://localhost/api.php",
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
        const listServersByConnection = await api.listServersByConnection();
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
