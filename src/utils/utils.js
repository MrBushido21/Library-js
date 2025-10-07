export const isUser = (data) => {
    const user = data;
    return Boolean(user && typeof user === 'object' && user.id && user.username && user.password);
};
//# sourceMappingURL=utils.js.map