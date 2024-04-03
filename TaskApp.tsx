import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native';
import Task from './components/Task';
import {RootState} from './redux/store';

import {useDispatch, useSelector} from 'react-redux';
import {addTask, addingTask, editingTask, editTask} from './redux/TaskSlice';

interface Props {
  // Define props here
}

const TaskApp: React.FC<Props> = (
  {
    /* destructure props here */
  },
) => {
  const title = useSelector((state: RootState) => state.task.taskTitle);
  const tasks = useSelector((state: RootState) => state.task.taskItems);
  const isEditing = useSelector((state: RootState) => state.task.isEditing);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          <FlatList
            data={tasks}
            renderItem={ItemData => {
              return <Task task={ItemData.item} index={ItemData.index} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => <Text>No Tasks for Today</Text>}
          />
        </View>
      </View>

      <KeyboardAvoidingView behavior="height" style={styles.writeTaskWrapper}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            placeholder="Edit Task"
            onChangeText={text => dispatch(editingTask(text))}
            value={title}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Add Task"
            onChangeText={text => dispatch(addingTask(text))}
            value={title}
          />
        )}

        <Pressable
          onPress={() => {
            {
              isEditing ? dispatch(editTask()) : dispatch(addTask());
            }
          }}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TaskApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#55BCF6',
    opacity: 0.7,
  },
  items: {
    marginTop: 30,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#55BCF6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#C0C0C0',
    borderRadius: 25,
    elevation: 4,
  },
  addText: {color: 'white'},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    paddingHorizontal: 15,
    width: 250,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
    elevation: 4,
  },
});
