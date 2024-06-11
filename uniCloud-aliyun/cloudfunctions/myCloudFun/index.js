'use strict';
exports.main = async (event, context) => {
    let { name, age } = event;
    return `我的名字是${name},我的年龄是${age}`

};
