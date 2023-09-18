import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addUser, updateUser} from '../redux/UserSlice';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddUser = () => {
  const route = useRoute();
  const [first_name, setFirstName] = useState(
    route.params.type == 'edit' ? route.params.data.first_name : '',
  );
  const [last_name, setLastName] = useState(
    route.params.type == 'edit' ? route.params.data.last_name : '',
  );
  const [email, setEmail] = useState(
    route.params.type == 'edit' ? route.params.data.email : '',
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const validate = () => {
    let valid = true;
    if (first_name == '') {
      valid = false;
    }
    if (last_name == '') {
      valid = false;
    }
    if (email == '') {
      valid = false;
    }
    return valid;
  };
  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Enter first Name"
        value={first_name}
        onChangeText={txt => setFirstName(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderColor: 'black',
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 10,
          paddingLeft: 10,
        }}
      />
      <TextInput
        placeholder="Enter last Name"
        value={last_name}
        onChangeText={txt => setLastName(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderColor: 'black',
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 10,
          paddingLeft: 10,
        }}
      />
      <TextInput
        placeholder="Enter User Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={{
          width: '90%',
          height: 50,
          borderWidth: 1,
          borderColor: 'black',
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        keyboardType="email-address"
      />
      
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'blue',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          borderRadius: 10,
        }}
        onPress={() => {
          if (validate()) {
            if (route.params.type == 'edit') {
              dispatch(
                updateUser({
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  index: route.params.index,
                }),
              );
            } else {
              dispatch(addUser({first_name, last_name, email}));
            }

            navigation.goBack();
          } else {
            Alert.alert('Please Fill Correct Data');
          }
        }}>
        <Text style={{color: 'white'}}>Save User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUser;
