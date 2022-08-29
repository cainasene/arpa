const Assignment = require('../models/Assignment')()
const mock = require('./mock/data')
const controller = {}




controller.create = async (req, res) => {
    switch(req.body.type){
        case 'banheiro':
            try{
                mock.banheiro.user = req.authenticatedId
                await Assignment.create(mock.banheiro)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'banho':
            try{
                mock.banho.user = req.authenticatedId
                await Assignment.create(mock.banho)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'despir':
            try{
                mock.despir.user = req.authenticatedId
                await Assignment.create(mock.despir)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'vestir':
            try{
                mock.vestir.user = req.authenticatedId
                await Assignment.create(mock.vestir)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'escovar_dentes':
            try{
                mock.escovar_dentes.user = req.authenticatedId
                await Assignment.create(mock.escovar_dentes)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'dormir':
            try{
                mock.dormir.user = req.authenticatedId
                await Assignment.create(mock.dormir)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'lavar_maos':
            try{
                mock.lavar_maos.user = req.authenticatedId
                await Assignment.create(mock.lavar_maos)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        case 'cortar_unhas':
            try{
                mock.cortar_unhas.user = req.authenticatedId
                await Assignment.create(mock.cortar_unhas)
                res.status(201).end()
                break;
            }
            catch(error) {console.log(error)}
        default:
            res.status(404).end()
    }
}

controller.delete = async (req, res) => {
    try {
        const id = req.body._id
        const result = await Assignment.findByIdAndDelete(id)
        if(result) res.status(204).end()
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)        
    }
}

controller.retrieve = async (req, res) => {
    try {
        const result = await Assignment.find({user: req.authenticatedId})
        console.log(result)
        // HTTP 200: OK é implícito aqui
        res.send(result)
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)        
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Assignment.findOne({ _id: id, user: req.authenticatedId})
        // Se tivermos um resultado, retornamos com status HTTP 200
        if(result) res.send(result)
        // Senão, retornamos HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)        
    }
}
module.exports = controller