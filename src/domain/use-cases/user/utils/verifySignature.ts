import { utils } from "ethers";
interface IverifySignatureParams {
    signature: string;
    message: string;
    signerAddress: string;
}
export const verifySignature = (params: IverifySignatureParams): boolean => {
    try {
        const { message, signature, signerAddress } = params;
        const signer = utils.verifyMessage(message, signature);
        return signer.toLowerCase() === signerAddress.toLowerCase();
    } catch (error) {
        console.log(error);
        const err = {
            message: "Signature verification failed",
        };
        throw err;
    }
};

interface IgetSignatureSignerParams {
    signature: string;
    message: string;
}

export const getSignatureSigner = (
    params: IgetSignatureSignerParams
): string => {
    try {
        const { message, signature } = params;
        const signer = utils.verifyMessage(message, signature);
        return signer;
    } catch (error) {
        console.log(error);
        const err = {
            message: "Signature verification failed",
        };
        throw err;
    }
};
