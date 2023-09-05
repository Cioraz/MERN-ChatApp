// For any middleware we take 3 things 
// next -> after completing one logic we move to next
const notFound = (req, res, next) => {

    // Taking the error which occurs when all other functions dont get triggered
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // Here it checks the status code whether it is 200 or 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Displays that status code
    res.status(statusCode);

    // Displays the error message where it checks if app is in production then doesnt return error messages
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}

module.exports = { notFound, errorHandler };