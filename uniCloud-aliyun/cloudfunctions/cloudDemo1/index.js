'use strict';
const db = uniCloud.database(); // 连通数据库

exports.main = async (event, context) => {
    try {
        let res = await db.collection("users").get();
        return {
            success: true,
            data: res.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};
