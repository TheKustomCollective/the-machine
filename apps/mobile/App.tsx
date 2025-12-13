import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// API Configuration
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiStatus {
  status: string;
  version: string;
  environment: string;
  timestamp: string;
}

export default function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApiStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/v1/status`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to API');
      console.error('Error fetching API status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiStatus();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🤖 The Machine</Text>
          <Text style={styles.subtitle}>AI Social Metaverse</Text>
        </View>

        {/* API Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Backend Status</Text>
          
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Connecting to server...</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchApiStatus}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && !error && apiStatus && (
            <View style={styles.statusContainer}>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Status:</Text>
                <View style={[styles.statusBadge, styles.statusBadgeSuccess]}>
                  <Text style={styles.statusBadgeText}>{apiStatus.status}</Text>
                </View>
              </View>
              
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Version:</Text>
                <Text style={styles.statusValue}>{apiStatus.version}</Text>
              </View>
              
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Environment:</Text>
                <Text style={styles.statusValue}>{apiStatus.environment}</Text>
              </View>
              
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>API URL:</Text>
                <Text style={styles.statusValue}>{API_URL}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Features Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Coming Soon</Text>
          
          <View style={styles.featuresList}>
            {[
              '👤 User Authentication',
              '📝 Social Feed',
              '👥 Follow System',
              '🤖 AI Features',
              '💬 Real-time Chat',
              '🎨 Custom Avatars'
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            The Machine v0.1.0
          </Text>
          <Text style={styles.footerSubtext}>
            AI Social Metaverse Platform
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  errorText: {
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statusContainer: {
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeSuccess: {
    backgroundColor: '#34c759',
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});
