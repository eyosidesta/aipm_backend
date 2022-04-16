const FailureResponse = (msg, code, data=null) => {
    return {
        status: false,
        code: code,
        message: msg,
        data: data,
    }
}

const successResponse = (msg, code, data=null) => {
    return {
        status: true,
        code: code,
        message: msg,
        data: data,
    }
}

module.exports.failure_response = FailureResponse;
module.exports.success_response = successResponse;