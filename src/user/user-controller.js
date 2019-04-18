const UserService = require('./user-service');

/**
 * Cria um novo usuário 
 * @param {*} req Request
 * @param {*} res Response
 */
function newUser(req, res) {
    try {
        UserService.newUser(req.body.login, req.body.senha)
            .then(usr => {
                if (usr) {
                    res.status(201).send({ id: usr });
                } else {
                    res.status(400).send({ message: 'Falha ao cadastrar usuario' });
                }
            }, err => {
                res.status(400).send({ message: err.message || err })
            });
    } catch (err) {
        res.status(500).send({ message: err.message || err })
    }
}

module.exports = {
    newUser: newUser
}