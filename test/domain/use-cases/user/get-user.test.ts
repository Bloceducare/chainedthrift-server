import { getUser } from "../../../../src/domain/use-cases/user/get-user";
jest.mock("../../../../src/infrastructure/repositories/user-repository");
describe("get user usecase", () => {
    describe("given that the signature is invalid/malformed", () => {
        it("should throw Signature verification failed error", async () => {
            const signatureInput =
                "0xb8ca25fcbc7edfc79fda3aebb624f91d4b232f261b1e8e3ae87aac6c0e612be462e24bfd5a790b2a6cade471b6731630eb4dae69b039ea75a0489d8136a97a6d1";
            try {
                expect.assertions(1);
                await getUser.execute(signatureInput);
            } catch (error: any) {
                expect(error.message).toBe("Signature verification failed");
            }
        });
    });
    describe("given that the signature is correct", () => {
        it("should return a user", async () => {
            const signatureInput =
                "0xb8ca25fcbc7edfc79fda3aebb624f91d4b232f261b1e8e3ae87aac6c0e612be462e24bfd5a790b2a6cade471b6731630eb4dae69b039ea75a0489d8136a97a6d1b";
            const expectedOutput = {
                id: "6310c2f459e35550c2df3e97",
                walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                email: "test123@gmail.com",
                username: "testuser",
            };
            const user = await getUser.execute(signatureInput);
            expect(user).toStrictEqual(expectedOutput);
        });
    });
});
