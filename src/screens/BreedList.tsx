import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getBreedList, searchingBreed} from '../redux/reducers/breedReducers';
import CardCollapse from '../components/CardCollapse';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function BreedsList(): JSX.Element {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  const {list, loading, stopFetch} = useAppSelector(state => state.breeds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Alert.alert('called');
    dispatch(getBreedList({page, limit: 10}));
  }, [page]);

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator animating size="large" />;
    }
    return null;
  };

  const renderEmptyList = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="search" size={50} color="#ccc" />
        <Text style={{fontSize: 20, color: '#ccc', marginTop: 10}}>
          No results found
        </Text>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          paddingHorizontal: 10,
        }}>
        <Icon name="search" size={20} />
        <TextInput
          style={{flex: 1, marginLeft: 10}}
          placeholder="Search for a breed"
          onChangeText={text => {
            dispatch(searchingBreed({keyword: text}));
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setKeyword('');
            setPage(0);
          }}>
          <Icon name="close" size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        renderItem={({item}) => <CardCollapse item={item} />}
        onEndReached={() => {
          if (!stopFetch && list.length) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.id}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          marginTop: 10,
          paddingBottom: 200,
        }}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}
