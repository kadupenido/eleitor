const VoterService = require('./voter-service');
const Voter = require('./voter-model');

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

/**
 * Busca um eleitor pelo id
 * @param {*} req Request
 * @param {*} res Respose
 */
function getVoter(req, res) {
    try {
        VoterService.getVoter(req.params.id)
            .then(voter => {
                res.status(200).send(voter);
            }, err => {
                res.status(500).send({ message: err.message || err });
            });
    } catch (err) {
        res.status(500).send({ message: err.message || err });
    }
}

/**
 * Salva um eleitor
 * @param {*} req Request
 * @param {*} res Respose
 */
function saveVoter(req, res) {

    try {

        if (req.params.id != 'undefined') {
            VoterService.getVoter(req.params.id)
                .then(voter => {

                    if (!voter) {
                        res.status(400).send({ message: 'Eleitor não encontrado' });
                    }

                    voter.set(req.body);

                    voter.save().then(() => {
                        res.status(200).send(voter);
                    }, err => {
                        res.status(500).send({ message: err.message || err });
                    });
                });
        }
        else {
            let voter = new Voter(req.body);

            voter.save().then(() => {
                res.status(200).send(voter);
            }, err => {
                res.status(500).send({ message: err.message || err });
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

function deleteVoter(req, res) {
    try {
        if (req.params.id == 'undefined') {
            res.status(500).send({
                message: 'Informe o identificador do eleitor'
            });
        } else {
            VoterService.deleteVoter(req.params.id)
                .then(() => {
                    res.status(200).send();
                }, err => {
                    res.status(500).send({ message: err.message || err });
                });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

module.exports = {
    getVoters: getVoters,
    getVoter: getVoter,
    saveVoter: saveVoter,
    deleteVoter: deleteVoter
}