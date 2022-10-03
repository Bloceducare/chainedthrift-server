import { getUser } from "../../../../src/domain/use-cases/user/get-user";
jest.mock("../../../../src/infrastructure/repositories/user-repository");
describe("get user usecase", () => {
    describe("given that the signature is invalid/malformed", () => {
        it("should throw Signature verification failed error", async () => {
            const signatureInput =
                "0xcbb179ac3c21d727753b906909f7750517ad95ea86a82b3a6a0fab95201a313b787dce8b11fed6ce65d1d4da3d7a4807843b02de37862096225695c1f5e55d031";
            const message = "signin";
            const address = "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684";
            try {
                expect.assertions(1);
                await getUser.execute(signatureInput, message, address);
            } catch (error: any) {
                expect(error.message).toBe("Signature verification failed");
            }
        });
    });

    describe("given that the signature is correct", () => {
        it("should return a user", async () => {
            const signatureInput =
                "0xcbb179ac3c21d727753b906909f7750517ad95ea86a82b3a6a0fab95201a313b787dce8b11fed6ce65d1d4da3d7a4807843b02de37862096225695c1f5e55d031c";
            const message = "signin";
            const address = "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684";
            const expectedOutput = {
                id: "6310c2f459e35550c2df3e97",
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
            };
            const user = await getUser.execute(
                signatureInput,
                message,
                address
            );
            expect(user).toStrictEqual(expectedOutput);
        });
    });
});
