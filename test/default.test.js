import { expect } from "chai";
import myenvhelper from "../src";

describe("default test", () => {
  it("default test failed", () => {
    expect(
      myenvhelper.genEnvUrlByWebUrl("http://dev-mockup.example.com", "testing")
    ).to.be.equal("http://test-mockup.example.com");
  });
});
