import { useState } from "react";
import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";

export default function TagListInput({ values, setFieldValue }) {
    const [tags, setTags] = useState(values ? string2TagSet(values.tagString) : new Set())
    const [addTagValue, setaddTagValue] = useState("")

    const appendTag = (tagValue) => {
        if (addTagValue) setTags(tags.add(addTagValue))
        setaddTagValue("")
        setFieldValue("tagString", tagSet2String(tags), false)
    }

    return <InputGroup className="d-flex flex-column">
        <FormLabel
            itemID="tagsString"
            label="Tag String"
            className="mb-3"
        />
        <Form.Control
            id="tagsString"
            as="text"
            className="visually-hidden"
        />
        <div>
            <div className="d-flex">
                <Form.Control
                    placeholder="Tag name"
                    value={addTagValue}
                    onChange={v => setaddTagValue(v.target.value)}
                />
                <Button variant='primary' onClick={appendTag}>Add</Button>
            </div>
            <div>
                {
                    Array.from(tags.entries())
                        .map(([k, v], i) => <li key={i}>{v}</li>)
                }
            </div>
        </div>
    </InputGroup>
}

function string2TagSet(tagString) {
    return new Set(tagString ? tagString.trim().split(",") : [])
}

function tagSet2String(tagSet) {
    return Array.from(tagSet.entries()).map(([k, v]) => v).join(", ")
}