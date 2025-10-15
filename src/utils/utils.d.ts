import type { PayloadType, UsersType } from "../types/types.js";
export declare const isUser: (data: unknown) => data is UsersType;
export declare const dateNow: string;
export declare const hashedPass: (password_hash: string) => Promise<string>;
export declare const comparePass: (password_hash: string, passwordInput: string) => Promise<boolean>;
export declare const createToken: (payload: PayloadType) => string[];
export declare const refreshToken: (refresh_token: string, payload: PayloadType) => string | null;
//# sourceMappingURL=utils.d.ts.map