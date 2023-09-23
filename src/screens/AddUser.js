import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {addUser, updateUser} from '../redux/UserSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const AddUser = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Define a validation schema using Yup
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    avatar: Yup.string().required('Avatar URL is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  // Set initial values based on route.params.data or empty strings
  const initialValues = {
    first_name:
      route.params.type === 'edit' ? route.params.data.first_name : '',
    last_name: route.params.type === 'edit' ? route.params.data.last_name : '',
    avatar: route.params.type === 'edit' ? route.params.data.avatar : '',
    email: route.params.type === 'edit' ? route.params.data.email : '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        if (route.params.type === 'edit') {
          // Dispatch update action if editing
          dispatch(
            updateUser({
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              index: route.params.index,
            }),
          );
          Alert.alert('Success', 'User updated successfully');
        } else {
          // Dispatch add action if adding
          dispatch(addUser(values));

          Alert.alert('Success', 'User added successfully');
        }

        navigation.goBack();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Enter first Name"
            value={values.first_name}
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            style={styles.inputStyle}
          />
          {/* Display error messages for first_name if touched */}
          {touched.first_name && errors.first_name && (
            <Text style={{color: 'red'}}>{errors.first_name}</Text>
          )}

          <TextInput
            placeholder="Enter last Name"
            value={values.last_name}
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            style={styles.inputStyle}
          />
          {/* Display error messages for last_name if touched */}
          {touched.last_name && errors.last_name && (
            <Text style={{color: 'red'}}>{errors.last_name}</Text>
          )}

          <TextInput
            placeholder="Enter Avatar Url"
            value={values.avatar}
            onChangeText={handleChange('avatar')}
            onBlur={handleBlur('avatar')}
            style={styles.inputStyle}
          />
          {/* Display error messages for avatar if touched */}
          {touched.avatar && errors.avatar && (
            <Text style={{color: 'red'}}>{errors.avatar}</Text>
          )}
          <TextInput
            placeholder="Enter User Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={styles.inputStyle}
            keyboardType="email-address"
          />
          {/* Display error messages for email if touched */}
          {touched.email && errors.email && (
            <Text style={{color: 'red'}}>{errors.email}</Text>
          )}

          <TouchableOpacity style={styles.addUserStyle} onPress={handleSubmit}>
            <Text style={{color: 'white'}}>Save User</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  inputStyle: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  addUserStyle: {
    width: '90%',
    height: 50,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});
