const Form = ({
	handleSubmit,
	children
}) => {
	return(
		<form onSubmit={ handleSubmit } className="flex flex-col max-w-md mx-auto h-full p-6 bg-white rounded-lg shadow-md">
			{ children }
		</form>
	)
}

export default Form;