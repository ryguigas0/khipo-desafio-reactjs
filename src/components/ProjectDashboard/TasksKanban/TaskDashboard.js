import { useContext, useState } from "react";
import MemberListContext from "../../../contexts/MemberListContext";
import TasksKanban from "./TasksKanban";
import SelectedProjectContext from "../../../contexts/SelectedProjectContext";

export default function TaskDashboard(props) {
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)

    return <>
        <TasksKanban />
    </>
}