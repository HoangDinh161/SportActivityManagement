module.exports = {
    multiToObject: function (monOnj) {
        return monOnj.map((mon) => mon.toObject());
    },
    singleToObject: function (monObj) {
        return monObj ? monObj.toObject() : monObj;
    },
};
