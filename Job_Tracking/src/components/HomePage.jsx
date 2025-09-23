import Header from "./Header_out";
import Footer from "./Footer";
import "./HomePage.css";

const HomePage = () => {
    return (
        <>
            <Header />
            <main className="homepage">
                {/* Hero Section */}
                <section className="hero">
                    <h1>Welcome to CareerConnect</h1>
                    <p>
                        Discover opportunities, grow your career, and connect with employers across the country.
                    </p>
                </section>

                {/* Key Highlights */}
                <section className="key-points">
                    <h2>Why Choose CareerConnect?</h2>
                    <ul>
                        <li>✔ Personalized job recommendations based on your profile.</li>
                        <li>✔ Simple and secure application process.</li>
                        <li>✔ Access to verified employers and trusted recruiters.</li>
                        <li>✔ Options for remote, part-time, and full-time jobs.</li>
                        <li>✔ Career support resources to help you grow professionally.</li>
                    </ul>
                </section>
                <Footer />
            </main>
        </>
    );
};

export default HomePage;
