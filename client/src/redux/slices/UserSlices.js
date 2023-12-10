import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../BASE_URL'
export const UserSlices = createApi({
    reducerPath : 'UserSlices',
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL
    }),
    tagTypes : ['user'],
    endpoints : (builder) => ({

        registerUser : builder.mutation({
            query : (newData) => ({
                url : 'registerUser',
                method : 'POST',
                body : newData
            }),
            invalidatesTags : ['user']
        }),


        updateUser : builder.mutation({
            query : ({id , updateUser}) => ({
                url : `updateUser/${id}`,
                method : 'POST',
                body : updateUser
            }),
            invalidatesTags : ['user']
        }),


        deleteUser : builder.mutation({
            query: (id) => ({
                url : `deleteUser/${id}`,
                method : 'POST'
            }),
            invalidatesTags : ['user']
        }),


        getUsers : builder.query({
            query : () => {
                return{
                    url : 'getUsers',
                    method : 'GET'
                }
            },
            providesTags:['user']
        }),

        getUser : builder.query({
            query : (id) =>{
                return {
                    url : `getUser/${id}`,
                    method : 'GET'
                }
            } ,
            providesTags:['user']
        })


    })
})

export const {
    useRegisterUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useGetUserQuery
} = UserSlices;