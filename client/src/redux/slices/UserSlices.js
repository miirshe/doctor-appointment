import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../BASE_URL'
import Cookies from 'js-cookie'
const setToken = (token) => {
    Cookies.set('userToken', token)
}
const getToken = () => {
    return Cookies.get('userToken')
}
export const UserSlices = createApi({
    reducerPath: 'UserSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    tagTypes: ['user'],
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (newData) => ({
                url: 'registerUser',
                method: 'POST',
                body: newData
            }),
            invalidatesTags: ['user']
        }),
        loginUser: builder.mutation({
            query: (loginUser) => ({
                url: 'loginUser',
                method: 'POST',
                body: loginUser
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    if (result) {
                        console.log(result);
                        setToken(result?.data?.user);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            invalidatesTags: ['user']
        }),
        updateUser: builder.mutation({
            query: ({ id, updateUser }) => ({
                url: `updateUser/${id}`,
                method: 'POST',
                body: updateUser
            }),
            invalidatesTags: ['user']
        }),


        deleteUser: builder.mutation({
            query: (id) => ({
                url: `deleteUser/${id}`,
                method: 'POST'
            }),
            invalidatesTags: ['user']
        }),


        getUsers: builder.query({
            query: () => {
                return {
                    url: 'getUsers',
                    method: 'GET'
                }
            },
            providesTags: ['user']
        }),

        getUser: builder.query({
            query: () => {
                return {
                    url: 'getCurrentUser',
                    method: 'GET'
                }
            },
            providesTags: ['user']
        })


    })
})

export const {
    useRegisterUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useLoginUserMutation
} = UserSlices;