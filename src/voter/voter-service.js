const Voter = require('./voter-model');

/**
 * Recupera os eleitores cadastradas
 * @param {*} filters Filtros
 * @param {number} page Numero da pagina
 * @param {*} sort Ordenação
 */
function getVoters(filters, page, sort) {

    var query = {};

    if (filters) {

        if (filters.nome) {
            query.nome = { $regex: `.*${filters.nome}.*`, $options: ' i' };
        }

        if (filters.sexo) {
            query.sexo = filters.sexo;
        }
    }

    var options = {
        page: page,
        limit: 10,
        lean: true
    };

    // Ordenação
    options.sort = sort ? sort : { nome: 'asc' };

    return Voter.paginate(query, options).then(voters => {
        return voters;
    });
}

module.exports = {
    getVoters: getVoters
}