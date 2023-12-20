import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const HospitalSlices = createApi({
    reducerPath : 'HospitalSlices',
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL
    }),
    tagTypes : ['hospital'],
    endpoints : (builder) => ({


        createHospital : builder.mutation({
            query : (newHospital) => ({
                url : '',
                method : 'POST',
                body : newHospital,
            }),
            invalidatesTags : ['hospital'] 
        }),


        updateHospital : builder.mutation({
            query : ({id , updateHospital}) => ({
                url : `/${id}`,
                method : 'POST',
                body : updateHospital,
            }),
            invalidatesTags : ['hospital'] 
        }),


        deleteHospital : builder.mutation({
            query : (id) => ({
                url : `/${id}`,
                method : 'POST',
            }),
            invalidatesTags : ['hospital'] 
        }),

        getHospitals : builder.query({
            query : () => {
                return {
                    url : '',
                    method : 'GET',
                }
            },
            providesTags : ['hospital']
        })

    })
})

export const {
    useCreateHospitalMutation,
    useUpdateHospitalMutation,
    useDeleteHospitalMutation,
    useGetHospitalsQuery
} = HospitalSlices