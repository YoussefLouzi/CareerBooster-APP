import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../App'; // Assuming useAuth is exported from App.js
import { styles } from '../styles';

// Placeholder image - replace with actual user avatar logic
const PlaceholderAvatar = require('../assets/avatar.jpg');

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      {/* Top Section: Profile */}
      <View style={styles.drawerProfileSection}>
        {/* Replace with actual user avatar component */}
        {/* <Image source={user?.avatarUrl ? { uri: user.avatarUrl } : PlaceholderAvatar} style={styles.avatar} /> */}
        <View style={{marginLeft: 10}}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileStatus}>Active status</Text>
        </View>
      </View>

      {/* Middle Section: Drawer Items */}
      {/* Using DrawerItemList for default behavior, can be replaced with custom items if needed */}
      <DrawerItemList {...props} />

      {/* Bottom Section: Settings and Logout */}
      <View style={styles.drawerBottomSection}>
        <TouchableOpacity style={styles.drawerBottomItem} onPress={() => {
            // TODO: Navigate to Settings screen
            props.navigation.navigate('Settings');
            }}
        >
          <Icon name="settings-outline" size={22} style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerBottomItem} onPress={logout}>
          <Icon name="log-out-outline" size={22} style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
} 