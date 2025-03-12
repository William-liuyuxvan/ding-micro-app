export const signToken = () => {
    // token签名操作
    return "1234";
}

export const checkToken = () => {
    // tolen校验操作
    const check = (token) => {
        return token == "1234"
    }
    return check(token);
}