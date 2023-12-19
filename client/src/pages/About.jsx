import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"

const About = () => {
    return (
        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-4 mt-20">
            <div className="w-full flex flex-row justify-start items-center gap-5">
                <Link className=" hover:text-blue-600 transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={15} />
                <span>About</span>
            </div>

            <div className="w-full space-y-8 mt-10">
                <div className="p-2">
                    <p className="text-base font-light text-justify"> <span className="text-blue-600 font-bold">CAZAMART</span> is an e-commerce platform that offers a wide range of products to customers,
                        The platform provides a user-friendly interface for browsing and purchasing products,
                        Customers can create accounts, manage their profiles, and securely make payments,
                        Product information includes details such as name, description, price, category,
                        brand, quantity in stock, and images, Orders are processed,
                        tracked, and associated with customer accounts,
                        Customers can leave reviews and ratings for products.</p>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="w-full p-2 space-y-4">
                        <h1 className="text-2xl tracking-widest text-blue-600 font-bold">Vission</h1>
                        <p className="text-base font-light text-justify">
                            CAZAMART is to become a leading e-commerce platform that offers a seamless shopping experience to customers,
                            We aim to provide a diverse selection of high-quality products across various categories,
                            Our goal is to continually improve and innovate our platform to meet the evolving needs of our customers,
                            We strive to foster strong relationships with our customers,
                            suppliers, and partners, We envision CAZAMART as a trusted
                            destination where customers can find everything they need conveniently and efficiently.
                        </p>
                    </div>
                    <div className="w-full p-2 space-y-4">
                        <h1 className="text-2xl tracking-widest text-blue-600 font-bold">Mission</h1>
                        <p className="text-base font-light text-justify">
                            is to provide a user-friendly and secure e-commerce platform that offers a wide range of products at competitive prices.
                            We are committed to delivering exceptional customer service and ensuring customer satisfaction.
                            We work closely with trusted suppliers and brands to offer reliable and authentic products.
                            We prioritize data privacy and security, implementing robust measures to protect customer information.
                            We aim to continuously enhance our platform, incorporating user feedback and leveraging technological advancements to improve the shopping experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About