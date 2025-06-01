import { useCallback, useEffect, useRef, useState, type FC } from 'react';


type DropdownProps = {
  name: string;
  label: string;
  options: string[];
};

const Dropdown: FC<DropdownProps> = ({ name, label, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectHandler = () => {
    setSelectedValue(options[activeIndex]);
    setIsOpen(false);
  };

  const actions = {
    enter: selectHandler,
    arrowup: () => {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex(prevIndex => {
          const newIndex = prevIndex - 1;
          return newIndex < 0 ? options.length - 1 : newIndex;
        });
      }
    },
    arrowdown: () => {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          return newIndex <= options.length - 1 ? newIndex : 0;
        });
      }
    },
    escape: () => setIsOpen(false),
    tab: () => {
      if (isOpen) {
        setIsOpen(false);
      }
    },
  };

  // useCallback ensures reference stability
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as keyof typeof actions;
      if (key in actions) {
        actions[key]();
      }
    },
    [actions]
  );

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    dropdown.addEventListener('keydown', keyDownHandler);

    return () => {
      dropdown.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);


  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div ref={dropdownRef} className="mx-[20px]">
      <label htmlFor={name}>{label}</label>
      <div className="relative w-full mt-[4px]">
        <input
        type="text"
        name={name}
        value={selectedValue}
        onClick={toggleDropdown}
        placeholder='Select an option'
        readOnly
        className="m-[8px] ml-[0px] block border-[2px] border-black focus:border-blue-500 focus:outline-none active:border-blue-500 p-[4px]"
      />
      <span
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {/* Down arrow */}
          {!isOpen && (
            <svg
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              onClick={toggleDropdown}
              className='w-[24px] cursor-pointer'
            >
              <path d="M4.83213 5.68538L0.639273 0.9169C0.34176 0.578541 0.552474 1.73928e-06 0.973148 1.66573e-06L10.0268 8.27361e-08C10.4475 9.17314e-09 10.6582 0.578539 10.3607 0.916898L6.16783 5.68538C5.79901 6.10487 5.20096 6.10487 4.83213 5.68538Z" />
            </svg>
          )}
          {/* Up arrow */}
          {isOpen && (
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              onClick={toggleDropdown}
              className='w-[24px] cursor-pointer'
            >
              <path d="M6.16787 0.743207L10.3607 5.51169C10.6582 5.85005 10.4475 6.42859 10.0268 6.42859L0.973194 6.42859C0.552463 6.42859 0.341767 5.85005 0.639262 5.51169L4.83217 0.743207C5.20099 0.323717 5.79904 0.323717 6.16787 0.743207Z" />
            </svg>
          )}
        </span>
      </div>
      
      {isOpen && (
        <ul id={name}>
          {options.map((option, index) => (
            <li
              key={index}
              value={option}
              onClick={selectHandler}
              className={
                activeIndex === index
                  ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white'
                  : ''
              }
              onMouseEnter={() => setActiveIndex(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
