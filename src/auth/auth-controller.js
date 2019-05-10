const AuthService = require('./auth-service');

/**
 * Autentica a sessão do usuário
 * @param {*} req Request
 * @param {*} res Response
 */
function authenticate(req, res) {
    try {
        AuthService.generateToken(req.body.user, req.body.password)
            .then(resToken => {
                res.status(200).send(resToken);
            }, err => {
                res.status(500).send({ message: err.message || err });
            });
    } catch (err) {
        res.status(500).send({ message: err.message || err });
    }
}

/**
 * Autoriza as requisições
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 */
function authorize(req, res, next) {
    try {
        const resAuth = AuthService.authorize(req.token);
        if (resAuth.success) {
            req.id = resAuth.id;
            next();
        } else {
            res.status(401).send({
                message: resAuth.message
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message || err });
    }
}

module.exports = {
    authenticate: authenticate,
    authorize: authorize
}