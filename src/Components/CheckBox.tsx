import React, {ChangeEvent} from 'react';

type CheckBoxType = {
    value: boolean
    callback: (event: boolean) => void

}

export const CheckBox = (props: CheckBoxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }

    return <input type="checkbox" checked={props.value}
                  onChange={onChangeHandler}/>
};
