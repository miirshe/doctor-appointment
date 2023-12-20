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
                url: '',
                method: 'POST',
                body: newAppointment
            }),
            invalidatesTags: ['appointment']
        }),

        updateAppointment: builder.mutation({
            query: ({ id, updateAppointment }) => ({
                url: `/${id}`,
                method: 'POST',
                body: updateAppointment
            }),
            invalidatesTags: ['appointment']
        }),

        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['appointment']
        }),

        getAppointments : builder.query({
            query : () => {
                return {
                    url : '',
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
