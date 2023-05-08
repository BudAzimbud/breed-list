import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
// Define a type for the slice state
interface IBreed {
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
}

// Define the initial state using that type
const initialState: IBreedInitialState = {
  list: [],
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
      const breedListResponse = await axios.get(
        `https://api.thecatapi.com/v1/breeds?limit=${args.limit}&page=${args.page}`,
      );
      const breedListPromiseAll = await breedListResponse.data.map(
        async (item: any) => {
          //get image
          const image = await axios.get(
            'https://api.thecatapi.com/v1/images/' + item.reference_image_id,
          );
          return {...item, image: image.data.url};
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBreedList.fulfilled, (state, action) => {
      console.log('payload', action.payload);
      state.list = action.payload;
    });
  },
});

export const {} = breedslice.actions;

export default breedslice.reducer;
