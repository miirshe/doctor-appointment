import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const SpecialitiesSlices = createApi({
    reducerPath: 'SpecialitiesSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['specialities'],
    endpoints: (builder) => ({

        createSpeciality: builder.mutation({
            query: (newSpeciality) => ({
                url: 'createSpecialities',
                method: 'POST',
                body: newSpeciality
            }),
            invalidatesTags: ['specialities']
        }),

        updateSpecialities: builder.mutation({
            query: ({ id, updateSpecialities }) => ({
                url: `updateSpecialities/${id}`,
                method: 'POST',
                body: updateSpecialities
            }),
            invalidatesTags: ['specialities']
        }),

        deleteSpecialities: builder.mutation({
            query: (id) => ({
                url: `deleteSpecialities/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['specialities']
        }),

        getSpecialities: builder.query({
            query: () => {
                return {
                    url: 'getSpecialities',
                    method: 'GET',
                }
            },
            providesTags: ['specialities']
        })


    })
})

export const {
    useCreateSpecialityMutation,
    useUpdateSpecialitiesMutation,
    useDeleteSpecialitiesMutation,
    useGetSpecialitiesQuery,
} = SpecialitiesSlices