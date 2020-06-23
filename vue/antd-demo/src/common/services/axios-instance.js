/* eslint-disable filenames/match-exported */
// eslint-disable-next-line no-restricted-imports
import axiosDefault from 'axios'

/**
 * 定制的axios实例，增加了自动处理身份信息等机制
 */
const axios = axiosDefault.create()

export default axios
