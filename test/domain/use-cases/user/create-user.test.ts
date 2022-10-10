import { createUser } from "../../../../src/domain/use-cases/user/create-user";

jest.mock("../../../../src/infrastructure/repositories/user-repository");
describe("create user", () => {
    describe("given that the signature is invalid/malformed", () => {
        it("should throw 'Signature verification failed' error", async () => {
            const signature =
                "0xd424a02189ecb17e53b9866a7a56299c9dcbf533728ab51d61aac6391c4b57322ed53bd96fac0f5d9ec2d701daef2a800865ab8a9da736786260a1fc111db38d1cntjiur43583u"; // a wrong signature
            const userData = {
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
            };
            const message = "signup";
            try {
                expect.assertions(1);
                await createUser.execute(signature, message, userData);
            } catch (error: any) {
                expect(error.message).toBe("Signature verification failed");
            }
        });
    });

    describe("given that the signature is of different message other than the message was passed", () => {
        it("should throw 'Signature and signer do not match' error", async () => {
            const signature =
                "0xd424a02189ecb17e53b9866a7a56299c9dcbf533728ab51d61aac6391c4b57322ed53bd96fac0f5d9ec2d701daef2a800865ab8a9da736786260a1fc111db38d1c";
            const userData = {
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684", // this is the signer
                email: "test123@gmail.com",
                username: "testuser",
            };
            const message = "a wrong message";
            try {
                expect.assertions(1);
                await createUser.execute(signature, message, userData);
            } catch (error: any) {
                expect(error.message).toBe("Signature and signer do not match");
            }
        });
    });

    describe("given that the signature is valid but the wallet address in the userData object is not the signer", () => {
        it("should throw 'Signature and signer do not match' error", async () => {
            const signature =
                "0xd424a02189ecb17e53b9866a7a56299c9dcbf533728ab51d61aac6391c4b57322ed53bd96fac0f5d9ec2d701daef2a800865ab8a9da736786260a1fc111db38d1c";
            const userData = {
                walletAddress: "0x9702ddCD32d351A378639eA4e0F25Cf820c0BC7E", // this is not the signer
                email: "test123@gmail.com",
                username: "testuser",
            };
            const message = "signup";
            try {
                expect.assertions(1);
                await createUser.execute(signature, message, userData);
            } catch (error: any) {
                expect(error.message).toBe("Signature and signer do not match");
            }
        });
    });

    describe("given that the signature is valid, and the wallet address in the userData object is the signer", () => {
        it("should create and return user", async () => {
            const signature =
                "0xd424a02189ecb17e53b9866a7a56299c9dcbf533728ab51d61aac6391c4b57322ed53bd96fac0f5d9ec2d701daef2a800865ab8a9da736786260a1fc111db38d1c";
            const userData = {
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684", // this is the signer
                email: "test123@gmail.com",
                username: "testuser",
            };
            const expectedOutput = {
                id: "6310c2f459e35550c2df3e97",
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
            };
            const message = "signup";
            const user = await createUser.execute(signature, message, userData);
            expect(user).toStrictEqual(expectedOutput);
        });
    });
});
