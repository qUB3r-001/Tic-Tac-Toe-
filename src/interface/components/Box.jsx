function Box({ id, onClick, value }) {
  return (
    <div className="box text-center border-0">
      <button
        className={`border-0 ${value === "X" ? "red" : "blue"}`}
        id={id}
        onClick={() => {
          return onClick(id);
        }}
        value={value}
      >
        {value}
      </button>
    </div>
  );
}

export default Box;
