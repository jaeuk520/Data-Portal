"use strict";

const connection = require('../lib/db.js');
var db = require('../lib/db.js');

const MAX_API_KEY_LENGTH = 30;

class UserStorage {

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
    const sql = `insert into user(id, name, pw) values ('${userInfo.id}', '${userInfo.name}', '${userInfo.password}')`;
    db.query(sql, function (err, result) {
      if (err) { throw err; }
      console.log("1 record inserted");
    });
    return { success: false };
  }

  static setApiKey(userInfo) {
    // DB에 apiKey등록
    const apiKey = UserStorage.generateRandomApiKey(MAX_API_KEY_LENGTH);
    const sql = `update user set api_Key = '${apiKey}' where user.id = '${userInfo.id}'`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record updated");
    });
    return { success: true };
  }

  static generateRandomApiKey(apiKeyLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < apiKeyLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}

module.exports = UserStorage;