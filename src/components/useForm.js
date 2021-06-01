import { useState } from "react"
import Axios from "axios"

const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        e => {
            console.log(e)
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        },
        e => {
            e.preventDefault()

            Axios
                .post("https://imedixbcr.iitkgp.ac.in/api/user/login", { 
                    username: values.username, 
                    password: values.password 
                })
                .then(res => {
                    const jwtToken = res.data['jwtToken']
                    localStorage.setItem("token", jwtToken)
                    localStorage.setItem("username", values.username)
                    localStorage.setItem("password", values.password)
                    setValues({
                        ...values,
                        loggedIn: true
                    })
                })
                .catch(error => {
                    if (error.response) {
                        // Request made and server responded
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);

                        setValues({
                            ...values,
                            error: error.response.data.error
                        })
                      } else if (error.request) {

                        // The request was made but no response was received
                        // console.log(error.request);

                        setValues({
                            ...values,
                            error: error.request
                        })
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        // console.log(error.message);

                        setValues({
                            ...values,
                            error: error.message
                        })
                      }
                })
        }
    ]
}

export default useForm