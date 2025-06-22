import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onSearch: (query: string) => void;
  onLocationPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  onSearch,
  onLocationPress,
  placeholder = "Enter city name" 
}: SearchBarProps) {
  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={value}
          onChangeText={onChange}
          onSubmitEditing={handleSearch}
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      {onLocationPress && (
        <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
          <Text style={styles.locationButtonText}>📍</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.medium,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    fontSize: fontSize.medium,
    color: colors.text,
  },
  searchButton: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    backgroundColor: colors.primary,
    borderTopRightRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,
  },
  searchButtonText: {
    fontSize: fontSize.medium,
  },
  locationButton: {
    marginLeft: spacing.small,
    padding: spacing.medium,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.medium,
  },
  locationButtonText: {
    fontSize: fontSize.medium,
  },
});