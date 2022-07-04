/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin, NewPlugin } from 'pretty-format';

declare global {
  namespace jest {
    interface AsymmetricMatcher {
      $$typeof: symbol;
      sample?: string | RegExp | object | Array<any> | Function;
    }

    interface Options {
      media?: string;
      modifier?: string;
      supports?: string;
    }

    interface Matchers<R, T> {
      toHaveStyleRule(
        property: string,
        value?: string | number | RegExp | AsymmetricMatcher | undefined,
        options?: Options,
      ): R;
    }
  }
}

export declare const styleSheetSerializer: Exclude<Plugin, NewPlugin>;
