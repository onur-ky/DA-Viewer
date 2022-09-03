import React from 'react'

type selectProps = {
    children: React.ReactNode[];
    label: string;
};

function Select({children, label}: selectProps): JSX.Element {
    return (
        <div className='form-group'>
            <label htmlFor={`id_${label}`}>{label}</label>
            <select className='form-control disabled' 
                    id={`id_${label.toLowerCase().replace(' ', '_')}`} 
                    placeholder='Select Pathway'>
                {children.map((choice: React.ReactNode): JSX.Element => {return <option>{choice}</option>})}
            </select>
        </div>
    )
}

export default Select