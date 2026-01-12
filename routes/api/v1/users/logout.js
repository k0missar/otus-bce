const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    res.clearCookie('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });
    res.sendStatus(200);
})

module.exports = router