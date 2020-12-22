"use strict";

/**
 * Environment Label Helper Class
 *
 * author: nick fan
 *
 */
class EnvHelper {
  constructor(env) {
    this.instance = null;
    this._env = env;
    this._envDefault = "local";
    this._envLabelMap = {
      development: ["dev", "develop", "development"],
      testing: ["test", "testing"],
      staging: ["stage", "staging"],
      production: ["pub", "public", "prod", "production", "ol", "online"],
      local: ["my", "local", "loc"]
    };
    this._envLabelPrefixMap = {
      development: "dev-",
      testing: "test-",
      staging: "stage-",
      production: "",
      local: "my-"
    };
    this._envAliasLabelMap = null;
  }

  static getInstance(env) {
    if (!this.instance) {
      this.instance = new EnvHelper(env);
    }
    return this.instance;
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

  getEnvLabelPrefixMap() {
    return this._envLabelPrefixMap;
  }

  setEnvLabelPrefixMap(value) {
    this._envLabelPrefixMap = value;
  }

  cleanupEnvLabelPrefixMap() {
    this._envLabelPrefixMap = null;
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
   * Read env label
   *
   * @returns {string|*} current env label
   */
  getEnv() {
    if (this._env) {
      return this._env;
    }
    throw new Error("Instance Env var not set yet.");
  }

  /**
   * Set env label
   *
   * @param {string|*} env env label
   * @returns {EnvHelper} current instance
   */
  setEnv(env) {
    this._env = env;
    return this;
  }

  /**
   * Get all env labels
   *
   * @returns {string[]|*} all env labels
   */
  getEnvLabels() {
    // Return this._envLabelMap.keys();
    return Object.keys(this._envLabelMap);
  }

  /**
   * Init alias label map
   *
   * @param {boolean} overwrite whether overwrite exits item
   */
  initEnvAliasLabelMap(overwrite = true) {
    let envLabels = this.getEnvLabels();
    if (envLabels.length > 0) {
      this._envAliasLabelMap = {};
      for (let rowLabel of envLabels) {
        let rowAliasList = this.getEnvLabelAliasListByEnvLabel(rowLabel);
        if (rowAliasList.length > 0) {
          for (let aliasItemName of rowAliasList) {
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

  /**
   * Get env alias label map
   * @returns {Object|null} envAliasLabelMap
   */
  getEnvAliasLabelMap() {
    if (this._envAliasLabelMap) {
      return this._envAliasLabelMap;
    }
    this.initEnvAliasLabelMap();
    return this._envAliasLabelMap;
  }

  /**
   * Env label correction
   * @param {string|*} env input env label
   * @returns {string|null} correct env label
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
    return null;
  }

  /**
   * Get env url prefix by env label
   *
   * @param {string|*} env env label
   * @returns {string|null} env url prefix
   */
  envPrefix(env) {
    let vEnv = env;
    if (vEnv === undefined) {
      vEnv = this.getEnv();
    }
    vEnv = this.fixEnv(vEnv);
    let envLabelPrefixMap = this.getEnvLabelPrefixMap();
    if (Object.keys(envLabelPrefixMap).includes(vEnv)) {
      return envLabelPrefixMap[vEnv];
    }
    return null;
  }

  /**
   * Get env label by env url prefix
   *
   * @param {string|*} prefix env url prefix
   * @returns {string} env label
   */
  prefixEnv(prefix) {
    if (prefix === "") {
      return this.fixEnv("prod");
    }
    if (prefix && prefix.endsWith("-")) {
      let prefixSegment = prefix.slice(0, -1);
      let envAliasLabelMap = this.getEnvAliasLabelMap();
      if (Object.keys(envAliasLabelMap).includes(prefixSegment)) {
        return envAliasLabelMap[prefixSegment];
      }
    }
    return this.fixEnv("prod");
  }

  /* eslint max-depth: [2, 6] */
  /**
   * Detect env url prefix by url
   * @param {string} url the url may contains env url prefix
   * @returns {string|*} detected env url prefix
   */
  detectUrlPrefix(url) {
    if (url) {
      let pos = url.indexOf("://");
      if (pos !== -1) {
        let subDomainDotPos = url.slice(pos + 3).indexOf(".");
        if (subDomainDotPos !== -1) {
          let subDomainPart = url.slice(pos + 3, pos + 3 + subDomainDotPos);
          let dashPos = subDomainPart.indexOf("-");
          if (dashPos !== -1) {
            let prefixDetect = subDomainPart.slice(0, dashPos + 1);
            let prefixSegment = prefixDetect.slice(0, -1);
            let envAliasLabelMap = this.getEnvAliasLabelMap();
            if (Object.keys(envAliasLabelMap).includes(prefixSegment)) {
              return prefixDetect;
            }
          }
        }
      }
    }
    return null;
  }

  /**
   * Detect env label by url
   *
   * @param {string} url the url may contains env url prefix
   * @returns {string} detected env label
   */
  detectEnvByUrl(url) {
    return this.prefixEnv(this.detectUrlPrefix(url));
  }

  /**
   * Generate env prefix url by template url
   * @param {string} tplUrl template url
   * @param {string} env env label
   * @returns {string|*} generated env prefix url
   */
  genEnvUrlByTplUrl(tplUrl, env) {
    let prefix = this.envPrefix(env);
    if (tplUrl) {
      let pos = tplUrl.indexOf("://");
      if (pos !== -1) {
        return tplUrl.slice(0, pos + 3) + prefix + tplUrl.slice(pos + 3);
      }
    }
    return tplUrl;
  }

  /**
   * Generate env prefix url by web url
   *
   * @param {string} webUrl web url that may contains other env url prefix
   * @param {string} env env label
   * @returns {string|*} generated env prefix url
   */
  genEnvUrlByWebUrl(webUrl, env) {
    if (webUrl) {
      let prefix = this.envPrefix(env);
      let pos = webUrl.indexOf("://");
      if (pos !== -1) {
        let subDomainDotPos = webUrl.slice(pos + 3).indexOf(".");
        if (subDomainDotPos !== -1) {
          let subDomainPart = webUrl.slice(pos + 3, pos + 3 + subDomainDotPos);
          let dashPos = subDomainPart.indexOf("-");
          if (dashPos !== -1) {
            let prefixDetect = subDomainPart.slice(0, dashPos + 1);
            let prefixSegment = prefixDetect.slice(0, -1);
            let envAliasLabelMap = this.getEnvAliasLabelMap();
            if (Object.keys(envAliasLabelMap).includes(prefixSegment)) {
              return (
                webUrl.slice(0, pos + 3) +
                prefix +
                webUrl.slice(pos + 3 + prefixDetect.length)
              );
            }
          }
          return webUrl.slice(0, pos + 3) + prefix + webUrl.slice(pos + 3);
        }
      }
    }
    return webUrl;
  }
}
const envhelper = EnvHelper.getInstance();
export { envhelper, EnvHelper };
export default envhelper;
