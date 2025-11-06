import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { avatarApi } from '../services/api';
import { Avatar } from '../types';
import AvatarCard from '../components/AvatarCard';

export default function HomeScreen() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvatars();
  }, []);

  const loadAvatars = async () => {
    try {
      setLoading(true);
      const data = await avatarApi.getAvatars();
      setAvatars(data);
    } catch (error) {
      console.error('Failed to load avatars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAvatar = () => {
    // In a real app, this would navigate to a create avatar screen
    console.log('Create Avatar button pressed');
    Alert.alert('Coming Soon', 'Create Avatar feature - Coming soon!');
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={avatars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AvatarCard avatar={item} onPress={() => console.log('Avatar pressed:', item.id)} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Avatars</Text>
            <Text style={styles.headerSubtitle}>
              {avatars.length} {avatars.length === 1 ? 'avatar' : 'avatars'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No avatars yet</Text>
            <Text style={styles.emptySubtext}>Create your first avatar to get started!</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAvatar}>
        <Text style={styles.createButtonText}>+ Create Avatar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
