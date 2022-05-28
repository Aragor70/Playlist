// handle try {do something} / catch {print error message}

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}
module.exports = asyncHandler