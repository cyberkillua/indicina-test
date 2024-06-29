import {
  describe,
  expect,
  jest,
  it,
  beforeEach,
  afterEach,
} from "@jest/globals";
import supertest, { agent as request } from "supertest";
import { Request, Response, NextFunction } from "express";
import * as sinon from "sinon";

import { encode } from "../src/controllers/shortLinkController";

let app;

beforeEach(async function () {
  const mod = await import("../index.js");
  app = mod.default;
});

afterEach(function () {
  sinon.restore();
});

describe("encode URL", () => {
  let request;
  const reqBody = {
    originalURL: "www.google.com",
  };

  beforeEach(() => {
    request = supertest(app);
  });

  afterEach(function () {
    sinon.restore();
  });

  it("encode should be defined", () => {
    expect(encode).toBeDefined();
  });

  it("encode url should be successfully", async () => {
    const response = await request
      .post("/api/v1/shortlink/encode-url")
      .send(reqBody);

    expect(response.status).toBe(200);
  });
});
