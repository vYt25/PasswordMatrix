const express = require('express')

const cors = require('cors')

const router = express.Router();

const mysqlConnection = require('../connections');

router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

// get all systems
router.get('/sid', (req, res) => {
    mysqlConnection.query(`
       SELECT 
       *,
       id as sid_id
       FROM sid
       WHERE deleted_at is null`,
       (err, rows, fields) => {
       if (!err)
           res.send(rows)
       else
           res.send(err)
   })
})

router.get('/client', (req, res) => {
    mysqlConnection.query(`
       SELECT 
       *,
       id as client_id
       FROM client
       WHERE deleted_at is null`,
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
        pm.password,
        case when sid.deleted_at is null and c.deleted_at is null then 1 else 0 end as is_editable
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

// add system
router.post('/addSystem', (req, res) => {
    const query = `
        INSERT
        INTO
        sid (
               sid,
               created_at
       )
        VALUES (
                '${req.body.sid.toUpperCase()}',    
                now()
        )`

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('System Added')
        else
            res.send(err)
    })
})

// add client
router.post('/addClient', (req, res) => {
    const query = `
        INSERT
        INTO
        client (
               client,
               created_at
       )
        VALUES (
                '${req.body.client}',    
                now()
        )`

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('System Added')
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

// delete sid
router.delete('/sid/:id', (req, res) => {

    const query = `
        UPDATE 
        sid
        SET 
        deleted_at = now()
        where id = ${req.params.id}
    `

    console.log(query)

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('SID Deleted')
        else
            res.send(err)
    })
})

// delete client
router.delete('/client/:id', (req, res) => {

    const query = `
        UPDATE 
        client
        SET 
        deleted_at = now()
        where id = ${req.params.id}
    `

    console.log(query)

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err)
            res.send('Client Deleted')
        else
            res.send(err)
    })
})

module.exports = router;
