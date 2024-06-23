const RefreshButton = (props) => {
    const {onClick,isLoading} = props;
    return (
        <button
        onClick={onClick}
        disabled={isLoading}
        className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
        {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V1.8a10 10 0 00-8 15.2z"
            ></path>
            </svg>
        ) : (
            <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 012-2h5a1 1 0 110 2h-5a1 1 0 000 2h3a4 4 0 11-3.465-6.132l.923-.923A6 6 0 1012 12a1 1 0 112 0 8 8 0 11-6-3.414z"
                clipRule="evenodd"
            />
            </svg>
        )}
        </button>
    );
};

export default RefreshButton;
