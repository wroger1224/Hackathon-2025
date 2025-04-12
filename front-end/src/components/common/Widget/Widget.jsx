function Widget({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 h-full ${className}`}>
      {children}
    </div>
  );
}

export default Widget;
