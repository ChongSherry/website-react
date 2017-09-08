const express = require('express');
const db = require("mongoose");
const ho = require("../base/httpOutput");
const async = require("async");

const router = express.Router();

router.post("/create", (req, res) => {
    let m = db.model("user");
    const {
        user_id,
        password,
        name,
        sex,
        email,
        mobile
        
    } = req.body;

    m.create({
        user_id,
        password: md5(password),
        name,
        locked
    }, (err, record) => {
        if (err) {
            ho(res, ho.status.e500, err);
        } else {
            ho(res, ho.status.ok);
        }
    })
});

module.exports = router;