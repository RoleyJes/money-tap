function ActionForm({
  title,
  color,
  onclick,
  children,
  multipleInput = false,
  formClassName = "",
}) {
  const colorClasses = {
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      <form
        className={`${multipleInput ? "flex-col" : "sm:flex-row"} flex flex-col gap-4 ${formClassName}`}
      >
        {children}
        <button
          type="submit"
          onClick={onclick}
          className={`rounded-lg px-4 py-2 font-semibold text-white ${colorClasses[color]} transition ${multipleInput ? "w-fit" : ""}`}
        >
          Confirm
        </button>
      </form>
    </section>
  );
}

export default ActionForm;
