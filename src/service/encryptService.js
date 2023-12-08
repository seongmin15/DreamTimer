const crypto = require('crypto');

class EncryptService {
	async getSalt(){
		return await crypto.randomBytes(48).toString('base64');
	};
	async getHashedPassword(password, salt){
		return await crypto.pbkdf2Sync(password, salt, 97, 66, "sha512").toString('base64');
	}
}
module.exports = EncryptService;