import SigninComponent from "../components/auth/SigninComponent"

const signin = () => {
    return (
        <>
            <h2 className="text-center pt-4 pb-4">Signup Page</h2>
            <div className="col-md-6 offset-md-3">
                <SigninComponent />
            </div>
        </>
    )
}

export default signin
