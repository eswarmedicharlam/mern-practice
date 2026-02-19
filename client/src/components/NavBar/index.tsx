
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate()
    const navItems = [{ id: 1, navName: "Home", path: '/home' }, { id: 2, navName: "About", path: '/about' }, { id: 3, navName: "Contact", path: '/contact' }]
    console.log()
    return (
        <div>
            <ul className="flex gap-2.5 bg-amber-500 p-3 justify-end">
                {navItems && navItems.length > 0 && navItems.map((item) => (
                    <li onClick={() => { navigate(item.path) }}>{item.navName}</li>
                ))}
            </ul>

        </div>
    )
}
export default NavBar