export const formatMongoDBValidationError = (
    err: any
): { status: number; message: string | object } => {
    let errors = Object.values(err.errors).map((el: any) => el.message);
    let fields = Object.values(err.errors).map((el: any) => el.path);
    let status = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join("");
        return {
            status,
            message: formattedErrors,
        };
    } else {
        return {
            status,
            message: { message: errors, field: fields },
        };
    }
};

export const formatMongoDBDuplicateKeyError = (
    err: any
): { status: number; message: string } => {
    const field = Object.keys(err.keyValue);
    const status = 409;
    const error = `A record with that ${field} already exists.`;
    return {
        status,
        message: error,
    };
};
