import { useState } from "react";

export default function Checked2({ ele, completedArray, setCompletedArray }) {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    if (check) {
      const data = completedArray.filter(item => item.id !== ele.id);
      setCompletedArray(data);
    } else {
      setCompletedArray([ele, ...completedArray]);
    }
    setCheck(!check); 
  };

  return (
    <div>
      <input type="checkbox" value={check} checked={check} onChange={handleCheck} />
    </div>
  );
}