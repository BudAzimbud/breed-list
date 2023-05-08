import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getBreedImageApi, getBreedListApi} from '../../services/breedService';
// Define a type for the slice state
export class IBreed {
  id: string;
  name: string;
  origin: string;
  description: string;
  tempramental: string;
  image: string;
  countryCode: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
}
interface IBreedInitialState {
  list: IBreed[];
  loading: boolean;
  stopFetch: boolean;
}

// Define the initial state using that type
const initialState: IBreedInitialState = {
  list: [],
  loading: false,
  stopFetch: false,
};

interface IParamsGetBreed {
  limit: number;
  page: number;
}

export const getBreedList = createAsyncThunk(
  'getBreedList',
  async (args: IParamsGetBreed, thunkAPI): Promise<any> => {
    try {
      //list bread
      const breedListResponse = await getBreedListApi(args);
      const breedListPromiseAll = await breedListResponse.data.map(
        async (item: any) => {
          let image = {
            data: {url: 'https://cdn2.thecatapi.com/images/CDhOtM-Ig.jpg'},
          };
          //get image
          try {
            image = await getBreedImageApi(item.reference_image_id);
          } catch (error) {
            console.log(error);
          }

          return {...item, image: image?.data?.url};
        },
      );
      const result = await Promise.all(breedListPromiseAll);
      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const breedslice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    searchingBreed: (state, action: PayloadAction<string>) => {
      console.log(action);
      const find = state.list.filter(
        item => item.name.toLowerCase() === action.payload,
      );
      state.list = find;
    },
  },
  extraReducers: builder => {
    builder.addCase(getBreedList.fulfilled, (state, action) => {
      state.list.push(...action.payload);
      state.loading = false;
      state.stopFetch = action.payload.length === 0;
    });
    builder.addCase(getBreedList.pending, state => {
      state.loading = true;
    });
    builder.addCase(getBreedList.rejected, state => {
      state.loading = false;
    });
  },
});

export const {searchingBreed} = breedslice.actions;

export default breedslice.reducer;
