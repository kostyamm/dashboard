class ApiError extends Error {
    constructor(status, statusText, message) {
        super()
        this.status = status
        this.message = message
        this.statusText = statusText
    }

    static badRequest(message) {
        return new ApiError(400, 'Bad Request', message)
    }

    static internal(message) {
        return new ApiError(500, 'Internal', message)
    }

    static forbidden(message) {
        return new ApiError(403, 'Forbidden', message)
    }
}

module.exports = ApiError