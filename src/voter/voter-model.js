const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ExperienciaSchema = new Schema({
    empresa: String,
    funcao: String,
    inicio: String,
    fim: String
});

const CursoSchema = new Schema({
    nome: String
});

const VoterSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: String,
    rg: String,
    nascimento: String,
    sexo: {
        type: String,
        enum: ['Masculino', 'Feminino']
    },
    estadoCivil: {
        type: String,
        enum: ['Casado', 'União estavel', 'Solteiro', 'Viúvo', 'Divorciado']
    },
    nacionalidade: String,
    naturalidade: String,
    titulo: String,
    zona: String,
    secao: String,
    referencia: String,
    responsavel: String,
    endereco: String,
    numero: String,
    complemento: String,
    bairro: String,
    municipio: String,
    uf: String,
    telefone: String,
    celular: String,
    email: String,
    cnh: String,
    escolaridade: String,
    curso: [CursoSchema],
    experiencia: [ExperienciaSchema],
    obs: String
});

VoterSchema.virtual('idade').get(() => {
    return 0;
    if (!this.nascimento) {
        return 0;
    }

    var ageDifMs = Date.now() - this.nascimento.getTime();
    var ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

VoterSchema.plugin(mongoosePaginate);

const Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;