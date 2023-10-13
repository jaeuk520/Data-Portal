"use strict";

const User = require("../../models/User");
const s3 = require('../../aws/s3');

const output = {
    home: (req, res) => {
        //로그인/로그아웃 동적 렌더링
        res.render("home/index", { isAuthenticated: req.session.isAuthenticated });
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    data: (req, res) => {
        s3.getFileLists((err, files) => {
            if (err) {
                res.status(500).send('파일 목록을 가져오는 중 오류가 발생했습니다.');
                return;
            }
            console.log(files);
            res.render('home/data', { files }); // data.ejs 파일에 파일 목록을 전달하여 렌더링
        });
    },
    // data: (req, res) => {
    //     res.render("home/data");
    // },
};

const process = {
    login: (req, res) => {
        const user = new User(req.body);
        user.login((response) => {
            if (response.success == true) {
                // 세션 생성
                req.session.isAuthenticated = true;
                req.session.loginData = response.userInfo;
                req.session.save(error => { if (error) console.log(error) })
            }
            console.log(req.session);
            return res.json(response);
        });
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.register();
        return res.json(response);
    },
    logout: (req, res) => {
        //세션 파기, root로 리디렉트
        req.session.isAuthenticated = false;
        req.session.destroy(error => { if (error) console.log(error) });
        return res.redirect('/');
    },
    api: (req, res) => {
        const user = new User(req.session.loginData);
        const response = user.setApiKey();
        return res.redirect('/');
    },
    download: (req, res) => {

    }
};

module.exports = {
    output,
    process,
};