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
                .post("https://reqres.in/api/login", { 
                    email: values.email, 
                    password: values.password 
                })
                .then(res => {
                    console.log("Here")
                    const jwtToken = res.data['token']
                    localStorage.setItem("token", jwtToken)
                    setValues({
                        ...values,
                        loggedIn: true
                    })
                })
                .catch(err => {
                    console.log(err.message)
                    setValues({
                        ...values,
                        error: err.message
                    })
                })
        }
    ]
}

export default useForm