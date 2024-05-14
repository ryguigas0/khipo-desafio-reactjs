import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjectList } from "../../../api/projects"
import { useCookies } from "react-cookie";
import ProjectButton from "./ProjectButton";
import ProjectListContext from '../../../contexts/ProjectListContext'
import { Col, Container, Row, Spinner } from "react-bootstrap";

export default function ProjectList(props) {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token'])
    const [Loading, setLoading] = useState(true)
    const [projectList, setProjectList] = useContext(ProjectListContext)

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

    if (Loading) return <Container
        style={{ display: 'grid', placeItems: "center", height: "100%" }}
    >
        <Spinner animation="border" variant="primary" />
    </Container>

    return <div className="d-flex flex-column justify-content-start gap-2 overflow-auto">
        {
            projectList.map(p => <ProjectButton key={p.id} project={p} />)
        }
    </div>

}