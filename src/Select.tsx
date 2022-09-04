import React, { SetStateAction } from 'react'

type selectProps = {
    children: React.ReactNode[];
    label: string;
    setStateProp: React.Dispatch<SetStateAction<string>>;
};

function Select({children, label, setStateProp}: selectProps): JSX.Element {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStateProp(event.currentTarget.value);
      };

    return (
        <div className='form-group'>
            <label htmlFor={`id_${label}`}>{label}</label>
            <select className='form-control disabled' 
                    id={`id_${label.toLowerCase().replace(' ', '_')}`} 
                    placeholder='Select Pathway'
                    onChange={handleChange}>
                {children.map((choice: React.ReactNode): JSX.Element => {return <option>{choice}</option>})}
            </select>
        </div>
    )
}

export default Select