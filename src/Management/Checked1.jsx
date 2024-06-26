import { useState } from "react";

export default function Checked1({ item, setIncompletedArray, incompletedArray }) {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    if (check) {
      const filteredData = incompletedArray.filter(ele => ele.id !== item.id);
      setIncompletedArray(filteredData);
    } else {
      setIncompletedArray([item, ...incompletedArray]);
    }
    setCheck(!check); 
  };

  return (
    <div>
      <input type="checkbox" value={check} checked={check} onChange={handleCheck} />
    </div>
  );
}