import { Button } from "react-bootstrap"
import MemberListContext from "../../../contexts/MemberListContext"
import * as membersAPI from '../../../api/members'
import { useContext } from "react"
import { useCookies } from "react-cookie"

export default function MemberListItemInput({ member, projectId }) {
    const [memberList, setMemberList] = useContext(MemberListContext)
    const [cookies, setCookie] = useCookies(['token'])

    const handleRemove = async () => {
        await membersAPI.removeMember(cookies.token, projectId, member.email)

        const newMemberList = memberList.filter(m => m.email !== member.email)
        setMemberList(newMemberList)
    }

    return <li>
        <div className="d-flex flex-row justify-content-between align-items-center py-1">
            <div>{member.name} ({member.email})</div>
            <Button variant="danger" onClick={handleRemove}>
                Remove
            </Button>
        </div>
    </li>
}