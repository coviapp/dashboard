import { Redirect } from "react-router-dom"

const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    return <Redirect to="/" />
}

export default Logout