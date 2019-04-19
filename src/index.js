"use strict";

/**
 * Environment Label Helper Class
 *
 * author: nick fan
 *
 */
export class EnvHelper {
  constructor(env) {
    this.instance = null;
    this._env = env;
    this._envLabelMap = {
      dev: ["dev", "develop", "development"],
      test: ["test", "testing"],
      prod: ["pub", "public", "prod", "production", "ol", "online"],
      local: ["my", "local"]
    };
    this._envLabelAliasMap = null;
  }

  static getInstance(env) {
    if (!this.instance) {
      this.instance = new EnvHelper(env);
    }
    return this.instance;
  }

  get env() {
    return this._env;
  }

  set env(value) {
    this._env = value;
  }

  get envLabelMap() {
    return this._envLabelMap;
  }

  set envLabelMap(value) {
    this._envLabelMap = value;
  }

  get envLabelAliasMap() {
    return this._envLabelAliasMap;
  }

  set envLabelAliasMap(value) {
    this._envLabelAliasMap = value;
  }

  /**
   * 读取环境标识
   * @returns {string|*}
   */
  getEnv() {
    if (this._env) {
      return this._env;
    }
    throw new Error("Instance Env var not set yet.");
  }

  /**
   * 设置环境标识
   * @param env
   * @returns {EnvHelper}
   */
  setEnv(env) {
    this._env = env;
    return this;
  }

  /**
   * 获取所有的属性标识
   * @returns {string[]|*}
   */
  getEnvLabels() {
    // Return this._envLabelMap.keys();
    return Object.keys(this._envLabelMap);
  }

  getEnvLabelAliasMap() {
    if (this._envLabelAliasMap) {
      return this._envLabelAliasMap;
    }

    // Let envLabelAliasMap = {};

    return null;
  }

  /**
   * 修正env环境标识
   * @param env
   * @returns {string}
   */
  fixEnv(env) {
    let vEnv = env;
    if (vEnv === undefined) {
      vEnv = this._env;
    }
    switch (vEnv) {
      case "pub":
      case "public":
      case "prod":
      case "production":
        return "prod";
      case "test":
      case "testing":
        return "test";
      case "dev":
      case "develop":
      case "development":
        return "dev";
      case "my":
      case "local":
      case "loc":
      default:
        return "local";
    }
  }
}
// Export default EnvHelper;
const envhelper = EnvHelper.getInstance();
// Console.log(envhelper.getEnvLabels());

export { envhelper };
// Modules.export(envhelper);
