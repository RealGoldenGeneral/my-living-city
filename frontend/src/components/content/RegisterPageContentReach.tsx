import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { capitalizeFirstLetterEachWord } from "./../../lib/utilityFunctions";
import CSS from "csstype";


export type CheckBoxItem = {
    label: string;
    value: any;
    children?: CheckBoxItem[];
};

interface RegisterPageContentReachProps {
    data: CheckBoxItem[]
}

export const RegisterPageContentReach: 
    React.FC<RegisterPageContentReachProps> = ({data}) => {
        const [selected, setSelected] = useState<any>([]);

        useEffect(() => {
            console.log(selected);
        }, [selected])

        return (
            <div>
                <h3>Please select your advertisement target reach users:</h3>
                <CheckboxTree data={data} selected={selected} setSelected={setSelected}/>
            </div>
        );
}

interface CheckBoxTreeProps {
    data: CheckBoxItem[]
    [key: string]:any
}

export const CheckboxTree: React.FC<CheckBoxTreeProps> = ({data, ...props}: CheckBoxTreeProps) => {

    const treeDiv: CSS.Properties = {
        marginLeft: "20px",
    }

    /**
     * Note: this function does not return the leaf children, instead it populates it with
     * 
     * @param items Given a list of Checkbox items, it populate the leafChildren with all leaf children from the given items
     * @param leafChildren list of CheckboxItems that is being populated
     */
    const getAllLeaveChildrenItems = (items: CheckBoxItem[], leafChildren: CheckBoxItem[]) => {
        items.forEach(item => {
            if (!item.children) {
                leafChildren.push(item);
            } else {
                getAllLeaveChildrenItems(item.children, leafChildren);
            }
        });
    }

    const onChangeCallback = (e: any, childrenItems: CheckBoxItem[] | undefined) => {
        // console.log(e.target.checked);
        const isCheckboxChecked: boolean = e.target.checked;

        // Check whats the value of the checkbox is
        // if there is children
            // for every leave children add/remove that children's id to selected var
            // set the checked property of an element with that id to true/false
        //else
            // add/remove this element id to the selected
            // set the checked property of an element with this id to true/false
        let selectedCopy = props.selected;
        if (childrenItems && childrenItems.length > 0) {
            let leafChildren: CheckBoxItem[] = [];
            getAllLeaveChildrenItems(childrenItems, leafChildren);
            // console.log(`Leaf children: `)
            // leafChildren.map((child) => (console.log(child)))xw

            if (isCheckboxChecked) { // Checked
                leafChildren.forEach(child => {
                    if (!selectedCopy.includes(child.value)) selectedCopy.push(child.value);
                });
            } else { // Unchecked
                leafChildren.forEach(child => {
                    if (selectedCopy.includes(child.value)) {
                        const index = selectedCopy.indexOf(child.value);
                        selectedCopy.splice(index, 1);
                    }
                });
            }

        } else {
            // console.log(`No children`);
            if (isCheckboxChecked) { // Checked
                props.setSelected([...props.selected, Number(e.target.id)]);
            } else { // Unchecked
                const index = selectedCopy.indexOf(Number(e.target.id));
                if (index !== -1) selectedCopy.splice(index, 1);
            }
        }

        props.setSelected([...selectedCopy]);
    }

    return (
        <div style={treeDiv}>
            {data && data.map((item, i) => {
                return(
                    <div key={i}>
                        <input type="checkbox" id={item.value} onChange={(e) => {onChangeCallback(e, item.children)}}/>
                        <Form.Label>{capitalizeFirstLetterEachWord(item.label)}</Form.Label>
                        {item.children && <CheckboxTree data={item.children} selected={props.selected} setSelected={props.setSelected}/>}
                    </div>
                )
            })}
        </div>
    )
}