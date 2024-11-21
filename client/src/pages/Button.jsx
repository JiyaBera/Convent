import { FaSpinner } from 'react-icons/fa';

const Button = ({
  title = '',
  text = 'Submit',
  danger = false,
  handleClick,
  disabled = false,
  className = '',
}) => {
  const baseCss = `rounded-md border-2 border-transparent px-8 py-3 text-base font-semibold transition-all duration-200 ${className}`;
  const enabledCss = `${baseCss} bg-brand text-secondaryBg hover:border-brand hover:bg-transparent hover:text-brand focus:border-brand focus:bg-transparent focus:text-brand`;
  const disabledCss = `${baseCss} bg-gray-300 text-gray-500 cursor-not-allowed flex items-center justify-center gap-2`;

  return (
    <button
      onClick={handleClick}
      title={title}
      className={disabled ? disabledCss : enabledCss}
      disabled={disabled}
    >
      {disabled ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
