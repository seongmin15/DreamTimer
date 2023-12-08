const Repository = require("./repository");

class UserRepository extends Repository {
  constructor(groupRepository) {
    super();
    this.groupRepository = groupRepository;
  }

  async init() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user_tbl (
        user_key INT(11) NOT NULL AUTO_INCREMENT,
        id VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        salt CHAR(64) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        hashedPw CHAR(88) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        email VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        provider VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        refresh_token VARCHAR(250) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        device_key INT(11) NULL DEFAULT NULL,
        PRIMARY KEY (user_key) USING BTREE,
        INDEX FK_user_tbl_device_tbl (device_key) USING BTREE,
        CONSTRAINT FK_user_tbl_device_tbl FOREIGN KEY (device_key) REFERENCES device_tbl(device_key) ON UPDATE NO ACTION ON DELETE SET NULL
      )
      COLLATE='utf8mb4_general_ci'
      ENGINE=InnoDB
      `;
    await this.query(sql, []);
  }

  async findAll() {
    const [rows] = await this.query(`SELECT * FROM user_tbl`, []);
    return rows;
  }

  async getUserById(id) {
    try {
      const conn = await this.pool.getConnection();
      const sql = "SELECT * FROM user_tbl WHERE id = ?";
      const params = [id];
      const [rows, fields] = await conn.execute(sql, params);
      conn.release();
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async getUserByIdAndProvider(id, provider) {
    const sql = "SELECT * FROM user_tbl WHERE id = ? AND provider = ?";
    const params = [id, provider];
    const [rows] = await this.query(sql, params);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async getUserByIdAndEmail(id, email) {
    const sql = "SELECT * FROM user_tbl WHERE id = ? AND email = ?";
    const params = [id, email];
    const [rows] = await this.query(sql, params);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async getUserByEmail(email) {
    const sql = "SELECT * FROM user_tbl WHERE email= ?";
    const params = [email];
    const [rows] = await this.query(sql, params);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async getIdByEmail(email) {
    const sql = "SELECT id FROM user_tbl WHERE email= ?";
    const params = [email];
    const [rows] = await this.query(sql, params);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async getUserByRefreshToken(refreshToken) {
    const sql = "SELECT * FROM user_tbl WHERE refresh_token= ?";
    const params = [refreshToken];
    const [rows] = await this.query(sql, params);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async getUserByDeviceSerial(deviceSerial){
    const sql = "SELECT * FROM user_tbl WHERE device_key= (SELECT device_key FROM device_tbl WHERE device_serial = ?);";
    const params = [deviceSerial];
    const [rows] = await this.query(sql, params);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];

  }

  async insertUser(id, salt, hashedPw, email) {
    const sql =
      "INSERT INTO user_tbl(id, salt, hashedPw, email, provider) VALUES (?, ?, ?, ?, ?)";
    const params = [id, salt, hashedPw, email, "local"];
    const [rows] = await this.query(sql, params);
    await this.groupRepository.createDefaultUserGroup(rows.insertId);
    return true;
  }

  async insertSNSUser(id, provider) {
    const sql = "INSERT INTO user_tbl(id, provider) VALUES (?, ?)";
    const params = [id, provider];
    const [rows] = await this.query(sql, params);
    await this.groupRepository.createDefaultUserGroup(rows.insertId);
    return true;
  }

  async updateRefreshToken(id, provider, refreshToken) {
    const sql =
      "UPDATE user_tbl SET refresh_token = ? WHERE id = ? AND provider = ?";
    const params = [refreshToken, id, provider];
    await this.query(sql, params);
    return true;
  }

  async updateSalt(id, salt) {
    const sql = "UPDATE user_tbl SET salt = ? WHERE id = ?";
    const params = [salt, id];
    await this.query(sql, params);
    return true;
  }

  async updatePw(id, hashedPw) {
    const sql = "UPDATE user_tbl SET hashedPw = ? WHERE id = ?";
    const params = [hashedPw, id];
    await this.query(sql, params);
    return true;
  }

  async deleteUserById(id) {
    const sql = "DELETE FROM user_tbl WHERE id = ?";
    const params = [id];
    return this.query(sql, params);
  }

  async updateDeviceKey(user_key, device_serial){
    const getDevicekeySQL = "SELECT device_key FROM device_tbl WHERE device_serial=?";
    const [device_key_row] = await this.query(getDevicekeySQL, [device_serial]);
    if(device_key_row.length === 0){
      return null;
    }
    const device_key = device_key_row[0].device_key;
    const dropSQL = "UPDATE user_tbl SET device_key=NULL WHERE device_key=?";
    const updateSQL = "UPDATE user_tbl SET device_key=? WHERE user_key=?";
    await this.query(dropSQL, [device_key]);
    await this.query(updateSQL, [device_key, user_key]);
    return true;
  }
}

module.exports = UserRepository;
