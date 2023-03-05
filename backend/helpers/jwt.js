
const {expressjwt} = require('express-jwt')

function authJwt() {

        const api = process.env.api

        return expressjwt({
                secret: process.env.secret,
                algorithms: ['HS256'],
                // isRevoked
        })
        .unless({
                path: [
                    {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
                    {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
                    {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
                    {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
                    `${api}/users/login`,
                    `${api}/users/register`,
                ]
            })
}


async function isRevoked (req, payload, done) {
        if(!payload.isAdmin) done(null, true)
        done()
}

module.exports = authJwt