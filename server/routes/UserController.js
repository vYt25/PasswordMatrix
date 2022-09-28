const express = require('express')

const cors = require('cors')

const router = express.Router();

const mysqlConnection = require('../connections');

const now = require('../timestamp')


router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.post('/', (req, res) => {
    // Chat.table('users').select('*').where('Username', req.body.Username)
    //     .then(data => {
    //         if (data.length > 0) {
    //             res.status(500).send({ errorMsg: 'Username not available' })
    //         } else {
    //             Chat.table('users').insert(req.body).then(() => {
    //                 res.status(200).json({})
    //             })
    //         }
    //     })
    
    mysqlConnection.query(`
       SELECT 
       *
       FROM users
       where username = '${req.body.username}'`,
       (err, rows, fields) => {
       if(!err)
            if (rows.length > 0) {
                res.status(500).send({ errorMsg: 'Username not available' })
            } else {
                mysqlConnection.query(`
                INSERT INTO users(first_name, last_name, gender, username, password, created_at, updated_at)
                VALUES ('${req.body.first_name}','${req.body.last_name}','${req.body.gender}','${req.body.username}','${req.body.password}',
                '${req.body.updated_at}','${req.body.updated_at}')`,
                (e, r, f) => {
                    if (!e){
                        res.status(200).json({})
                    }else{
                        res.send(e)
                    }
                })
            }
       else   
            res.send(err)
    })
       
})


router.get('/', (req, res) => {
    Chat.raw(`SELECT A.UserID,A.FirstName,A.MiddleName,A.LastName,A.Gender,B.GenderName,A.DeletedDate,false as Online,null as Socket FROM users as A JOIN genders as B on B.GenderID = A.Gender`)
        .then(response => {
            res.send(response[0])
        }).catch(err => {
            console.log(err)
        })
})

router.get('/details', (req, res) => {
    Chat.raw(`SELECT A.UserID,A.FirstName,A.MiddleName,A.LastName,A.Gender,B.GenderName,A.DeletedDate,false as Online,null as Socket FROM users as A JOIN genders as B on B.GenderID = A.Gender WHERE A.UserID != ${req.query.userid} AND A.DeletedDate IS NULL`)
        .then(response => {
            res.send(response[0])
        }).catch(err => {
            console.log(err)
        })
})

router.patch('/', (req, res) => {
    let UserID = req.body.UserID
    let values = req.body
    delete values.UserID
    delete values.GenderName
    delete values.GenderID
    delete values.Online
    delete values.Socket
    delete values.CreatedDate
    values.UpdatedDate = now
    Chat.table('users')
        .where("UserID", UserID)
        .update(values)
        .then(() => {
            res.send('Success')
        })
})


router.delete('/:UserID', (req, res) => {
    Chat.table('users')
        .where("UserID", req.params.UserID)
        .update({ DeletedDate: now })
        .then(() => {
            res.send('Success')
        })
})

router.put('/:UserID', (req, res) => {
    Chat.table('users')
        .where("UserID", req.params.UserID)
        .update({ DeletedDate: null })
        .then(() => {
            res.send('Success')
        })
})
module.exports = router;

