// 改进promise调用then的时，pending状态的处理
// 采用发布订阅模式： 如果当前状态是pending时， 需要将成功的回调和失败的回调存放起来，稍后调用resolve和reject时重新执行

const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败
const PENDING = "PENDING"; // 等待态
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; //  专门用来存放成功的回调
    this.onRejectedCallbacks = []; // 专门用来存放失败的回调
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
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
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // todo...
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        // todo...
        onRejected(this.reason);
      });
    }
  }
}
module.exports = Promise;
