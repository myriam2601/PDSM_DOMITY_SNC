/* eslint-disable react/prop-types */
export function InputFloat({ value, onChange, step, onKeyDown }) {
    return (
        <div>
            <input
                type="number"
                value={value}
                min="0"
                step={step}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
            />
        </div>
    );
}
