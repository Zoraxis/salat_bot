let users = [];

module.exports = {
    setUsers: (exportList) => {
        users = exportList;
    },
    getUsers: () => {
        return users;
    }
};