import SignupComponent from "../components/auth/SignupComponent"
import Layout from "../components/Layout";

const signup = () => {
    return (
        <>
            <h2 className="text-center pt-4 pb-4">Signup Page</h2>
            <div className="col-md-6 offset-md-3">
                <SignupComponent />
            </div>
        </>
    )
}

export default signup
