const express = require('express');


const users = (router, db, prefix) => {

    router.post(prefix + '/login', async (req, res) => {

    });

    router.post(prefix + '/logout', async (req, res) => {

    });

    router.post(prefix + '/checktoken', async (req, res) => {

    });

    router.post(prefix + '/register', async (req, res) => {
        try {

        } catch {
            res.json({success: false, response: 'error'})
        }
    });

    router.get(prefix + '/getdata', async (req, res) => {

    });

}

module.exports = users;