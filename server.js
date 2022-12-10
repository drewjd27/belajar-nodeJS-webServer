const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    if(url === '/') {
        // logika response bila url bernilai '/'
        if(method === 'GET') {
            // response ketika client menggunakan GET
            response.end(`<h1>Ini adalah hompage</h1>`);
        } else {
            // response bila client tidak menggunakan GET
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }
    } else if(url === '/about') {
        //logika response bila url bernilai '/about'
        if(method === 'GET') {
            //response bila client menggunakan GET
            response.end('<h1>Halo! Ini adalah halaman about</h1>')
        } else if(method === 'POST') {
            //response bila client menggunakan POST
            let body = [];
 
            request.on('data', (chunk) => {
            body.push(chunk);
            });

            request.on('end', () => {
                nody = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
            // response bila client tidak menggunakan GET ataupun POST
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    } else {
        // logika respons bila url bukan '/' atau '/about'
        response.end(`<h1>Halaman tidak ditemukan</h1>`);
    }

    // if(method === 'GET') {
    //     response.end(`<h1>Hello!</h1>`);
    // }
    
    // if(method === 'POST') {
    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const {name} = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //     })
    // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server sedang berjalan pada http://${host}:${port}`);
});