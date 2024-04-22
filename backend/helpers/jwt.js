
// middle so user cannot access the apis without a token. 

const {expressjwt} = require('express-jwt')

function authJwt() {

        const api = process.env.api

        return expressjwt({
                secret: process.env.secret,
                algorithms: ['HS256'],
                isRevoked
        })
        .unless({ //unluess to exclude apis that might need to access before logging in
                path: [
                        // the * means everything after the products *
                    {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
                    {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
                    {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
                    {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
                    `${api}/users/login`,
                    `${api}/users/register`,
                    `${api}/user`,
                    `${api}/user`,
                ]
            })
}


// req is whether you want to get a message from the body, 
// payload is the data that are inside the token
async function isRevoked (req, payload, done) {
        // if not an admin reject token but if an admin grant access
        if(!payload.isAdmin) done(null, true)
        done()
}

module.exports = authJwt