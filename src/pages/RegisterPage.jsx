import { Button, Input, Select, SelectItem } from '@heroui/react'
import { registerApi } from '../services/AuthService'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import registerSchema from '../Schemas/RegisterSchema'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { counterContext } from '../contexts/CounterContext'

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()

    const { counter, setCounter } = useContext(counterContext)

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: ""
        },
        resolver: zodResolver(registerSchema)
    });

    async function submit(formData) {
        setErrMsg("")
        setSuccessMsg("")
        setIsLoading(true)
        const data = await registerApi(formData)
        if (data.message) {
            setSuccessMsg(data.message)
            reset()
            setInterval(() => {
                navigate("/login")
            }, 1000)
        } else if (data.error) {
            setErrMsg(data.error)
        }
        setIsLoading(false)
    }


    return (
        <form onSubmit={handleSubmit(submit)}>
            <h1 className='text-center'>Register Page {counter}</h1>
            <button type='button' onClick={() => setCounter(counter + 1)}>Increment</button>
            <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors?.name?.message} variant='bordered' label="name" type="name" {...register('name')} />
            <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors?.email?.message} variant='bordered' label="email" type="email" {...register('email')} />
            <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors?.password?.message} variant='bordered' label="password" type="password" {...register('password')} />
            <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors?.rePassword?.message} variant='bordered' label="Confirm Password" type="password" {...register('rePassword')} />
            <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors?.dateOfBirth?.message} variant='bordered' label="Date Of Birth" defaultValue={new Date()} type="date" {...register('dateOfBirth')} />
            <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors?.gender?.message} variant='bordered' label="Gender" {...register('gender')}>
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
            </Select>
            <Button type='submit' isLoading={isLoading} color="primary" variant="bordered">
                Register
            </Button>
            {errMsg && <p className='text-center p-1 rounded bg-red-200 text-red-700 text-sm capitalize'>{errMsg} </p>}
            {successMsg && <p className='text-center p-1 rounded bg-green-200 text-green-700 text-sm capitalize'>{successMsg} </p>}
        </form>
    )
}
