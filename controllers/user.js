const User = require('../models/User')()
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')

const controller = {}

controller.create = async (req, res) => {

    try {
        const email = await User.findOne({email : req.body.email}).select('email')
        if(! email) {
            if(!req.body.password) return res.status(500).send({error: 'Path "password" is required'})

            req.body.password_hash = await bcrypt.hash(req.body.password, 12)

            delete req.body.password

            const result = await User.create(req.body)
            console.log(result)
            const token = jwt.sign({id : result._id}, process.env.SECRET, {expiresIn : 3600})
            res.json({auth : true, token})
        }
        else {
            res.status(400).send({error: "Email ja cadastrado"})
        }
    }
    catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.login = async (req, res) => {
    try {
        console.log('entrou');
        const user = await User.findOne({email: req.body.email}).select('password_hash')
        if(! user){
            res.status(401).end()
        }
        else {
            bcrypt.compare(req.body.password, user.password_hash, function(err, result){
                if(result) {
                    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: 3600})
                    res.json({auth: true, token})

                }
                else {
                    res.status(401).end()
                }
            })
        }
    }
    catch(error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.logout = async(req, res) => {
    res.send({auth: false, token: null})
}

module.exports = controller