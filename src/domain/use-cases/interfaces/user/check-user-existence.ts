export interface ICheckUserUsecase {
    execute(walletAddress: string): Promise<boolean>;
}
