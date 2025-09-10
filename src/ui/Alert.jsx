function Alert({ message, type }) {
  return (
    <div
      className={`absolute top-6 left-1/2 z-50 w-full max-w-80 -translate-x-1/2 rounded-xl border ${type === "Success" ? "border-green-400 bg-green-100" : "border-red-400 bg-red-100"} p-4 text-center`}
    >
      <h2 className="text-2xl font-bold">{type}!</h2>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
