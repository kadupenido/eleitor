const config = {
    port: 3000,
    database: process.env.CON_STR || '',
    PW_KEY: process.env.PW_KEY || '',
    PRIVATE_KEY: process.env.PV_KEY || ''
}

module.exports = config;
