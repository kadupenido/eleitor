const Hash = require('hash.js');
const Config = require('../config/config');
const User = require('./user-model');

/**
 * Buscar um usuário do sistema
 * @param {string} userName Nome do usuário
 * @param {string} password Senha do usuário
 */
function getUser(userName, password) {
    return User.findOne({ 'userName': userName }).then(usr => {
        if (!usr || usr.password != hashPassword(password)) {
            return null;
        } else {
            return usr;
        }
    });
}

/**
 * Cria um novo usuário no sistema
 * @param {string} userName Nome do usuário
 * @param {string} password Senha do usuário
 */
function newUser(userName, password) {

    let user = new User({
        userName: userName,
        password: hashPassword(password)
    });

    return user.save().then(usr => {
        return usr.id;
    });
}

/**
 * Criptografa a senha
 * @param {string} senha Senha a ser criptografada
 */
function hashPassword(senha) {
    senha = senha + Config.PW_KEY;
    senha = Hash.sha256().update(senha).digest('hex');

    return senha;
}

module.exports = {
    getUser: getUser,
    newUser: newUser
}