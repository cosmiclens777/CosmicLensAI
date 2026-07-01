export const success = (data = {}, message = "Success") => {
    return {
        success: true,
        message,
        data,
    };
};

export const error = (message = "Something went wrong", errors = null) => {
    return {
        success: false,
        message,
        errors,
    };
};