const VoterService = require('./voter-service');

/**
 * Busca os eleitores cadastrados
 * @param {*} req Request
 * @param {*} res Response
 */
function getVoters(req, res) {
    try {
        VoterService.getVoters(req.body.filters, req.body.page, req.body.sort)
            .then(voters => {
                res.status(200).send(voters);
            }, err => {
                res.status(500).send({ message: err.message || err });
            });
    } catch (err) {
        res.status(500).send({ message: err.message || err });
    }
}

module.exports = {
    getVoters: getVoters
}