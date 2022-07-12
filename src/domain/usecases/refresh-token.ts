import { RefreshTokenModel } from '../models';

export interface RefreshToken {
  refresh: (params: RefreshToken.Params) => Promise<RefreshToken.Model>;
}

export namespace RefreshToken {
  export type Params = {
    refreshToken: string;
  };

  export type Model = RefreshTokenModel;
}
