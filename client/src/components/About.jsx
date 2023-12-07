const About = () => {
    return (
        <div className="bg-gray-100 py-8">
            <h1 className="w-full text-center text-3xl tracking-widest text-blue-600">About Us</h1>
            <div className="w-full md:w-[80%] mx-auto mt-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-2xl font-bold">V</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 pl-4">Vision</h2>
                            </div>
                            <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                To revolutionize healthcare by fostering seamless connectivity and empowering individuals to access quality medical care anytime, anywhere.
                            </p>
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-2xl font-bold">M</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 pl-4">Mission</h2>
                            </div>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                Our mission is to create a trusted and comprehensive platform that connects hospitals, doctors, and patients, enabling efficient communication, personalized healthcare experiences, and improved health outcomes.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <div className="flex items-center mb-4">
                            <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl font-bold">CV</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 pl-4">Core Values</h2>
                        </div>
                        <ul className="text-xl text-gray-700 leading-relaxed list-disc pl-6">
                            <li className="mb-2">Accessibility: We believe that everyone should have easy access to quality healthcare services, regardless of their location or socioeconomic status.</li>
                            <li className="mb-2">Collaboration: We promote collaboration and teamwork among healthcare stakeholders, fostering multidisciplinary cooperation to deliver integrated and holistic care.</li>
                            <li className="mb-2">Patient-Centricity: We prioritize the needs and well-being of patients, ensuring that our platform is designed to provide personalized and patient-centric healthcare experiences.</li>
                            <li className="mb-2">Innovation: We embrace innovation and leverage cutting-edge technology to drive advancements in healthcare delivery, improving efficiency, and enhancing patient care.</li>
                            <li className="mb-2">Trust and Security: We uphold the highest standards of data privacy, confidentiality, and security to ensure the trust and confidence of patients, hospitals, and doctors.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About