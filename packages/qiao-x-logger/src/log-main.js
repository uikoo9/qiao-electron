// logs
const logs = ['debug', 'info', 'warn', 'error'];

/**
 * Logger
 * @param {*} namespace
 */
export const Logger = (namespace) => {
  const obj = {};
  obj.namespace = namespace;
  logs.forEach(function (logType) {
    obj[logType] = function (methodName, ...msg) {
      log(logType, this.namespace, methodName, ...msg);
    };
  });

  return obj;
};

// log
function log(logType, namespace, methodName, ...msg) {
  // check
  if (!global.logger) {
    console.log('qiao-x-logger / global.logger not init');
    return;
  }
  if (!namespace) {
    console.log('qiao-x-logger / need namespace');
    return;
  }
  if (!methodName) {
    console.log('qiao-x-logger / need methodName');
    return;
  }

  const finalMsg = `${namespace} / ${logType} / ${methodName} / ${msg}`;
  global.logger[logType](finalMsg);
}
