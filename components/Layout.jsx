import Header from './header/Header'
import Footer from './footer';
import { ToastContainer } from 'react-toastify'
import MobileHeader from './mobile/MobileHeader'

function Layout({ children, user }) {
    console.log("layout renderd")
    return (
        <>
            <div className="site">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <header className="site__header d-lg-none">
                    <MobileHeader />
                </header>

                <header className="site__header d-lg-block d-none">
                    <Header />
                </header>

                <div className="site__body">
                    {children}
                </div>

                <footer className="site__footer">
                    <Footer />
                </footer>
            </div>
        </>
    );
}


export default Layout;
