const { emitConfigs, bootstrapServer } = require('./test/environment');

module.exports = {
  bootstrap: {
    setup: async ({ globalObject, getPort, staticsUrl, appConfDir }) => {
      await emitConfigs({ staticsUrl, targetFolder: appConfDir });

      globalObject.app = bootstrapServer({
        port: getPort(),
        managementPort: getPort(),
        appConfDir,
      });

      await globalObject.app.start();
    },
    teardown: async ({ globalObject }) => {
      await globalObject.app.stop();
    },
  },
};
