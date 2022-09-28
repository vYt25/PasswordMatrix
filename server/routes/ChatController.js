const express = require('express')

const cors = require('cors')

const router = express.Router();

const Chat = require('../connections');

const now = require('../timestamp')

router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.delete('/:from/:to', (req, res) => {
    let param = [req.params.from, req.params.to]
    Chat.table('messages')
        .whereIn('Sender', param)
        .whereIn('Reciever', param)
        .update({ DeletedDate: now })
        .then(() => {
            res.send(req.params)
        })
})

router.post('/', (req, res) => {
    Chat.table('messages').insert(
        {
            Sender: req.body.from,
            Reciever: req.body.to,
            Message: req.body.msg
        }
    ).then(() => {
        Chat.select('*').from('messages')
            .where({ 'Sender': req.body.from, 'Reciever': req.body.to })
            .orderBy('id', 'desc')
            .limit(1)
            .then(data => {
                res.send(data)
            })
    })
})

router.get('/', (req, res) => {
    let param = req.query.users.split(",")
    Chat.select('*').from('messages')
        .whereIn('Sender', param)
        .whereIn('Reciever', param)
        .where('DeletedDate', null)
        .then(data => {
            res.send(data)
        })
})

module.exports = router;

