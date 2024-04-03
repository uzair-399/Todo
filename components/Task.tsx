import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteTask, isEditingTask} from '../redux/TaskSlice';

interface Props {
  // Define props here
  task: string;
  index: number;
}

const Task: React.FC<Props> = ({
  task,
  index,
  /* destructure props here */
}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Pressable
          style={styles.square}
          onPress={() => dispatch(deleteTask(index))}></Pressable>
        <Text
          style={styles.itemText}
          onPress={() => dispatch(isEditingTask(index))}>
          {task}
        </Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

export default Task;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f2f2f2',
    elevation: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 18,
    height: 18,
    backgroundColor: '#55BCF6',
    borderRadius: 6,
    opacity: 0.6,
    marginRight: 10,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderRadius: 10,
    opacity: 0.6,
    borderWidth: 2,
  },
  itemText: {
    maxWidth: '80%',
  },
});
