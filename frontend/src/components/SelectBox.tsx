type Option = {
  value: string | number;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (v: string) => void;
};

export default function SelectBox({ label, options, value, onChange }: Props) {
  const selectId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="space-y-1">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
