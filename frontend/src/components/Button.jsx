function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={props.className || "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2"}
    >
      {props.title}
    </button>
  );
}

export default Button;
