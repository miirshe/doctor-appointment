import { configureStore } from '@reduxjs/toolkit'
import { UserSlices } from './slices/UserSlices'
import { setupListeners } from '@reduxjs/toolkit/query'
import { PatientSlices } from './slices/PatientSlices';
import { DoctorSlices } from './slices/DoctorSlices';
import { HospitalSlices } from './slices/HospitalSlices';
import { DoctorScheduleSlices } from './slices/DoctorScheduleSlices';
import { DoctorProfession } from './slices/DoctorProfession';
import { AppointmentSlices } from './slices/AppointmentSlices';
import { DiagnosesSlices } from './slices/DiagnosesSlices';
import { SpecialitiesSlices } from './slices/SpecialitiesSlices';
export const store = configureStore({
    reducer: {
        [UserSlices.reducerPath]: UserSlices.reducer,
        [PatientSlices.reducerPath]: PatientSlices.reducer,
        [DoctorSlices.reducerPath]: DoctorSlices.reducer,
        [HospitalSlices.reducerPath]: HospitalSlices.reducer,
        [DoctorScheduleSlices.reducerPath]: DoctorScheduleSlices.reducer,
        [DoctorProfession.reducerPath]: DoctorProfession.reducer,
        [AppointmentSlices.reducerPath]: AppointmentSlices.reducer,
        [DiagnosesSlices.reducerPath]: DiagnosesSlices.reducer,
        [SpecialitiesSlices.reducerPath]: SpecialitiesSlices.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(UserSlices.middleware)
            .concat(PatientSlices.middleware).concat(DoctorSlices.middleware)
            .concat(HospitalSlices.middleware).concat(DoctorScheduleSlices.middleware)
            .concat(DoctorProfession.middleware).concat(AppointmentSlices.middleware)
            .concat(DiagnosesSlices.middleware).concat(SpecialitiesSlices.middleware)
})
setupListeners(store.dispatch);