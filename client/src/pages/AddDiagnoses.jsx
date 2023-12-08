import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
const AddDiagnoses = () => {
    const initialValues = {
        diagnoses_name : '',
        diagnoses_description : ''
    }
    const validationSchema = Yup.object({
        diagnoses_name : Yup.string().required('Diagnoses Name is required'),
        diagnoses_description : Yup.string().required('Diagnoses Description is required')
    })
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="w-full p-5 space-y-5">
            <h1 className=" space-x-5 p-2 text-lg">
                <Link className=" cursor-pointer" to='/dashboard'>Dashboard</Link>
                <span> / </span>
                <span> Diagnoses </span>
                <span> / </span>
                <span className="text-blue-600">/ Add Diagnoses</span>
            </h1>
            <div className="w-full p-5 shadow bg-white">
                <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}>
                    <Form className="w-full space-y-3">
                        <div className="w-full space-y-2">
                            <Field type="text" placeholder ="Enter Diagnoses Name" name="diagnoses_name"
                            className="w-full p-3 rounded bg-slate-100 outline-blue-600"/>
                            <ErrorMessage component="div" name="diagnoses_name" className="text-red-500"/>
                        </div>
                        <div className="w-full space-y-2">
                            <Field as="textarea" placeholder ="Enter Diagnoses Description" rows="4" name="diagnoses_description"
                            className="w-full p-3 rounded bg-slate-100 outline-blue-600"/>
                            <ErrorMessage component="div" name="diagnoses_description" className="text-red-500"/>
                        </div>
                        <button className="w-full md:w-[30%] p-3 rounded shadow bg-blue-600 text-white" type="submit">submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddDiagnoses