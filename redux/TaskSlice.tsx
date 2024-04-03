import {createSlice} from '@reduxjs/toolkit';
import {Alert, Keyboard} from 'react-native';

interface TaskState {
  taskTitle: string;
  taskItems: string[];
  currentIndex: number;
  isEditing: boolean;
}
const initialState: TaskState = {
  taskTitle: '',
  taskItems: [],
  currentIndex: 0,
  isEditing: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addingTask: (state, action) => {
      state.taskTitle = action.payload;
    },
    addTask: state => {
      if (
        state.taskTitle.trim() !== '' &&
        !state.taskItems.includes(state.taskTitle)
      ) {
        state.taskItems.push(state.taskTitle);
        state.taskTitle = '';
        Keyboard.dismiss();
      } else {
        Alert.alert('Error', "Task Already Added or Task can't be empty", [
          {text: 'Ok'},
        ]);
      }
    },
    deleteTask: (state, action) => {
      const indexToRemove = action.payload;
      state.taskItems.splice(indexToRemove, 1);
    },
    isEditingTask: (state, action) => {
      state.currentIndex = action.payload;
      state.taskTitle = state.taskItems[state.currentIndex];
      state.isEditing = true;
    },
    editingTask: (state, action) => {
      state.taskTitle = action.payload;
    },
    editTask: state => {
      if (state.taskTitle.trim() !== '') {
        state.taskItems[state.currentIndex] = state.taskTitle;
        state.isEditing = false;
        Keyboard.dismiss();
        state.taskTitle = '';
      }
    },
  },
});

export const {
  addingTask,
  addTask,
  deleteTask,
  editingTask,
  isEditingTask,
  editTask,
} = taskSlice.actions;
export default taskSlice.reducer;
