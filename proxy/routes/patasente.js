const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const BASE_URL = 'https://patasente.me/phantom-api';
const { PATASENTE_API_KEY, PATASENTE_GATEWAY_KEY } = process.env;

router.post('/', async function (req, res, next) {
    try {
        const URL = `${BASE_URL}/send-transaction-token/${PATASENTE_API_KEY}/${PATASENTE_GATEWAY_KEY}`

        const results = await axios.post(URL,req.body)
        // console.log(results.data)
        if (results.data.indexOf('four')) {
            res.json({
                'result': 'success',
            })
        } else {
            res.json({
                'result': 'fail',
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            'msg': 'Api not reached!',
            'your_body': req.body
        })
    }
});

router.post('/send-payment', async function (req, res, next) {
    try {
        const URL = `${BASE_URL}/pay-with-patasente/${PATASENTE_API_KEY}/${PATASENTE_GATEWAY_KEY}`
        const results = await axios.post(URL,req.body)
        // console.log(results.data)
        if (results.data.indexOf('Thank')) {
            res.json({
                'result': 'success',
            })
        } else {
            res.json({
                'result': 'fail',
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            'msg': 'Api not reached!',
            'your_body': req.body
        })
    }
});

module.exports = router;
