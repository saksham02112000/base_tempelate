import "./styles/index.css";
import {AuthContext} from "../../context/authcontext";
import {useContext} from "react";

export default function Homepage() {


    const {logout} = useContext(AuthContext);
    return (
        <div>
            Homepage
            jnaspdasdn
            <br />
            <h1>hdhdasio</h1>
            <button className="button" onClick={logout}> Logout </button>
        </div>
    )
}