import { userDataSource } from "../../../../src/infrastructure/data-sources/mongodb/mongodb-user-data-source";
jest.mock(
    "../../../../src/infrastructure/data-sources/mongodb/database-wrappers/user-database-wrapper"
);

describe("mongodb user data source", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should get user", async () => {
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

        const user = await userDataSource.getUser(getUserInputQuery);

        expect(user).toStrictEqual(userReturnValue);
    });

    it("should create user", async () => {
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

        const user = await userDataSource.createUser(createUserInputData);

        expect(user).toStrictEqual(userReturnValue);
    });
});
