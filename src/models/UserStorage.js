"use strict";

const connection = require('../lib/db.js');
var db = require('../lib/db.js');

class UserStorage {
    static #users = {
        id: ["jaeuk", "jaeuk2", "jaeuk3"],
        password: ["1234", "1234", "123456"],
        name: ["재욱", "욱박", "박재"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id, callback) {
        // DB에서 search
        
        const sql = `select * from user where '${id}' = user.id`;
        connection.query(sql, [id], (error, results) => {
            if (error) {
              callback(error, null);
            } else {
              if (results.length > 0) {
                const userInfo = {
                  id: results[0].id,
                  password: results[0].pw
                };
                callback(null, userInfo);
              } else {
                callback('사용자를 찾을 수 없음', null);
              }
            }
          });
    }

    static save(userInfo) {
        // DB에 데이터 저장
        let sql = `insert into user(id, name, pw) values ('${userInfo.id}', '${userInfo.name}', '${userInfo.password}')`;
        db.query(sql, function(err, result) {
            if(err) {throw err;}
            console.log("1 record inserted");
        });
        return {success: true};
    }
}

module.exports = UserStorage;