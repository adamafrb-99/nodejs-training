const routeInfo = (req, res, next) => {
    const currentDate = new Date()
    console.log(`Path: ${req.path}\nMethod: ${req.method}\nTime of Access: ${currentDate}`);
    next();
}

module.exports = routeInfo;