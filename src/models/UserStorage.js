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

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static save(userInfo) {
        // DB에 데이터 저장
        connection.connect();
        let sql = `insert into user(id, name, pw) values ('${userInfo.id}', '${userInfo.name}', '${userInfo.password}')`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            console.log("1 record inserted");
            console.log(result);
            connection.end();
        });
        return {success: true};
    }

    
}

module.exports = UserStorage;