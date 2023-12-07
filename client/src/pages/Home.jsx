import { About, HomeHeader, Navbar, Services } from "../ExportFiles"

const Home = () => {
    return (
        <div className="w-[90%] mx-auto lg:w-full">
            <HomeHeader />
            <Navbar/>
            <Services/>
            <About/>
        </div>
    )
}

export default Home