import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser, fetchUsersAsync} from '../redux/UserSlice';

const Users = () => {
  const navigation = useNavigation();
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  console.log(users);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users.data}
        renderItem={({item, index}) => (
          <ScrollView>
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{uri: item.avatar}} // Use the avatar URL
                  style={styles.avatarImage}
                />
              </View>
              <View style={styles.userInfo}>
                <Text>{'Name: ' + item.first_name + ' ' + item.last_name}</Text>
                <Text>{'Email: ' + item.email}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    navigation.navigate('AddUser', {
                      type: 'edit',
                      data: item,
                      index: index,
                    });
                  }}>
                  <Text style={{color: 'white'}}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    dispatch(deleteUser(index));

                    Alert.alert('Success', 'User deleted successfully');
                  }}>
                  <Text style={{color: 'white'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.addUserButton}
        onPress={() => {
          navigation.navigate('AddUser', {type: 'add'});
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  addUserButton: {
    width: '90%',
    margin:20,
    height: 50,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
