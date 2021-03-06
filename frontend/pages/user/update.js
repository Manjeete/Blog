import Private from "../../components/auth/Private"
import Link from "next/link"
import ProfileUpdate from "../../components/auth/ProfileUpdate"

const UserProfileUpdate = () => {
    return (
        <>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <ProfileUpdate />
                    </div>
                </div>
            </Private>  
        </>
    )
}

export default UserProfileUpdate;
