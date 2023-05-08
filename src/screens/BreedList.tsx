import {Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getBreedList} from '../redux/reducers/breedReducers';
export default function BreadList(): JSX.Element {
  const {list} = useAppSelector(state => state.breeds);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBreedList({page: 0, limit: 10}));
  }, [dispatch]);
  console.log('selector ', list);
  return <Text>List</Text>;
}
