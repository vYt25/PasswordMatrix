const express = require('express')

const cors = require('cors')

const router = express.Router();

const mysqlConnection = require('../connections');

router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.post('/', (req, res) => {
    mysqlConnection.query(`
       SELECT 
       g.name as gender_name,
       u.first_name,
       u.last_name,
       u.username,
       u.is_admin
       FROM users u
       join genders g on g.id = u.gender
       where username = '${req.body.username}' 
       and password = '${req.body.password}' 
       and u.deleted_at is null`,
       (err, rows, fields) => {
       if (!err)
       if (rows.length == 1) {
            let user = rows[0]
                delete user.Password
                res.send(user)
            } else {
                res.status(500).json({ errorMsg: 'Invalid Username/Password' })
            }
       else
           res.send(err)
   })

    // Chat.select('*').from('users as A')
    //     .join('genders as B', 'B.GenderID', '=', 'A.Gender')
    //     .where({ Username: req.body.Username, Password: req.body.Password, 'A.DeletedDate': null })
    //     .then(data => {
    //         if (data.length == 1) {
    //             let user = data[0]
    //             delete user.Password
    //             res.send(user)
    //         } else {
    //             res.status(500).json({ errorMsg: 'Invalid Username/Password' })
    //         }
    //     })


})

module.exports = router;

