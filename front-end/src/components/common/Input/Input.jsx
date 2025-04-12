const Input = ({ 
	label, 
	id, 
	...otherProps 
}) => {
	return (
		<div className='flex flex-col space-y-1'>
			<label htmlFor={id} className='text-sm font-medium text-gray-700'>{label}</label>
			<input 
				{...otherProps} 
				id={id}
				className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
		</div>
	)
}

export default Input;