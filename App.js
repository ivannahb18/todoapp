import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Walk the dog', completed: false },
    { key: '3', description: 'Do laundry', completed: true },
  ]);

  const [inputText, setInputText] = useState('');

  const toggleTask = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (inputText.trim() === '') return;
    setTasks([...tasks, {
      key: Date.now().toString(),
      description: inputText,
      completed: false,
    }]);
    setInputText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity
        onPress={() => toggleTask(item.key)}
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={item.completed ? styles.taskTextDone : styles.taskText}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>✅</Text>
        <Text h3 style={styles.title}>My TODO App</Text>
        <Text style={styles.subtitle}>Stay on top of your day</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputRow}>
          <Input
            placeholder="Add a new task..."
            value={inputText}
            onChangeText={setInputText}
            containerStyle={{ flex: 1 }}
            inputStyle={{ color: '#333' }}
            placeholderTextColor="#aaa"
          />
          <Button
            title="Add"
            onPress={addTask}
            buttonStyle={styles.addButton}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </View>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 6,
  },
  title: {
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 45,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4f46e5',
    borderRadius: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTextDone: {
    fontSize: 16,
    color: '#aaa',
    flex: 1,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});