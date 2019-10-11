export class Locker {
  constructor() {
    this._locked = false
  }
  isLocked() {
    return this._locked
  }
  lock() {
    this._locked = true
  }
  unlock() {
    this._locked = false
  }
}

/**
 * 関数 fn を排他的に実行します。
 * ロック状態にあるロックオブジェクトで呼び出すと、何もせずに -1 を返します。
 * 
 * # オプション
 * wait {boolean} true なら関数の返り値を await で待機します。
 * waitAll {boolean} true なら関数の返り値を Promise の Iterable として
 *   await Promise.all() で待機します。
 * 
 * @param {Locker} lockObj ロックオブジェクト
 * @param {Function} fn 関数
 * @param {Array} args 引数の配列(省略可能)
 * @param {Object} option オプション(省略可能)
 * 
 */
export async function exclusive(lockObj, fn, args, option) {
  if (lockObj.isLocked()) return -1
  
  if (!args) args = []
  if (!option) option = {}
  
  lockObj.lock()
  
  try {
    const returned = fn(...args)
    
    if (option.wait) {
      await returned
    } else if (option.waitAll) {
      await Promise.all(returned)
    }
  } catch(e) {
    throw e
  } finally {
    lockObj.unlock()
  }
}
