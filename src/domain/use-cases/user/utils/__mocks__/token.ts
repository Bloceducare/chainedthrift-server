export const generateToken = (userAddress: string): string => {
    return "token";
};

export const verifyToken = (token: string): any => {
    return {
        userAddress: "0xd5e4484326eb3dd5fbbd5def6d02afe817fd4684",
        iat: 1666562299,
        exp: 1667167099,
    };
};
