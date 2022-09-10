import { createUser } from "../../../../src/domain/use-cases/user/create-user";

jest.mock("../../../../src/infrastructure/repositories/user-repository");
describe("create user", () => {
    describe("given that the signature is invalid/malformed", () => {
        it("should throw 'Signature verification failed' error", async () => {
            const signature =
                "0xadf82d8732e3fe03fa7c2031493066150628b09e463af14d33f66b88d8d021b26a1ac0488945c1396246df27009523ec92f2a04b54fa71629303dcbfa6e1995e1chguhgue"; // a wrong signature
            const userData = {
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
            };
            try {
                expect.assertions(1);
                await createUser.execute(signature, userData);
            } catch (error: any) {
                expect(error.message).toBe("Signature verification failed");
            }
        });
    });

    describe("given that the signature is valid but the wallet address in the userData object is not the signer", () => {
        it("should throw 'Signature and signer do not match' error", async () => {
            const signature =
                "0xadf82d8732e3fe03fa7c2031493066150628b09e463af14d33f66b88d8d021b26a1ac0488945c1396246df27009523ec92f2a04b54fa71629303dcbfa6e1995e1c";
            const userData = {
                walletAddress: "0x9702ddCD32d351A378639eA4e0F25Cf820c0BC7E", // this is not the signer
                email: "test123@gmail.com",
                username: "testuser",
            };
            try {
                expect.assertions(1);
                await createUser.execute(signature, userData);
            } catch (error: any) {
                expect(error.message).toBe("Signature and signer do not match");
            }
        });
    });

    describe("given that the signature is valid, and the wallet address in the userData object is the signer", () => {
        it("should create and return user", async () => {
            const signature =
                "0xadf82d8732e3fe03fa7c2031493066150628b09e463af14d33f66b88d8d021b26a1ac0488945c1396246df27009523ec92f2a04b54fa71629303dcbfa6e1995e1c";
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
            const user = await createUser.execute(signature, userData);
            expect(user).toStrictEqual(expectedOutput);
        });
    });
});
