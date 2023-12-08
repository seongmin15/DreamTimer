const mysql = require("mysql2/promise");
const options = require("../config/connection.js");
const SQLError = require("../dto/SQLError.js");

class Repository {
    constructor() {
        this.pool = mysql.createPool(options);
        this.conn = null;
    }
    async closeDB() {
        await this.pool.end();
        this.pool = null;
        this.conn = null;
    }

    async query(sql, params) {
        let conn;
        try {
            conn = this.conn ? this.conn : await this.pool.getConnection();
            return conn.execute(sql, params);
        } catch (e) {
            throw new SQLError(
                "sql:" + sql + ", params: " + params + " : " + e.sqlMessage
            );
        } finally {
            if (!this.conn && conn) {
                await conn.release();
            }
        }
    }
    async beginTransaction() {
        if (this.conn) {
            throw new Error("Transaction already begun");
        }
        this.conn = await this.pool.getConnection();
        this.conn.beginTransaction();
    }
    async rollback() {
        if (!this.conn) {
            throw new Error("No transaction were running");
        }
        await this.conn.rollback();
        await this.conn.release();
        this.conn = null;
    }
    async commit() {
        if (!this.conn) {
            throw new Error("No transaction were running");
        }
        await this.conn.commit();
        await this.conn.release();
        this.conn = null;
    }
}

module.exports = Repository;
