import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [clicked, setClicked] = useState(false)

  const dispatch = useDispatch()

  function handleClick() {
    setClicked(true)
    if (!fullName || !nationalId) return 
    dispatch(createCustomer(fullName, nationalId))
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            className={clicked ? fullName ? null : "error" : null}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              setClicked(false)
            }}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            className={clicked ? nationalId ? null : "error" : null}
            value={nationalId}
            onChange={(e) => {
              setClicked(false)
              setNationalId(e.target.value)
            }}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
