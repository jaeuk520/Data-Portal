"use strict";

const s3 = require('../../../aws/s3');

app.get('/data/download', (req, res) => {
    const file = req.query.file; // 클라이언트에서 전달된 파일 이름
    const s3Url = `data-portal-test-bucket/${file}`; // S3 버킷 URL로 변경

    res.setHeader('Content-disposition', `attachment; filename=${file}`);
    res.setHeader('Content-type', 'application/octet-stream');

    // S3에서 파일을 읽어와서 클라이언트에 전송
    s3.downloadFile(s3Url, (err, fileStream) => {
        if (err) {
            res.status(500).send('파일을 다운로드하는 중 오류가 발생했습니다.');
            return;
        }
        fileStream.pipe(res);
    });
});