import {
    Navbar as NextUiNavbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Button,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counterContext } from "../contexts/CounterContext";
import { authContext } from "../contexts/AuthContext";

export default function Navbar() {
    const navigate = useNavigate()

    const { counter } = useContext(counterContext)
    const { setIsLoggedIn, isLoggedIn } = useContext(authContext)


    function logOut() {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/login")
    }

    return (
        <NextUiNavbar disableAnimation isBordered>
            <NavbarContent className="flex gap-4" justify="center">
                <NavbarBrand>
                    <Link to="/" className="font-bold text-inherit">CIRCLE</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                {
                    isLoggedIn ?
                        <NavbarItem>
                            <Button onPress={logOut} color="danger" variant="flat">
                                Logout
                            </Button>
                        </NavbarItem>
                        :
                        <>
                            <NavbarItem className="flex cursor-pointer">
                                <Button onPress={() => navigate("/login")} color="default" variant="flat">
                                    Login
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button onPress={() => navigate("/register")} color="warning" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                }
            </NavbarContent>
        </NextUiNavbar>
    );
}
