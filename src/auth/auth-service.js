const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserService = require('../user/user-service');

/**
 * Gera o token de authenticação
 * @param {string} userName Nome do usuário
 * @param {str} password Senha do usuário
 */
function generateToken(userName, password) {

    return UserService.getUser(userName, password).then(user => {
        if (user) {
            const token = jwt.sign({ id: user.id }, config.PRIVATE_KEY, { expiresIn: '1d' });

            return {
                success: true,
                token: token
            };
        } else {
            return {
                success: false,
                token: null
            };
        }
    });
}

/**
 * Decodifica o token informado
 * @param {str} token Token
 */
function decodeToken(token) {
    return jwt.verify(token, config.PRIVATE_KEY);
}

/**
 * Verifica a autorização do token informado
 * @param {string} token Token
 */
function authorize(token) {

    if (!token) {
        return {
            success: false,
            message: 'Token não informado.'
        }
    }

    return jwt.verify(token, config.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return {
                success: false,
                id: null,
                message: 'Token inválido.'
            }
        } else {
            return {
                success: true,
                id: decoded,
                message: ''
            }
        }
    });
}

module.exports = {
    generateToken: generateToken,
    decodeToken: decodeToken,
    authorize: authorize
}