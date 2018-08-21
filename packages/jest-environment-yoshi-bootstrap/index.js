const NodeEnvironment = require('jest-environment-node');
const project = require('yoshi/config/project');
const { getPort, appConfDir } = require('./constants');
const { loadConfig } = require('yoshi/src/utils');

const config = loadConfig();

module.exports = class BootstrapEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    await config.bootstrap.setup({
      globalObject: this.global,
      getPort,
      staticsUrl: project.servers.cdn.url(),
      appConfDir,
    });
  }

  async teardown() {
    await super.teardown();

    await config.bootstrap.teardown({
      globalObject: this.global,
    });
  }
};
