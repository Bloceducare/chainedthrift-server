import { checkUser } from "../../../../src/domain/use-cases/user/check-user";

jest.mock("../../../../src/infrastructure/repositories/user-repository");
describe("check user", () => {
    describe("given that wallet address is invalid", () => {
        it("should throw 'invalid wallet address' error", async () => {
            const walletAddress =
                "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684fgfgn";
            try {
                expect.assertions(1);
                await checkUser.execute(walletAddress);
            } catch (error: any) {
                expect(error.message).toBe("invalid wallet address");
            }
        });
    });

    describe("given that wallet address is valid", () => {
        it("should return an object with 'exist' key set to true", async () => {
            const walletAddress = "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684";
            const expectedOutput = {
                exist: true,
            };
            const user = await checkUser.execute(walletAddress);
            expect(user).toStrictEqual(expectedOutput);
        });
    });
});
