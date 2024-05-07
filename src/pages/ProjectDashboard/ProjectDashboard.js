import { useCookies } from "react-cookie"

export default function ProjectDashboard(props) {
    const [cookies, setCookie] = useCookies(['token'])


    return <h1>
        {cookies.token ? "Cool youre in" : " Unauthorized"}
    </h1>
}