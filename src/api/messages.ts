import { Router } from "express";
import { Db } from "mongodb";



const setMessagsGet = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setMessagsGetlist = (router: Router, database: Db, route: string) => {
    router.get(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}

const setMessagsPost = (router: Router, database: Db, route: string) => {
    router.post(route, async (req, res) => {
        try {
            
        } catch(error) {
            res.status(500).json({success: false, status: 'error'});
            console.error('Error on route ' + route, error);
        }
    });
}


export const setMessags = (router: Router, database: Db, route: string) => {
    setMessagsGet(router, database, route + '/get');
    setMessagsGetlist(router, database, route + '/getlist');
    setMessagsPost(router, database, route + '/post');
}

