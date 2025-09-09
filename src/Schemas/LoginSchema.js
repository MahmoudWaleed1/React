import * as zod from "zod"

const LoginSchema = zod.object({
    email: zod.string()
        .nonempty("Email is required")
        .regex(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid"),
    password: zod.string()
        .nonempty("Password is required")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be Minimum eight characters, at least one letter, one number and one special character"),
})

export default LoginSchema;