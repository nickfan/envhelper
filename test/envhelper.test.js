// - const expect = require("chai").expect;
// - const envhelper = require("../index.js").default;
import { expect } from "chai";
import { envhelper } from "../src";

describe("envhelper", () => {
  it("标识列表不为空", function() {
    console.log(envhelper.fixEnv("my"));
    expect(envhelper.fixEnv("my")).to.be.equal("local");
  });
  it("has a test", () => {
    expect(false, "envhelper should have a test");
  });
});
