const bcrypt = require('bcrypt');


const users = (router, db, prefix) => {

    router.post(prefix + '/login', async (req, res) => {

    });

    router.post(prefix + '/logout', async (req, res) => {

    });

    router.post(prefix + '/checktoken', async (req, res) => {

    });

    router.post(prefix + '/register', async (req, res) => {
        try {
            const user = {
                username: req.body.username,

            }
        } catch {
            res.json({success: false, response: 'error'})
        }
    });

    router.get(prefix + '/getdata', async (req, res) => {

    });

}

module.exports = users;