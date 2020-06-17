// resolvePromise 所有的promise都要支持

const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败
const PENDING = "PENDING"; // 等待态
const resolvePromise = (promise2, x, resolve, reject) => {
  // 防止循环引用 自己等待自己完成 错误的实现
  if (promise2 === x) {
    // 用一个类型错误 结束掉promise
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called;
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    // 有可能是一个promise，要继续判断
    try {
      let then = x.then;
      if (typeof then === "function") {
        // promise
        // 不要写成x.then  直接then.call就可以了 因为x.then 会再次取值
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject); // 递归解析的过程
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 非promise
        resolve(x);
      }
    } catch (e) {
      // 防止失败了，再次进入成功
      if (called) return;
      called = true;
      reject(e); // 取值出错
    }
  } else {
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; //  专门用来存放成功的回调
    this.onRejectedCallbacks = []; // 专门用来存放失败的回调
    let resolve = (value) => {
      // 调用此方法就是成功
      if (value instanceof Promise) {
        return value.then(resolve, reject); // 递归解析resolve中的参数,直到这个值是普通值
      }
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
      executor(resolve, reject); // 立即执行
    } catch (e) {
      // 错误处理 需要直接走错误逻辑
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      // 为了实现链式调用
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

// promise的延迟对象
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
