htmlMsgTemplate = {
  sendHtml(msg) {
    let html = `
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
          </head>
          <body>
            <h2>${msg}</h2>
          </body>
        </html>`;
    return html;
  },
};

module.exports = htmlMsgTemplate;
