const fastify = require("fastify")();

fastify.register(require("fastify-cors"), {
  origin: true
});

fastify.all("/*", (req, res) => {
  console.log(req);
  console.log(req.headers);
  const testValue = req.headers["x-test-value"] || "";
  const body = req.body || "";
  res
    .type("text/plain; charset=utf-8")
    .send(
      `${Date.now()} ${req.raw.method} ${
        req.raw.originalUrl
      } ${body} ${testValue} `
    );
});

const start = async () => {
  try {
    await fastify.listen(8080);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
