import * as zod from "zod"

const registerSchema = zod.object({
    name: zod.string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 2 characters long")
        .max(20, "Name must be at most 20 characters long"),
    email: zod.string()
        .nonempty("Email is required")
        .regex(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid"),
    password: zod.string()
        .nonempty("Password is required")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be Minimum eight characters, at least one letter, one number and one special character"),
    rePassword: zod.string()
        .nonempty("Confirm password is required"),
    dateOfBirth: zod.coerce.date()
        .refine((date) => {
            const age = new Date().getFullYear() - date.getFullYear();
            return age >= 13;
        }, {
            message: "You must be at least 13 years old",
        }),
    gender: zod.string()
        .nonempty("Gender is required")
        .regex(/^(male|female)$/, "Enter valid gender")


}).refine((data) => data.password == data.rePassword, { message: 'Password and repassword must be the same', path: ['rePassword'] })

export default registerSchema;