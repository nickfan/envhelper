import { expect } from "chai";
import { envhelper } from "../src";

describe("envhelper", () => {
  it("has a test", () => {
    expect(false, "envhelper should have a test");
  });
  it("envLabelMap miss match", function() {
    envhelper.setEnvLabelMap({
      development: ["dev", "develop", "development"],
      testing: ["test", "testing"],
      production: ["pub", "public", "prod", "production", "ol", "online"],
      local: ["my", "local"]
    });
    expect(envhelper.getEnvLabels())
      .to.be.an("array")
      .that.includes("development");
    expect(envhelper.getEnvLabels())
      .to.be.an("array")
      .that.includes("testing");
    expect(envhelper.getEnvLabels())
      .to.be.an("array")
      .that.includes("production");
    expect(envhelper.getEnvLabels())
      .to.be.an("array")
      .that.includes("local");
    expect(envhelper.getEnvAliasLabelMap()).to.deep.equal({
      dev: "development",
      develop: "development",
      development: "development",
      test: "testing",
      testing: "testing",
      pub: "production",
      public: "production",
      prod: "production",
      production: "production",
      ol: "production",
      online: "production",
      my: "local",
      local: "local"
    });
  });
  it("fixEnv failed", function() {
    expect(envhelper.fixEnv("my")).to.be.equal("local");
  });
});
