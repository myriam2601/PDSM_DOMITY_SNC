/* eslint-disable react/prop-types */
export function InputFloat({value, onChange, step}){
    return <div>
        <input
        type="number"
        value={value}
        min="0"
        step={step}
        onChange={(e)=> onChange(e.target.value)}
        />
    </div>
}