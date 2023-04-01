import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SideCategory({ typesData }) {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.marketReducers.getMarketSlice);
  const [recent, setRecent] = useState();
  
//   useEffect(() => setRecent(category));

  return (
    <div className="bg-white rounded-3xl px-5 py-6 shadow-lg w-2/3 md:w-1/2 lg:w-auto">
      <h3 className="font-semibold mb-3 text-lg text-cusblack">Categories</h3>
      <ul className="leading-10 text-xs text-gray-400">
        <li>
          <button
            className="font-semibold text-cusblack cursor-pointer"
            // onClick={() => dispatch(selectCategory(""))}
            >
     
            All products
          </button>
        </li>
        {/* {typesData.map((type, idx) => ( */}
          <li>
            <button
              className="font-semibold text-cusblack cursor-pointer"
            //   onClick={() => dispatch(selectCategory(type.name))}
            >
              {/* {category.cropCategory} */}
            </button>
          </li>
        {/* ))} */}
      </ul>
    </div>
  );
}

export default SideCategory;