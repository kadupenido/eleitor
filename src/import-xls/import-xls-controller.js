const xlsx = require('node-xlsx').default;
const Voter = require('../voter/voter-model');

/**
 * Importa o XML
 * @param {*} req Request
 * @param {*} res Response
 */
function importXls(req, res) {
    try {

        if (!req.files || Object.keys(req.files).length == 0) {
            return res.status(400).send({
                message: 'Nenhum arquivo foi enviado.'
            });
        }

        const workSheet = xlsx.parse(req.files.xls.data);

        const voters = new Array();

        for (let i = 2; i < workSheet[0].data.length; i++) {
            const row = workSheet[0].data[i];

            if (!row || !row[0]) {
                continue;
            }

            let voter = new Voter();

            voter.nome = row[0];
            voter.cpf = row[1];
            voter.sexo = row[2];
            voter.estadoCivil = row[3];
            voter.rg = row[4];
            voter.nascimento = row[5];
            voter.nacionalidade = row[7];
            voter.naturalidade = row[8];
            voter.titulo = row[9];
            voter.zona = row[10];
            voter.secao = row[11];
            voter.uf = row[12];
            voter.endereco = row[13];
            voter.numero = row[14];
            voter.complemento = row[15];
            voter.bairro = row[16];
            voter.municipio = row[17];
            voter.cep = row[18];
            voter.telefone = row[19];
            voter.celular = row[20];
            voter.referencia = row[21];
            voter.responsavel = row[22];
            voter.email = row[23];
            voter.escolaridade = row[24];

            var cursos = [];

            if (row[25]) cursos.push(row[25]);
            if (row[26]) cursos.push(row[26]);
            if (row[27]) cursos.push(row[27]);

            voter.curso = cursos;

            var experiencias = [];

            if (row[28]) {
                var exp = {};

                exp.empresa = row[28];
                exp.funcao = row[29];
                exp.inicio = row[30];
                exp.fim = row[31];

                experiencias.push(exp);
            }

            if (row[32]) {
                var exp = {};

                exp.empresa = row[32];
                exp.funcao = row[33];
                exp.inicio = row[34];
                exp.fim = row[35];

                experiencias.push(exp);
            }

            if (row[36]) {
                var exp = {};

                exp.empresa = row[36];
                exp.funcao = row[37];
                exp.inicio = row[38];
                exp.fim = row[39];

                experiencias.push(exp);
            }

            voter.experiencia = experiencias;

            voter.cnh = row[40];
            voter.obs = row[41];

            voters.push(voter);
        }

        Voter.collection.insertMany(eleitores, (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send(result);
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message || err });
    }
}

module.exports = {
    importXls: importXls
}