import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const AppointmentSlices = createApi({
    reducerPath: 'AppointmentSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['appointment'],
    endpoints: (builder) => ({

        createAppointment: builder.mutation({
            query: (newAppointment) => ({
                url: 'createAppointment',
                method: 'POST',
                body: newAppointment
            }),
            invalidatesTags: ['appointment']
        }),

        updateAppointment: builder.mutation({
            query: ({ id, updateAppointment }) => ({
                url: `updateAppointment/${id}`,
                method: 'POST',
                body: updateAppointment
            }),
            invalidatesTags: ['appointment']
        }),

        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `deleteAppointment/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['appointment']
        }),

        getAppointments : builder.query({
            query : () => {
                return {
                    url : 'getAppointments',
                    method : 'GET',
                }
            },
            providesTags : ['appointment']
        })


    })
})

export const { 
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetAppointmentsQuery
} = AppointmentSlices
