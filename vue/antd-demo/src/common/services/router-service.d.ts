import { RouteConfig } from 'vue-router'

// 不允许设置path，因为已经在前一个参数指定了
interface SdRouteConfig extends Omit<RouteConfig, 'path'> {}

export default routerService
/**
 * 维护路由信息
 */
declare namespace routerService {
  export { route }
}
/**
 * 添加一条路由记录
 */
declare function route(path: string, options: SdRouteConfig): Route
/**
 * 根据 path 获取路由记录
 */
declare function route(path: string): Route
declare class Route {
  path: string
  options: SdRouteConfig
  /**
   * 添加一条路由记录
   */
  child(path: string, options: SdRouteConfig): Route
}
