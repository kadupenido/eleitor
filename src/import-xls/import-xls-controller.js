const path = require('path');
const xlsx = require('node-xlsx').default;
const Eletor = require('../eleitor/eleitor-model');

module.exports.impotarXls = async (req, res, next) => {
    try {

        if (Object.keys(req.files).length == 0) {
            return res.status(400).send({
                message: 'No files were uploaded.'
            });
        }

        const workSheet = xlsx.parse(req.files.xls.data);

       for (let i = 2; i < workSheet[0].data.length; i++) {
           const row = workSheet[0].data[i];
           
           let eleitor = new Eletor();
           eleitor.nome = row[0];
           eleitor.cpf = row[1];

           await eleitor.save();
       }

        res.status(200).send();

    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}