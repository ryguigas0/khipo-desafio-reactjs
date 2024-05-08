import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjectList } from "../../../api/projects"
import { useCookies } from "react-cookie";
import ProjectButton from "./ProjectButton";

export default function ProjectList(props) {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])
    const [projectList, setProjectList] = useState([])
    const [Loading, setLoading] = useState(true)

    const fetchData = async () => {
        let resp = await getProjectList(cookies.token)

        if (resp.status === 401) {
            navigate("/")
            return () => { }
        }

        setProjectList(resp)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [cookies, navigate]);

    if (Loading) return <p>Loading projects</p>

    return <div className="d-flex flex-column justify-content-start gap-2">
        {
            projectList.map(p => <ProjectButton key={p.id} project={p} editButton/>)
        }
    </div>

}