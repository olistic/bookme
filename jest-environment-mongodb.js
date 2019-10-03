const MongodbMemoryServer = require('mongodb-memory-server').default;
const NodeEnvironment = require('jest-environment-node');

const mongodbMemoryServerOptions = {
  instance: {},
  binary: {
    version: '4.2.0',
  },
  autoStart: false,
};

class MongodbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongodbMemoryServer(mongodbMemoryServerOptions);
  }

  async setup() {
    await super.setup();

    if (!this.mongod.isRunning) {
      await this.mongod.start();
    }

    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName();
  }

  async teardown() {
    await super.teardown();

    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongodbEnvironment;
