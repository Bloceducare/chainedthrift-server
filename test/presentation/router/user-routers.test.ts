import request from "supertest";
import app from "../../../src/app";
import userMiddleware from "../../../src/presentation/routers/user-router";
jest.mock("../../../src/domain/use-cases/user/check-user");
jest.mock("../../../src/domain/use-cases/user/get-user");
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
                await request(app).get("/api/user/get-user").expect(401);
            }));

        describe("given that signature is sent along with the request", () =>
            it("should return user object with 200 status code", async () => {
                const expectedUserObject = {
                    id: "6310c2f459e35550c2df3e97",
                    walletAddress: "0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684",
                    email: "test123@gmail.com",
                    username: "testuser",
                };
                await request(app)
                    .get("/api/user/get-user")
                    .send({
                        signature:
                            "0xb8ca25fcbc7edfc79fda3aebb624f91d4b232f261b1e8e3ae87aac6c0e612be462e24bfd5a790b2a6cade471b6731630eb4dae69b039ea75a0489d8136a97a6d1b",
                    })
                    .expect(200, expectedUserObject);
            }));
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
                    "0xadf82d8732e3fe03fa7c2031493066150628b09e463af14d33f66b88d8d021b26a1ac0488945c1396246df27009523ec92f2a04b54fa71629303dcbfa6e1995e1c";
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
                };
                await request(app)
                    .post("/api/user/create-user")
                    .send({
                        signature: signatureInput,
                        userData: userDataInput,
                    })
                    .expect(200, expectedCreatedUserOutput);
            }, 20000);
        });
    });
});
