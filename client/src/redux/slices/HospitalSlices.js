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
                url : 'createHospital',
                method : 'POST',
                body : newHospital,
            }),
            invalidatesTags : ['hospital'] 
        }),


        updateHospital : builder.mutation({
            query : ({id , updateHospital}) => ({
                url : `updateHospital/${id}`,
                method : 'POST',
                body : updateHospital,
            }),
            invalidatesTags : ['hospital'] 
        }),


        deleteHospital : builder.mutation({
            query : (id) => ({
                url : `deleteHospital/${id}`,
                method : 'POST',
            }),
            invalidatesTags : ['hospital'] 
        }),

        getHospitals : builder.query({
            query : () => {
                return {
                    url : 'getHospitals',
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