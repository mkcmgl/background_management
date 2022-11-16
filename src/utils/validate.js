/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

// /**
//  * @param {string} email
//  * @returns {Boolean}
//  */
// export function validEmail(email) {
//     const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return reg.test(email)
// }

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
        return true
    }
    return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(rule, value, callback) {
    if (!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value)) {
        callback(new Error("请输入正确手机号"));
    } else {
        callback();
    }

}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(rule, value, callback) {
    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            value
        )) {
        callback(new Error("请输入正确的邮箱"));
    } else {
        callback();
    }
}





/**
 * @param {string} name 5-10
 * @returns {Boolean}
 */

export function validName(rule, value, callback) {
    if (value.length < 5 && value.length > 20) {
        callback(new Error("用户账号长度必须介于 5 和 20 之间"));
    } else if (/\s+/g.test(value)) {
        callback(new Error("不允许有空格"));
    } else {
        callback();
    }
}
/**
 * @param {string} password 
 * @returns {Boolean}
 */
export function validPassword(rule, value, callback) {
    // if (!/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
    if (!/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(
            value
        )) {
        callback(new Error("密码必须包含数字，大小写字母，特殊字符，长度6-20！"));
    } else {
        callback();
    }
}



/**
 * @param {string} space 
 * @returns {Boolean}
 */
export function validSpace(rule, value, callback) {

    if (/\s+/g.test(value)) {
        callback(new Error("不允许有空格"));
    } else {
        callback()
    }
};
/**
 * @param {string} 255 
 * @returns {Boolean}
 */
export function validLength(rule, value, callback) {

    if (value.length > 255) {
        callback(new Error("内容长度最大255"));
    } else {
        callback()
    }
};