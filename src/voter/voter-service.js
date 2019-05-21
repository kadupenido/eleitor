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

        if (filters.nome && filters.nome != "") {
            query.nome = { $regex: `.*${filters.nome}.*`, $options: ' i' };
        }

        if (filters.cpf && filters.cpf != "") {
            query.cpf = { $regex: `.*${filters.cpf}.*`, $options: ' i' };
        }

        if (filters.sexo && filters.sexo != "") {
            query.sexo = filters.sexo;
        }

        if (filters.curso && filters.curso != "") {
            query.curso = {
                $elemMatch: {
                    nome: { $regex: `.*${filters.curso}.*`, $options: ' i' }
                }
            };
        }

        if (filters.bairro && filters.bairro != "") {
            query.bairro = { $regex: `.*${filters.bairro}.*`, $options: ' i' };
        }

        if (filters.municipio && filters.municipio != "") {
            query.municipio = { $regex: `.*${filters.municipio}.*`, $options: ' i' };
        }

    }

    var options = {
        page: page,
        limit: 10
    };

    // Ordenação
    options.sort = sort ? sort : { nome: 'asc' };

    return Voter.paginate(query, options).then(voters => {
        return voters;
    });
}

/**
 * Busca um eleitor pelo ID
 * @param {string} id Identificaodr do eleitor
 */
function getVoter(id) {
    return Voter.findById(id).then(voter => {
        return voter;
    });
}

/**
 * deleta o eleitor do id informado
 * @param {string} id Identificador do eleitor
 */
function deleteVoter(id) {
    return Voter.findByIdAndDelete(id);
}

module.exports = {
    getVoters: getVoters,
    getVoter: getVoter,
    deleteVoter: deleteVoter
}