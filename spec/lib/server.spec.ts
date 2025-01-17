import * as chai from "chai";
import { Guild } from "discord.js";
import "mocha";
import { stub } from "sinon";
import sinonChai from "sinon-chai";
import Server from "../../src/lib/server";
import { SettingProvider } from "../../src/lib/provider";
import Makibot from "../../src/Makibot";

const expect = chai.expect;
chai.use(sinonChai);

function mockSettingProvider<T>(returns: T = undefined): SettingProvider {
  const fakeSettingProvider = {
    get: stub().returns(returns),
    set: stub().returns(Promise.resolve(returns)),
    remove: stub().returns(Promise.resolve()),
  };
  return fakeSettingProvider as unknown as SettingProvider;
}

describe("Server", () => {
  const fakeClient = {
    provider: mockSettingProvider(10),
  } as Makibot;
  const fakeGuild = {
    id: "g112233",
    client: fakeClient,
  } as unknown as Guild;
  describe("#tagbag", () => {
    it("can be used to bind tags to a server", () => {
      const server = new Server(fakeGuild);
      expect(server.tagbag.tag("users").get(5)).to.equal(10);
      expect(fakeClient.provider.get).to.have.been.calledOnceWith("g112233", "g112233:users", 5);
    });
  });
});
