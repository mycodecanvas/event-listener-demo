import Dropdown from './Dropdown-without-React-useHotkeys-hook';

function App() {
  return (
    <div className="flex m-[10px]">
      <Dropdown
        name="item"
        label="To Do Item"
        options={['Item 1', 'Item 2', 'Item 3']}
      />
      <Dropdown
        name="item"
        label="Priority"
        options={['Priority 1', 'Priority 2', 'Priority 3']}
      />
    </div>
  );
}

export default App;

