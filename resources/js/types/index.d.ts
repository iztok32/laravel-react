import { Config, RouteParam, RouteName } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    locale: string;
    availableLocales: string[];
    translations: Record<string, string>;
};

declare global {
    function route(): { current: (name?: string, params?: any) => boolean };
    function route(
        name: RouteName,
        params?: RouteParam | undefined,
        absolute?: boolean,
        config?: Config,
    ): string;
}
