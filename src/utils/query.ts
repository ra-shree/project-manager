import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UserInfo {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost/api/' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<UserInfo, string>({
            query: () => `user/`,
        }),
    }),
});

export const { useGetUserInfoQuery } = userApi;
