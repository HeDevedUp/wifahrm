import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";
import { retrieveUserDetails } from "../../../utils/helperFunctions/userDataHandlers";
import axios from 'axios';


const initialState = {
  customerid:'',
  MarketData: [],
  category: '',
  loading: false,
};

const marketplaceSlice = createSlice({
  name: "marketplaceSlice",

  initialState,
  reducers: {
    getMarketRequested: (state, action) => {
      state.loading = true;
    },
    getMarketReceived: (state, action) => {
      state.loading = false;
      state.MarketData = action.payload;
    },
    getMarketRequestFailed: (state, action) => {
      state.loading = false;
      console.log("getMarketRequestFailed", action.payload);
    },
    getfarmbycustomeridRequested: (state, action) => {
      state.loading = true;
    },
    getfarmbycustomeridReceived: (state, action) => {
      state.loading = false;
      state.customerid = action.payload;
      console.log("getfarmbycustomeridReceived", action.payload);
    },
    getfarmbycustomeridFailed: (state, action) => {
      state.loading = false;
      console.log("getfarmbycustomeridFailed", action.payload);
    },

    selectCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const {
  getfarmbycustomeridRequested,
  getfarmbycustomeridReceived,
  getfarmbycustomeridFailed,
  getMarketRequested,
  getMarketReceived,
  getMarketRequestFailed,
  selectCategory,
} = marketplaceSlice.actions;


// export const getfarmbycustomerid = () => async (dispatch) => {
//   try {
//     const getToken = await retrieveUserDetails();
//     if (getToken && getToken.data.jwtToken) {
//       const token = getToken.data.jwtToken;
//      const customerIdd = getToken.data.user.userId
//      console.log(token,customerIdd)
     
//       dispatch(
//         apiCallBegan({
//           url:`farm/getfarmbycustomerid?customerId=${customerIdd}`,
//           extraHeaders: { "jwtToken": token },
//           method: "get",
//           onStart: getfarmbycustomeridRequested.type,
//           onSuccess: getfarmbycustomeridReceived.type,
//           onError: getfarmbycustomeridFailed.type,
//         })
//       );
//     } else {
//       const error = new Error("Unable to retrieve user customerId");
//       console.error(error);
//       dispatch(getfarmbycustomeridFailed(error.message));
//     }
//   } catch (error) {
//     console.error("An error occurred while fetching user profile:", error);
//     dispatch(getfarmbycustomeridFailed(error.message));
//   }
// };


export const getfarmbycustomerid = () => async (dispatch) => {
  try {
    const getToken = await retrieveUserDetails();
    if (getToken && getToken.data.jwtToken) {
      const token = getToken.data.jwtToken;
      const customerIdd = getToken.data.user.userId;
      console.log(token, customerIdd);

      const response = await axios.get(`https://wifarmapi-production.up.railway.app/farm/getfarmbycustomerid?customerId=${customerIdd}`, {
        headers: {
          'jwtToken': token,
           "content-type": "application/json",

        }
      });

      dispatch(getfarmbycustomeridReceived(response.data));
    } else {
      const error = new Error("Unable to retrieve user customerId");
      console.error(error);
      dispatch(getfarmbycustomeridFailed(error.message));
    }
  } catch (error) {
    console.error("An error occurred while fetching user profile:", error);
    dispatch(getfarmbycustomeridFailed(error.message));
  }
};


export const getMarketData = () => async (dispatch) => {
  try {
    const getToken = await retrieveUserDetails();
    if (getToken && getToken.data.jwtToken) {
      const token = getToken.data.jwtToken;
      dispatch(
        apiCallBegan({
          url: "api/market/getallmarketcrops/",
          extraHeaders: { "jwtToken": token },
          method: "get",
          onStart: getMarketRequested.type,
          onSuccess: getMarketReceived.type,
          onError: getMarketRequestFailed.type,
        })
      );
    } else {
      const error = new Error("Unable to retrieve user token");
      console.error(error);
      dispatch(getMarketRequestFailed(error.message));
    }
  } catch (error) {
    console.error("An error occurred while fetching user profile:", error);
    dispatch(getMarketRequestFailed(error.message));
  }
};

export default marketplaceSlice.reducer;
