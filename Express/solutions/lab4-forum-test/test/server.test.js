const chai = require("chai");
const { app, connectDatabase, startServer } = require("../src/server");

const { expect } = chai;

describe("src/server.js", () => {
  it("connectDatabase", async () => {
    const conn = await connectDatabase("some-db");

    expect(conn).to.exist
    expect(conn.connection.readyState).to.eq(1)
  });
});