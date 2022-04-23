import app from "../../app";
import supertest from "supertest";
import { expect } from "chai";
import shortid from "shortid";
import mongoose from "mongoose";

let firstUserIdTest = "";
const firstUserBody = {
  email: `alan.fernandez+${shortid.generate()}@beatfeed.io`,
  password: "M3g4S3cr3t!23",
};

let accessToken = "";
let refreshToken = "";
const newFirstName = "Moro";
const newFirstName2 = "Messi";
const newLastName2 = "Enzo";

describe("users and auth endpoints", function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });

  after(function (done) {
    // shut down express server, close mongo connection and  tell mocha we're done
    app.close(() => {
      mongoose.connection.close(done);
    });
  });
  
  it("should allow a POST to /users", async function () {
    const res = await request.post("/users").send(firstUserBody);
  
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.id).to.be.a("string");
    firstUserIdTest = res.body.id;
  });
});

