import {useState} from 'react';
import {IBreed} from '../redux/reducers/breedReducers';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class ItemProps {
  item: IBreed;
}
const CardCollapse = ({item}: ItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderCollapseIcon = () => {
    if (isCollapsed) {
      return <Icon name="chevron-down-outline" size={24} color="black" />;
    } else {
      return <Icon name="chevron-up-outline" size={24} color="black" />;
    }
  };

  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{uri: item.image}} />
      <TouchableOpacity style={styles.cardHeader} onPress={toggleCollapse}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {renderCollapseIcon()}
        </View>
      </TouchableOpacity>
      {!isCollapsed && (
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    height: 200,
    width: '100%',
  },
  cardHeader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CardCollapse;
