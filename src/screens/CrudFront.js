import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CrudFront = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.pageTitle}>CrudAPI using Redux </Text>

      {/* User List Button */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => {
          navigation.navigate('Users');
        }}
      >
        <Text style={styles.buttonText}>User List</Text>
      </TouchableOpacity>

      {/* Add User Button */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddUser', { type: 'add' });
        }}
      >
        <Text style={styles.buttonText}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrudFront;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    width: width * 0.9, // Use a percentage of the screen width
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
