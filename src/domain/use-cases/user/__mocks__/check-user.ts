export const checkUser = {
    execute: async (walletAddress: string): Promise<{ exist: boolean }> => {
        try {
            const match = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
            if (!match) {
                const err = {
                    message: "invalid wallet address",
                };

                throw err;
            }

            // just return true
            return { exist: true };
        } catch (error) {
            throw error;
        }
    },
};
