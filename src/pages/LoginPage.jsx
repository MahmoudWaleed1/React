import { Button, Input } from '@heroui/react'
import { loginApi } from '../services/AuthService'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LoginSchema from '../Schemas/LoginSchema'
import { counterContext } from '../contexts/CounterContext'
import { authContext } from '../contexts/AuthContext'

export default function LoginPage() {
    const [errMsg, setErrMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { counter } = useContext(counterContext)
    const { setIsLoggedIn } = useContext(authContext)

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema)
    });

    async function submit(formData) {
        setErrMsg("")
        setIsLoading(true)
        const data = await loginApi(formData)
        setIsLoading(false)
        if (data.message == "success") {
            localStorage.setItem("token", data.token)
            setIsLoggedIn(true)
            const pathName = location.pathname
            navigate(pathName == "/login" ? "/" : pathName)
        } else {
            setErrMsg(data.error)
        }
    }


    return (
        <form onSubmit={handleSubmit(submit)}>
            <h1 className='text-center'>Login Page {counter}</h1>
            <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors?.email?.message} variant='bordered' label="email" type="email" {...register('email')} />
            <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors?.password?.message} variant='bordered' label="password" type="password" {...register('password')} />
            <Button type='submit' isLoading={isLoading} color="primary" variant="bordered">
                Login
            </Button>
            {errMsg && <p className='text-center p-1 rounded bg-red-200 text-red-700 text-sm capitalize'>{errMsg} </p>}
        </form>
    )
}
