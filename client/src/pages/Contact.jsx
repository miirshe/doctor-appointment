import { Link } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { MdLocalPhone, MdLocationOn, MdOutlineEmail } from "react-icons/md";
const Contact = () => {
    return (
        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
            <div className="w-full flex flex-row justify-start items-center gap-5">
                <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={15} />
                <span>Contact</span>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 p-4 bg-white shadow rounded">
                <div className="w-full p-2">
                    <Formik>
                        <Form className=" space-y-3">
                            <h1>Let us know if you have any question. We will respond to you shortly.</h1>
                            <hr className="w-full" />
                            <div className="w-full space-y-2">
                                <label className="ml-1" htmlFor="">Name</label>
                                <Field className='px-3 py-2 rounded w-full border outline-blue-600' type="text" placeholder="Name" name='name' />
                                <ErrorMessage component='div' className="text-red-500" name="name" />
                            </div>
                            <div className="w-full space-y-2">
                                <label className="ml-1" htmlFor="">Email</label>
                                <Field className='px-3 py-2  border outline-blue-600 rounded w-full' type="text" placeholder="Email Address" name='email' />
                                <ErrorMessage component='div' className="text-red-500" name="email" />
                            </div>
                            <div className="w-full space-y-2">
                                <label className="ml-1" htmlFor="">Phone</label>
                                <Field className='px-3 py-2  border outline-blue-600 rounded w-full' type="number" placeholder="Phone Number" name='phone' />
                                <ErrorMessage component='div' className="text-red-500" name="phone" />
                            </div>
                            <div className="w-full space-y-2">
                                <label className="ml-1" htmlFor="">Message</label>
                                <Field className='px-3 py-2  border outline-blue-600 rounded w-full' as="textarea" rows="4" placeholder="Let us know" name='message' />
                                <ErrorMessage component='div' className="text-red-500" name="message" />
                            </div>
                            <button className="w-full lg:w-[40%] px-4 py-2 bg-blue-600 text-white">Send Message</button>
                        </Form>
                    </Formik>
                </div>

                <div className="w-full lg:w-[50%] lg:px-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-2xl">Follow us on socials</h1>
                        <hr className="w-full" />
                        <p className=" text-base font-thin">Our social media links are ours, if you need more information you can contact us</p>
                        <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                            <Link to={`https://www.facebook.com/miirshe`} target="_blank"><FaFacebook className="inline hover:text-blue-600 transition-all ease-in-out" size={20} /></Link>
                            <Link to={`https://twitter.com/miirshe`} target="_blank"><FaTwitter className="inline hover:text-blue-600 transition-all ease-in-out" size={20} /></Link>
                            <Link to={`https://www.instagram.com/miirshe`} target="_blank"><FaInstagram className="inline hover:text-blue-600 transition-all ease-in-out" size={20} /></Link>
                            <Link to={`https://www.linkedin.com/in/miirshe`} target="_blank"><FaLinkedin className="inline hover:text-blue-600 transition-all ease-in-out" size={20} /></Link>
                        </div>
                    </div>
                    <hr className="w-full mt-14" />
                    <div className="w-full mt-10 space-y-4">
                        <h1 className="text-2xl">Reach out to us</h1>
                        <p className=" text-base font-thin space-x-3"><MdOutlineEmail className="inline" size={20} /> <span>cazamart@gmail.com</span></p>
                        <p className=" text-base font-thin space-x-3"><MdLocalPhone className="inline" size={25} /> <span>252618302314</span></p>
                        <p className=" text-base font-thin space-x-3"><MdLocationOn className="inline" size={25} /> <span>KM4 , mogadishu , somalia</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact