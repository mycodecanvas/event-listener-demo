import { useState, type FC } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';


type DropdownProps = {
  name: string;
  label: string;
  options: string[];
};

const Dropdown: FC<DropdownProps> = ({ name, label, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  const dropdownRef = useHotkeys(
    ['enter', 'arrowup', 'arrowdown', 'escape', 'tab'],
    (_, handler) => {
      const key = handler.keys?.join('') as keyof typeof actions;
      if (key in actions) {
        const fn = actions[key];
        if (typeof fn === 'function') fn();
      }
    },
    { enableOnFormTags: true },
    [isOpen, activeIndex]
  ) as React.RefObject<HTMLDivElement | null>;

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div ref={dropdownRef}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        value={selectedValue}
        onClick={toggleDropdown}
        readOnly
        className="m-[8px] ml-[0px] block border-[2px] border-black focus:border-blue-500 focus:outline-none active:border-blue-500"
      />
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
