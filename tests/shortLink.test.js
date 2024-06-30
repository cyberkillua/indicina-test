import {
  describe,
  expect,
  jest,
  it,
  beforeEach,
  afterEach,
} from "@jest/globals";
import supertest, { agent as request } from "supertest";
import * as sinon from "sinon";

import {
  encode,
  decode,
  getStats,
} from "../src/controllers/shortLinkController.js";

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

describe("decode URL", () => {
  let request;

  beforeEach(() => {
    request = supertest(app);
  });

  afterEach(function () {
    sinon.restore();
  });

  it("decode should be defined", () => {
    expect(decode).toBeDefined();
  });
  it("encode url should be successfully", async () => {
    // First, encode a URL
    const encodeResponse = await request
      .post("/api/v1/shortlink/encode-url")
      .send({ originalURL: "https://www.example.com" });

    const shortURL = encodeResponse.body.shortURL;

    // Now, decode the short URL
    const decodeResponse = await request
      .post("/api/v1/shortlink/decode-url")
      .send({ encodedURL: shortURL });

    expect(decodeResponse.status).toBe(200);
    expect(decodeResponse.body).toHaveProperty("message", "Link decoded");
    expect(decodeResponse.body).toHaveProperty(
      "originalURL",
      "https://www.example.com"
    );
  });
  it("encode url should return 422 if encodedURL doesnt exist", async () => {
    const response = await request
      .post("/api/v1/shortlink/decode-url")
      .send({ encodedURL: "https://www.example.com" });

    expect(response.status).toBe(422);
  });
});

describe("get stats", () => {
  let request;

  beforeEach(() => {
    request = supertest(app);
    jest.clearAllMocks();
  });
  it("decode should be defined", () => {
    expect(getStats).toBeDefined();
  });

  it("should return stats for a valid url_path", async () => {
    const encodeResponse = await request
      .post("/api/v1/shortlink/encode-url")
      .send({ originalURL: "https://www.example.com" });

    const shortURL = encodeResponse.body.shortURL;

    const url_path = shortURL.split("/").pop();
    const originalURL = "https://www.example.com";

    const response = await request.get(
      `/api/v1/shortlink/statistic?url_path=${url_path}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "fetch successful");
    expect(response.body).toHaveProperty("stats");
    expect(response.body.stats).toEqual({
      originalURL,
      url_path,
      encodedURL: expect.stringContaining(url_path),
    });
  });
});
