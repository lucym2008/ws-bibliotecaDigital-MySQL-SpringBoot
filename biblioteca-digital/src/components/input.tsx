interface InputProps {
    placeholder: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, type = "text", onChange }: InputProps) {
    return (
        <input
            className="input"
            placeholder={placeholder}
            type={type}
            onChange={onChange}
        />
    );
}