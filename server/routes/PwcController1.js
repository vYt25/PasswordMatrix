const express = require('express')

const cors = require('cors')

const router = express.Router();

const mysqlConnection = require('../connections');

router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

//get all employees
// router.get('/user', (req, res) => {
//      mysqlConnection.query(`
//         SELECT 
//         *
//         FROM users`,
//         (err, rows, fields) => {
//         if (!err)
//             res.send(rows)
//         else
//             res.send(err)
//     })

// get all systems

    // mysqlConnection.query(`
    //     SELECT 
    //     id,
    //     first_name,
    //     last_name
    //     FROM 
    //     users 
    //     where 
    //     deleted_at 
    //     IS 
    //     NULL`,
    //     (err, rows, fields) => {
    //     if (!err)
    //         res.send(rows)
    //     else
    //         res.send(err)
    // })
// })

// get all systems
router.get('/sid', (req, res) => {
    mysqlConnection.query(`
       SELECT 
       *,
       id as sid_id
       FROM sid`,
       (err, rows, fields) => {
       if (!err)
           res.send(rows)
       else
           res.send(err)
   })
})

//get all clients
router.get('/client', (req, res) => {
    mysqlConnection.query(`
       SELECT 
       *,
       id as client_id
       FROM client`,
       (err, rows, fields) => {
       if (!err)
           res.send(rows)
       else
           res.send(err)
   })
})


//get pwc password
router.get('/',(req,res)=>{
    mysqlConnection.query(
        `
        SELECT 
        pm.id,
        sid.id sid_id,
        c.id client_id,
        sid.sid,
        c.client,
        CONCAT(sid.sid, "/", c.client) as sap_sid,
        CONCAT(sid.sid, "/", c.client, pm.suid) as uid,
        pm.suid,
        pm.password
        FROM password_matrix as pm
        join sid on sid.id = pm.sid_id
        join client as c on c.id = pm.client_id
        WHERE pm.deleted_at is Null
        `
        ,
        (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            res.send(err)
        })
})

//get sid
router.get('/sid',(req,res)=>{
    mysqlConnection.query(
        `
        SELECT 
        sid, 
        id
        from sid
        where deleted_at is Null
        `
        ,
        (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            res.send(err)
        })
})

router.get('/client',(req,res)=>{
    mysqlConnection.query(
        `
        SELECT 
        client, 
        id
        from client
        where deleted_at is Null
        `
        ,
        (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            res.send(err)
        })
})

//get pwc password
router.get('/:sid_id/:client_id/:suid',(req,res)=>{
    mysqlConnection.query(
        `
        SELECT 
        pm.id,
        sid.id sid_id,
        c.id client_id,
        sid.sid,
        c.client,
        CONCAT(sid.sid, "/", c.client) as sap_sid,
        CONCAT(sid.sid, "/", c.client, pm.suid) as uid,
        pm.suid,
        pm.password
        FROM password_matrix as pm
        join sid on sid.id = pm.sid_id
        join client as c on c.id = pm.client_id
        WHERE pm.deleted_at is Null
        AND sid.id = '${req.params.sid_id}'
        AND c.id = '${req.params.client_id}'
        AND pm.suid = '${req.params.suid}'
        `
        ,
        (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            res.send(err)
        })
})

// soft delete
router.delete('/:id', (req, res) => {
    const query = `
    UPDATE
    password_matrix
    SET 
    deleted_at = now()
    where id = ${req.params.id}`

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('password Added')
        else
            res.send(err)
    })
})

// add user and relationship
router.post('/', (req, res) => {
    const query = `
        INSERT
        INTO
        password_matrix (
               sid_id,
               client_id,
               suid,
               password,
               created_at
       )
        VALUES (
                '${req.body.sid_id}',
                '${req.body.client_id}',
                '${req.body.suid}',
                '${req.body.password}',    
                now()
        )`

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('password Added')
        else
            res.send(err)
    })
})

// update user and relationship
router.patch('/', (req, res) => {

    const query = `
        UPDATE
        password_matrix
        SET 
        sid_id =  '${req.body.sid_id}',
        client_id = '${req.body.client_id}',
        suid = '${req.body.suid}',
        password = '${req.body.password}'
        where id = ${req.body.id}
    `

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('Record Updated')
        else
            res.send(err)
    })
})

//get specific employee based on id
// router.get('/:id', (req, res) => {
//     mysqlConnection.query(`
//             SELECT 
//             first_name,
//             last_name,
//             case when ${req.params.id} = user_id then 'me' else relationship end as relationship
//             FROM 
//             users 
//             WHERE 
//             id = ${req.params.id} 
//             AND deleted_at IS NULL`,
//         (err, rows, fields) => {
//             res.send(rows)
//         })
// })

//get user details and relatives
// router.get('/:id/:relationship', (req, res) => {
//     mysqlConnection.query(`
//             SELECT 
//             first_name,
//             last_name,
//             case when ${req.params.id} = id then 'me' else relationship end as relationship_status
//             FROM 
//             users 
//             WHERE (user_id = ${req.params.id} OR id = ${req.params.id})
//             AND relationship = '${req.params.relationship}'
//             AND deleted_at IS NULL`,
//         (err, rows, fields) => {
//             res.send(rows)
//         })
// })

//add user and relationship
// router.post('/', (req, res) => {
//     let errors = {}
//     if(! req.body.first_name)
//         errors.first_name = 'First Name is Required'
//     if(! req.body.first_name)
//         errors.last_name = 'Last Name is Required'
//     if(! req.body.relationship)
//         errors.relationship = 'Relationship is Required'

//     let errorCount = Object.keys(errors).length

//     if(errorCount > 0)
//         res.send(errors)

//     const query = `
//         INSERT
//         INTO
//         users (
//                first_name,
//                last_name,
//                relationship,
//                user_id,
//                created_at
//        )
//         VALUES (
//                 '${req.body.first_name}',
//                 '${req.body.last_name}',
//                 '${req.body.relationship}',
//                 '${req.body.user_id}',    
//                 now()
//         )`

//     mysqlConnection.query(query, (err, rows, fields) => {
//         if(!err)
//             res.send('User Added')
//         else
//             res.send(err)
//     })
// })


//delete specific employee based on id
// router.delete('/:id', (req, res) => {
//     mysqlConnection.query(`UPDATE users SET deleted_at = now() where id = ${req.params.id}`, (err, rows, fields) => {
//         res.send('User Deleted')
//     })
// })

//update employee based on id
// router.patch('/:id', (req, res) => {
//     const query = `
//         UPDATE 
//         users 
//         SET 
//             first_name = '${req.body.first_name}', 
//             last_name = '${req.body.last_name}', 
//             relationship = '${req.body.relationship}', 
//             user_id = '${req.body.user_id}' 
//         WHERE id = ${req.params.id}
//         `
//     mysqlConnection.query(query, (err, rows, fields) => {
//         if(!err)
//             res.send('User Updated')
//         else
//             res.send(err)
//     })
// })

module.exports = router;
