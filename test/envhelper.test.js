import { expect } from "chai";
import { _, envhelper, EnvHelper } from "../src";

describe("EnvHelper test", () => {
  it("EnvHelper get env failed", () => {
    expect(EnvHelper.getInstance()).to.be.an('object');
  });
});

describe("envLabelMap test", () => {
  it("envLabelMap miss match", () => {
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
});

describe("fixEnv test", () => {
  it("fixEnv local failed", () => {
    expect(envhelper.fixEnv("my")).to.be.equal("local");
  });
  it("fixEnv dev failed", () => {
    expect(envhelper.fixEnv("develop")).to.be.equal("development");
  });
  it("fixEnv test failed", () => {
    expect(envhelper.fixEnv("test")).to.be.equal("testing");
  });
  it("fixEnv prod failed", () => {
    expect(envhelper.fixEnv("pub")).to.be.equal("production");
  });
});

describe("envPrefix test", () => {
  it("envPrefix global failed", () => {
    expect(envhelper.setEnv("dev").envPrefix()).to.be.equal("dev-");
  });
  it("envPrefix local failed", () => {
    expect(envhelper.envPrefix("local")).to.be.equal("my-");
  });
  it("envPrefix dev failed", () => {
    expect(envhelper.envPrefix("develop")).to.be.equal("dev-");
  });
  it("envPrefix test failed", () => {
    expect(envhelper.envPrefix("testing")).to.be.equal("test-");
  });
  it("envPrefix prod failed", () => {
    expect(envhelper.envPrefix("pub")).to.be.equal("");
  });
});

describe("prefixEnv test", () => {
  it("prefixEnv local failed", () => {
    expect(envhelper.prefixEnv("my-")).to.be.equal("local");
  });
  it("prefixEnv dev failed", () => {
    expect(envhelper.prefixEnv("dev-")).to.be.equal("development");
  });
  it("prefixEnv test failed", () => {
    expect(envhelper.prefixEnv("test-")).to.be.equal("testing");
  });
  it("prefixEnv prod failed", () => {
    expect(envhelper.prefixEnv("")).to.be.equal("production");
  });
});

describe("detectUrlPrefix test", () => {
  it("detectUrlPrefix local failed", () => {
    expect(
      envhelper.detectUrlPrefix(
        "http://my-sub.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("my-");
  });
  it("detectUrlPrefix dev failed", () => {
    expect(
      envhelper.detectUrlPrefix(
        "http://dev-sub.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("dev-");
  });
  it("detectUrlPrefix test failed", () => {
    expect(
      envhelper.detectUrlPrefix(
        "http://test-sub.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("test-");
  });
  it("detectUrlPrefix prod failed", () => {
    expect(
      envhelper.detectUrlPrefix(
        "http://mysub-domain.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal(null);
  });
});

describe("detectEnvByUrl test", () => {
  it("detectEnvByUrl local failed", () => {
    expect(
      envhelper.detectEnvByUrl(
        "http://my-sub.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("local");
  });
  it("detectEnvByUrl dev failed", () => {
    expect(
      envhelper.detectEnvByUrl(
        "http://dev-sub.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("development");
  });
  it("detectEnvByUrl test failed", () => {
    expect(
      envhelper.detectEnvByUrl(
        "http://test-sub.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("testing");
  });
  it("detectEnvByUrl prod failed", () => {
    expect(
      envhelper.detectEnvByUrl(
        "http://mysub-domain.example.com/path/action?querystring=value#fragment"
      )
    ).to.be.equal("production");
  });
});

describe("genEnvUrlByTplUrl test", () => {
  const mockupTplUrl = "http://mockup.example.com";
  it("genEnvUrlByTplUrl local failed", () => {
    expect(envhelper.genEnvUrlByTplUrl(mockupTplUrl, "local")).to.be.equal(
      "http://my-mockup.example.com"
    );
  });
  it("genEnvUrlByTplUrl dev failed", () => {
    expect(envhelper.genEnvUrlByTplUrl(mockupTplUrl, "dev")).to.be.equal(
      "http://dev-mockup.example.com"
    );
  });
  it("genEnvUrlByTplUrl test failed", () => {
    expect(envhelper.genEnvUrlByTplUrl(mockupTplUrl, "test")).to.be.equal(
      "http://test-mockup.example.com"
    );
  });
  it("genEnvUrlByTplUrl prod failed", () => {
    expect(envhelper.genEnvUrlByTplUrl(mockupTplUrl, "prod")).to.be.equal(
      "http://mockup.example.com"
    );
  });
});

describe("genEnvUrlByWebUrl test", () => {
  it("genEnvUrlByWebUrl local failed", () => {
    expect(
      envhelper.genEnvUrlByWebUrl("http://prod-mockup.example.com", "local")
    ).to.be.equal("http://my-mockup.example.com");
  });
  it("genEnvUrlByWebUrl dev failed", () => {
    expect(
      envhelper.genEnvUrlByWebUrl("http://testing-mockup.example.com", "dev")
    ).to.be.equal("http://dev-mockup.example.com");
  });
  it("genEnvUrlByWebUrl test failed", () => {
    expect(
      envhelper.genEnvUrlByWebUrl("http://mockup.example.com", "test")
    ).to.be.equal("http://test-mockup.example.com");
  });
  it("genEnvUrlByWebUrl prod failed", () => {
    expect(
      envhelper.genEnvUrlByWebUrl("http://dev-mockup.example.com", "prod")
    ).to.be.equal("http://mockup.example.com");
  });
});
