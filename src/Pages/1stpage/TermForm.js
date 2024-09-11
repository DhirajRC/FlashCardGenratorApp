import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteInputBox } from "../../redux/action/Action";

const TermForm = () => {
  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.Reducer.inputData);

  const handleChange = (e) => {
    console.log("Value changed", e.target.value);
  };

  return (
    <div>
      {inputData.length > 0 &&
        inputData.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:justify-between mb-4">
            <div className="relative flex flex-col sm:w-1/3 w-full mb-3 sm:mb-0 sm:mr-4">
              <label htmlFor={`term-${idx}`} className="font-semibold text-gray-600 mb-2">
                Term {idx + 1}
              </label>
              <input
                id={`term-${idx}`}
                name={`term-${idx}`}
                type="text"
                value={item.term}
                onChange={handleChange}
                placeholder="Enter term"
                className="border border-gray-400 p-3 rounded"
              />
            </div>

            <div className="flex flex-col sm:w-1/3 w-full sm:mr-4">
              <label htmlFor={`define-${idx}`} className="font-semibold text-gray-600 mb-2">
                Definition
              </label>
              <textarea
                id={`define-${idx}`}
                name={`define-${idx}`}
                value={item.defination}
                onChange={handleChange}
                placeholder="Enter definition"
                className="border border-gray-400 p-3 rounded"
              />
            </div>

            <div className="flex justify-end sm:items-center items-start sm:mt-0 mt-3">
              <button className="text-blue-600 text-xl mr-3" onClick={() => console.log('Edit clicked')}>
                <AiOutlineEdit />
              </button>
              <button
                className="text-red-600 text-xl"
                onClick={() => dispatch(deleteInputBox(idx))}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TermForm;
