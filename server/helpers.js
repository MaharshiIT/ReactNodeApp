const 

crypto = require('crypto'),
{encryptAlgo,encryptKey} = require('./config/keys');

module.exports = {
    enCrypt:function(text)
        {
        const mykey = crypto.createCipher(encryptAlgo, text);
        let mystr = mykey.update(encryptKey, 'utf8', 'hex');
        mystr += mykey.final('hex');

        return mystr;
        }
}