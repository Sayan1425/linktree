import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function RadioToggler({ options, defaultValue, onChange}) {
    return (
        <div className="radio-togglers shadow">
            {options.map(option => (
                <label key={option.value}>
                    <input 
                    type="radio" 
                    name="bgType"
                    onClick={(e) => onChange(e.target.value)} 
                    value={option.value} 
                    defaultChecked = {defaultValue === option.value}
                    />
                    <div>
                        <FontAwesomeIcon icon={option.icon} />
                        <span>{option.label}</span>
                    </div>
                </label>
            ))}
        </div>
    )
}