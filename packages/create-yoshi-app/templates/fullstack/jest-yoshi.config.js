const { emitConfigs, bootstrapServer } = require('./test/environment');

const APP_CONF_DIR = `./target/configs-${process.env.JEST_WORKER_ID}`;

module.exports = {
  bootstrap: {
    setup: async ({ globalObject, getPort, staticsUrl }) => {
      await emitConfigs({ staticsUrl, targetFolder: APP_CONF_DIR });

      globalObject.app = bootstrapServer({
        port: getPort(),
        managementPort: getPort(),
        appConfDir: APP_CONF_DIR,
      });

      await globalObject.app.start();
    },
    teardown: async ({ globalObject }) => {
      await globalObject.app.stop();
    },
  },
};
