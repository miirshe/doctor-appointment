import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies from "js-cookie";
const setToken = (token) => {
    Cookies.set('doctorToken', token)
}
const getToken = () => {
    return Cookies.get('doctorToken')
}
export const DoctorSlices = createApi({
    reducerPath: 'DoctorSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization',token);
            }
            return headers;
        },
    }),
    tagTypes: ['doctor'],
    endpoints: (builder) => ({

        registerDoctor: builder.mutation({
            query: (newDoctor) => (
                console.log(newDoctor), {
                    url: 'createDoctor',
                    method: 'POST',
                    body: newDoctor
                }),
            invalidatesTags: ['doctor']
        }),

        loginDoctor: builder.mutation({
            query: (loginDoctor) => ({
                url: 'loginDoctor',
                method: 'POST',
                body: loginDoctor
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    if (result) {
                        console.log(result);
                        setToken(result?.data?.doctor);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            invalidatesTags: ['doctor']
        }),

        updateDoctor: builder.mutation({
            query: ({ id, updateDoctor }) => ({
                url: `updateDoctor/${id}`,
                method: 'POST',
                body: updateDoctor
            }),
            invalidatesTags: ['doctor']
        }),

        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `deleteDoctor/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['doctor']
        }),

        getDoctors: builder.query({
            query: () => {
                return {
                    url: 'getDoctors',
                    method: 'GET',
                }
            },
            providesTags: ['doctor']
        }),

        getDoctorsWithSchedule: builder.query({
            query: () => {
                return {
                    url: 'getDoctorsWithSchedule',
                    method: 'GET',
                }
            },
            providesTags: ['doctor']
        }),

        getCurrentDoctor: builder.query({
            query: () => {
                return {
                    url: 'getCurrentDoctor',
                    method: 'GET',
                }
            },
            providesTags: ['doctor']
        })

    })
})

export const {
    useRegisterDoctorMutation,
    useLoginDoctorMutation,
    useDeleteDoctorMutation,
    useUpdateDoctorMutation,
    useGetDoctorsQuery,
    useGetCurrentDoctorQuery,
    useGetDoctorsWithScheduleQuery
} = DoctorSlices