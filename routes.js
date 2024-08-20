// const stored = new Object();



// function classMethod (method, url, funct = '') {
//     if (method === 'GET') {
//         const keys = `${method}-${url}`;
//         const values = stored[keys];
//         return `GET: ${values}`;
//     } else if (method === 'POST') {
//         const keys = `${method}-${url}`;
//         const values = funct;
//         const saved = stored[keys] = values;
//         return saved;
//     }
//     // } else if (method === 'PUT') {
//     //     router.put(url, funct);
//     // } else if (method === 'DELETE') {
//     //     router.delete(url, funct);
//     // } else if (method === 'PATCH') {
//     //     router.patch(url, funct);
//     // }

// }

class Frameworsito {
    constructor() {
        this.router = new Object();
    }
    get(ruta, funct) {
        this.router[`get-${ruta}`] = funct;
    }
    post(ruta, funct) {
        this.router[`post-${ruta}`] = funct;
    }
    put(method, ruta, funct) {
        this.router[`${method}-${ruta}`] = funct;
    }
    delete(method, ruta) {
        this.router[`${method}-${ruta}`];
    }
    async handleRoutes(req, res) {
        req = await bodyData(req);
        const { method, url , body} = req;

        const keys = `${method.toLowerCase()}-${url}`;
        const values = this.router[keys];
        if (values && method === 'GET') {
            res.end(values());
    
        } else if (values && method === 'POST' && body) {
            const value = await values(body);
            res.end(value);
        } else if (values && method === 'POST' && !body) { 
            res.end('No body data');
        } 

        for (const routeKey in this.router) {
            if (routeKey.startsWith(method.toLowerCase())) {
                const routePattern = routeKey.split('-')[1];
                const regex = new RegExp(`^${routePattern.replace(/:\w+/g, '([\\w-]+)')}$`);
                const match = url.match(regex);

                if (match) {
                    const params = {};
                    const paramNames = [...routePattern.matchAll(/:(\w+)/g)].map(m => m[1]);

                    paramNames.forEach((name, index) => {
                        params[name] = match[index + 1];
                    });

                    if (method === 'GET') {
                        res.end(this.router[routeKey](params));
                    } else if (method === 'POST' && body) {
                        const value = await this.router[routeKey](body, params);
                        res.end(value);
                    } else if (method === 'POST' && !body) {
                        const value = await this.router[routeKey](params);
                        res.end(value);
                    }
                    return;
                }
            }
        }


        res.statusCode = 404;
        res.end('404 - Not Found Route');
        

    }
}

async function bodyData(req) {

    return new Promise((resolve, reject) => {
        let data = ''
        req.on('data', (chunk) => {
            data += chunk
        })
        req.on('end', () => {
            req.body = data ? JSON.parse(data) : undefined || null;
            resolve(req)
        })

        req.on('error', (err) => {
            reject(err)
        })
    })
}

module.exports = {
    Frameworsito
};