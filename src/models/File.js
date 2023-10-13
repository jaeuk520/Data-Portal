"use strict";

const s3 = require('../aws/s3');

class File {
  constructor(body) {
    this.body = body;
  }

  upload() {
    const client = this.body;
    const fileName = client.fileName;
    const response = s3.uploadFile(fileName);
    return response;
  }
}

module.exports = File;