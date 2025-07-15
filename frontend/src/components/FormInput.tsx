type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
};

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
}: Props) {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
      />
    </div>
  );
}
