function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      {props.title}
    </button>
  );
}

export default Button;