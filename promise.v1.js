const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败
const PENDING = "PENDING"; // 等待态
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };
    try {
      executor(resolve, reject); // 立即执行
    } catch (e) {
      // 错误处理 需要直接走错误逻辑
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
module.exports = Promise;
