import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const DoctorSlices = createApi({
    reducerPath : 'DoctorSlices',
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL
    }),
    tagTypes : ['doctor'],
    endpoints : (builder) => ({

        registerDoctor : builder.mutation({
            query : (newDoctor) => ({
                url : 'createDoctor',
                method : 'POST',
                body : newDoctor
            }),
            invalidatesTags : ['doctor']
        }),

        loginDoctor : builder.mutation({
            query : (loginDoctor) => ({
                url : '',
                method : 'POST',
                body : loginDoctor
            }),
            invalidatesTags : ['doctor']
        }),

        updateDoctor : builder.mutation({
            query : ({id , updateDoctor}) => ({
                url : `updateDoctor/${id}`,
                method : 'POST',
                body : updateDoctor
            }),
            invalidatesTags : ['doctor']
        }),

        deleteDoctor : builder.mutation({
            query : (id) => ({
                url : `deleteDoctor/${id}`,
                method : 'POST',
            }),
            invalidatesTags : ['doctor']
        }),

        getDoctors : builder.query({
            query : () => {
                return {
                    url : 'getDoctors',
                    method : 'GET',
                }
            },
            providesTags : ['doctor']
        }),

        getDoctor : builder.query({
            query : () => {
                return {
                    url : 'getDoctor',
                    method : 'GET',
                }
            },
            providesTags : ['doctor']
        })

    })
})

export const {
    useRegisterDoctorMutation,
    useLoginDoctorMutation,
    useDeleteDoctorMutation,
    useUpdateDoctorMutation,
    useGetDoctorsQuery,
    useGetDoctorQuery
} = DoctorSlices