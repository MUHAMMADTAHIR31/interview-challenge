type Props = {
  type: "success" | "error";
  message: string;
};

export default function MessageBox({ type, message }: Props) {
  const baseStyle = "px-4 py-2 rounded-md text-sm border";
  const successStyle = "bg-green-50 text-green-800 border-green-300";
  const errorStyle = "bg-red-50 text-red-800 border-red-300";

  return (
    <div
      className={`${baseStyle} ${
        type === "success" ? successStyle : errorStyle
      }`}
    >
      {message}
    </div>
  );
}
