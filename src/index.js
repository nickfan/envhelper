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
    this._envDefault = "local";
    this._envLabelMap = {
      development: ["dev", "develop", "development"],
      testing: ["test", "testing"],
      production: ["pub", "public", "prod", "production", "ol", "online"],
      local: ["my", "local"]
    };
    this._envAliasLabelMap = null;
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

  get envAliasLabelMap() {
    return this._envAliasLabelMap;
  }

  getEnvLabelMap() {
    return this._envLabelMap;
  }

  setEnvLabelMap(value) {
    this._envLabelMap = value;
  }

  cleanupAliasLabelMap() {
    this._envAliasLabelMap = null;
  }

  set envAliasLabelMap(value) {
    this._envAliasLabelMap = value;
  }

  getEnvLabelAliasListByEnvLabel(label) {
    if (this.getEnvLabels().includes(label)) {
      return this._envLabelMap[label];
    }
  }

  setEnvLabelAliasListByEnvLabel(label, aliasList) {
    this._envLabelMap[label] = aliasList;
    this.cleanupAliasLabelMap();
  }

  /**
   * 读取环境标识
   * @returns {string|*} 当前环境标识
   */
  getEnv() {
    if (this._env) {
      return this._env;
    }
    throw new Error("Instance Env var not set yet.");
  }

  /**
   * 设置环境标识
   * @param {string|*} env 环境标识
   * @returns {EnvHelper} 当前实例对象
   */
  setEnv(env) {
    this._env = env;
    return this;
  }

  /**
   * 获取所有的属性标识
   * @returns {string[]|*} 所有的环境标识
   */
  getEnvLabels() {
    // Return this._envLabelMap.keys();
    return Object.keys(this._envLabelMap);
  }

  /**
   * 初始化别名字典
   * @param {boolean} overwrite 是否覆写
   */
  initEnvAliasLabelMap(overwrite = true) {
    let envLabels = this.getEnvLabels();
    if (envLabels.length > 0) {
      this._envAliasLabelMap = {};
      for (let rowLabel of envLabels) {
        let rowAliasList = this.getEnvLabelAliasListByEnvLabel(rowLabel);
        if (rowAliasList.length > 0) {
          for (let aliasItemName of rowAliasList) {
            // eslint-disable-next-line max-depth
            if (overwrite) {
              this._envAliasLabelMap[aliasItemName] = rowLabel;
            } else if (!(aliasItemName in this._envAliasLabelMap)) {
              this._envAliasLabelMap[aliasItemName] = rowLabel;
            }
          }
        }
      }
    }
  }

  getEnvAliasLabelMap() {
    if (this._envAliasLabelMap) {
      return this._envAliasLabelMap;
    }
    this.initEnvAliasLabelMap();
    return this._envAliasLabelMap;
  }

  /**
   * 修正env环境标识
   * @param {string|*} env 输入的环境标识
   * @returns {string} 修正后的环境标识
   */
  fixEnv(env) {
    let vEnv = env;
    if (vEnv === undefined) {
      vEnv = this._env;
    }
    let envAliasLabelMap = this.getEnvAliasLabelMap();
    if (Object.keys(envAliasLabelMap).includes(vEnv)) {
      return envAliasLabelMap[vEnv];
    }
    return this._envDefault;
  }
}

const envhelper = EnvHelper.getInstance();
export { envhelper };
