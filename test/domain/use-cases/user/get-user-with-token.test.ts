import { getUserWithToken } from "../../../../src/domain/use-cases/user/get-user-with-token";
jest.mock("../../../../src/infrastructure/repositories/user-repository");
// jest.mock("../../../../src/domain/use-cases/user/utils/token");

describe("get user with token usecase", () => {
    describe("given that the token is invalid", () => {
        it("should throw 'invalid signature' error", async () => {
            const tokenInput =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWRkcmVzcyI6IjB4ZDVlNDQ4NDMyNmViM2RkNWZiYmQ1ZGVmNmQwMmFmZTgxN2ZkNDY4NCIsImlhdCI6MTY2NzY4NDQ4NiwiZXhwIjoxNjY3Njg0NDkxfQ.F08FhsV2Z410MhHV6xczHeHhus-R4hkVWqIFO3rt8Ne";
            const expectedErrorString = "invalid signature";
            try {
                expect.assertions(1);
                await getUserWithToken.execute(tokenInput);
            } catch (error: any) {
                expect(error.message).toBe(expectedErrorString);
            }
        });
    });

    describe("given that then token has expired", () => {
        it("should throw 'jwt expired' error", async () => {
            const tokenInput =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWRkcmVzcyI6IjB4ZDVlNDQ4NDMyNmViM2RkNWZiYmQ1ZGVmNmQwMmFmZTgxN2ZkNDY4NCIsImlhdCI6MTY2NzY4NDQ4NiwiZXhwIjoxNjY3Njg0NDkxfQ.F08FhsV2Z410MhHV6xczHeHhus-R4hkVWqIFO3rt8N8";
            const expectedErrorString = "jwt expired";
            try {
                expect.assertions(1);
                await getUserWithToken.execute(tokenInput);
            } catch (error: any) {
                expect(error.message).toBe(expectedErrorString);
            }
        });
    });
});
