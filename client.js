const http = require("http");
const fs = require("fs");
const path = require("path");
const logger = require("./lib/Logger");
const { CLIENT_PORT } = require("./config");

const baseDir = "public";

const getFilePath = (requestedUrl) => {
  if (requestedUrl === "/socket.io/socket.io.js")
    return (filePath = "./node_modules/socket.io/client-dist/socket.io.js");
  else if (requestedUrl === "/") return (filePath = `./${baseDir}/index.html`);
  return `./${baseDir}/${requestedUrl}`;
};

const getMimeType = (filePath) => {
  const mimeTypes = new Map([
    [".html", "text/html"],
    [".js", "text/javascript"],
    [".mjs", "text/javascript"],
    [".css", "text/css"],
    [".ico", "image/x-icon"],
  ]);

  const extName = path.extname(filePath).toString().toLowerCase();

  return mimeTypes.get(extName) || "application/octet-stream";
};

http
  .createServer((request, response) => {
    const requestedUrl = request.url;
    let filePath = getFilePath(requestedUrl);

    fs.readFile(filePath, (error, content) => {
      let responseCode = 200;
      let responseContent = content;

      if (error) {
        if (error.code === "ENOENT") {
          responseCode = 404;
          responseContent = "Resource not found.";
        } else {
          responseCode = 500;
          responseContent = "Iternal server error.";
        }
      }

      response.writeHead(responseCode, {
        "Content-Type": getMimeType(filePath),
      });
      response.end(responseContent, "utf-8");
      logger.log(
        `[${responseCode}] - ${requestedUrl}`,
        responseCode === 500 || responseCode === 404
          ? logger.color.RED
          : logger.color.GREEN
      );
    });
  })
  .listen(CLIENT_PORT);

console.log(`Server running at http://127.0.0.1:${CLIENT_PORT}`);
