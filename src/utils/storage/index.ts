import { decrypt, encrypt } from '../crypto'

function createLocalStorage<T extends StorageInterface.Local = StorageInterface.Local>() {
  /** 保存 */
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = encrypt(value)
    window.localStorage.setItem(key as string, json)
  }

  /** 取值 */
  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(key as string)
    if (json) {
      let storageData: T[K] | null = null
      try {
        storageData = decrypt(json)
      } catch {
        // 解析失败
        window.console.error('LocalStorage: 解析错误')
      }
      if (storageData) {
        return storageData
      }
      remove(key)
      return null
    }
    return null
  }

  /** 删除 */
  function remove(key: keyof T) {
    window.localStorage.removeItem(key as string)
  }

  /** 清空 */
  function clear() {
    window.localStorage.clear()
  }

  return { set, get, remove, clear }
}

export const LocalStorage = createLocalStorage()
