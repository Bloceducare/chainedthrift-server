export interface ICheckUserUsecase {
    execute(walletAddress: string): Promise<{ exist: boolean }>;
}
