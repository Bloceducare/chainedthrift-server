import request from "supertest";
import app from "../../../src/app";
import userMiddleware from "../../../src/presentation/routers/user-router";
jest.mock("../../../src/domain/use-cases/user/check-user");
jest.mock("../../../src/domain/use-cases/user/get-user");
jest.mock("../../../src/domain/use-cases/user/get-user-with-token");
jest.mock("../../../src/domain/use-cases/user/create-user");

describe("user router", () => {
    beforeAll(() => {
        app.use("/api/user", userMiddleware);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("check user", () => {
        describe("given that walletAddress query param is not proivided", () => {
            it("should return error 401", async () => {
                await request(app).get("/api/user/check").expect(401);
            });
        });

        describe("given that walletAddress query param is provided", () => {
            it("should return an object with 'exist' as a property set to a bolean value", async () => {
                await request(app)
                    .get(
                        "/api/user/check?walletAddress=0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684"
                    )
                    .expect(200, { exist: true });
            });
        });
    });

    describe("get user", () => {
        describe("given that signature is not sent along with the request", () =>
            it("should return error 401", async () => {
                await request(app).post("/api/user/get-user").expect(401);
            }));

        describe("given that signature is sent along with the request", () =>
            it("should return user object with 200 status code", async () => {
                const expectedUserObject = {
                    id: "6310c2f459e35550c2df3e97",
                    walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                    email: "test123@gmail.com",
                    username: "testuser",
                    token: "token",
                };
                await request(app)
                    .post("/api/user/get-user")
                    .send({
                        signature:
                            "0xcbb179ac3c21d727753b906909f7750517ad95ea86a82b3a6a0fab95201a313b787dce8b11fed6ce65d1d4da3d7a4807843b02de37862096225695c1f5e55d031c",
                        message: "signin",
                        address: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                    })
                    .expect(200, expectedUserObject);
            }));
    });

    describe("get user with token", () => {
        describe("given that token is not sent along", () => {
            it("its should return error 401", async () => {
                await request(app)
                    .post("/api/user/get-user-with-token")
                    .expect(401);
            });
        });
        // describe("given that a valid token is sent along", () => {
        //     it("should return user object", async () => {
        //         const expectedUserObject = {
        //             id: "6310c2f459e35550c2df3e97",
        //             walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
        //             email: "test123@gmail.com",
        //             username: "testuser",
        //         };
        //         await request(app)
        //             .post("/api/user/get-user-with-token")
        //             .send({
        //                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWRkcmVzcyI6IjB4ZDVlNDQ4NDMyNmViM2RkNWZiYmQ1ZGVmNmQwMmFmZTgxN2ZkNDY4NCIsImlhdCI6MTY2Nzc2MDM4NCwiZXhwIjoxNjY4MzY1MTg0fQ.OGl42VhUV30yhWfbg4I2pKUL1x5olMPFnYki8aeD_mo",
        //             })
        //             .expect(200, expectedUserObject);
        //     });
        // });
    });

    describe("create user", () => {
        describe("given that signature is not sent", () => {
            it("should return error 401", async () => {
                const userDataInput = {
                    walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                    email: "test123@gmail.com",
                    username: "testuser",
                };
                await request(app)
                    .post("/api/user/create-user")
                    .send({
                        userData: userDataInput,
                    })
                    .expect(401);
            });
        });

        describe("given that userData is not sent", () => {
            it("should return error 401", async () => {
                const signatureInput =
                    "0xb8ca25fcbc7edfc79fda3aebb624f91d4b232f261b1e8e3ae87aac6c0e612be462e24bfd5a790b2a6cade471b6731630eb4dae69b039ea75a0489d8136a97a6d1b";
                await request(app)
                    .post("/api/user/create-user")
                    .send({
                        signature: signatureInput,
                    })
                    .expect(401);
            });
        });

        describe("given that userData and signature is sent", () => {
            it("should return created user object with status code of 200", async () => {
                const signatureInput =
                    "0xd424a02189ecb17e53b9866a7a56299c9dcbf533728ab51d61aac6391c4b57322ed53bd96fac0f5d9ec2d701daef2a800865ab8a9da736786260a1fc111db38d1c";
                const messageInput = "signup";
                const userDataInput = {
                    walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                    email: "test123@gmail.com",
                    username: "testuser",
                };
                const expectedCreatedUserOutput = {
                    id: "6310c2f459e35550c2df3e97",
                    walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                    email: "test123@gmail.com",
                    username: "testuser",
                    token: "token",
                };
                await request(app)
                    .post("/api/user/create-user")
                    .send({
                        signature: signatureInput,
                        message: messageInput,
                        userData: userDataInput,
                    })
                    .expect(200, expectedCreatedUserOutput);
            }, 20000);
        });
    });
});
