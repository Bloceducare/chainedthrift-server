import { userRepositoryImpl } from "../../../src/infrastructure/repositories/user-repository";

jest.mock(
    "../../../src/infrastructure/data-sources/mongodb/mongodb-user-data-source"
);

describe("user repository test", () => {
    it("it should handle getting user correctly", async () => {
        const getUserInputQuery = {
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
        };
        const userReturnValue = {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
        const user = await userRepositoryImpl.getUser(getUserInputQuery);
        expect(user).toStrictEqual(userReturnValue);
    });

    it("it should handle creating user correctly", async () => {
        const createUserInputData = {
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
        };
        const userReturnValue = {
            _id: "6310c2f459e35550c2df3e97",
            walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
            email: "test123@gmail.com",
            username: "testuser",
            __v: 0,
        };
        const user = await userRepositoryImpl.createUser(createUserInputData);
        expect(user).toStrictEqual(userReturnValue);
    });
});
