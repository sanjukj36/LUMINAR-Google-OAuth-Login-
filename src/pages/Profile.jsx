import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [displayEmail, setDisplayEmail] = useState("")
    const [displayPicture, setDisplayPicture] = useState("")



    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const { username } = JSON.parse(sessionStorage.getItem("existingUser"))
            const { email } = JSON.parse(sessionStorage.getItem("existingUser"))
            const { picture } = JSON.parse(sessionStorage.getItem("existingUser"))

            setDisplayName(username)
            setDisplayEmail(email)
            setDisplayPicture(picture)
        } else {

        }
    })

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }

    }, [])


    const handleLogout = () => {
        // Clear user data from sessionStorage
        sessionStorage.removeItem("existingUser");
        sessionStorage.removeItem("token");

        navigate('/login');
    };

    return (
        <div>


            <div style={{ width: '100%', height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <div className="container w-75">

                    <div className="card shadow p-5">
                        <div className="row align-items-center">
                            {loginStatus ?

                                <h1 className='d-flex align-text-center'><strong><span style={{ color: "red" }}>Normal</span> <span style={{ color: "yellow" }}>Login</span> <span style={{ color: "green" }}>SignUp</span> <span style={{ color: "blue" }}></span> </strong></h1>
                                :
                                <h1 className='d-flex align-text-center'><strong><span style={{ color: "red" }}>Google</span> <span style={{ color: "yellow" }}>Login</span> <span style={{ color: "green" }}>SignUp</span> <span style={{ color: "blue" }}></span> </strong></h1>

                            }

                            <div className="col-lg-6">

                                {loginStatus ?

                                    <img className='w-100' src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt="Profile" />
                                    :
                                    <img className='w-100 mt-5' src={displayPicture} alt="Profile" />

                                }

                            </div>
                            <div className="col-lg-6 mt-5">
                                <div>
                                    <p>Name: {displayName} </p>
                                    <p>Email: {displayEmail} </p>
                                </div>

                                <Button className='mt-5' onClick={handleLogout} >Logout</Button>





                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </div>
    )
}

export default Profile
