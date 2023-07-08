import { useState, useContext, useEffect } from "react";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import EventEmitter from "../services/EventEmitter";
import userContext from "../context/userContext";

export const useNotes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const { user } = useContext(userContext);

  const getNotesById = async (id) => {
    try {
      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const notes = JSON.parse(fileContent);

        const matchedNotes = notes.filter((note) => note.userId === id);

        setAllNotes(matchedNotes);
      } else {
        setAllNotes([]);
      }
    } catch (e) {
      console.log(e);
      setAllNotes([]);
    }
  };

  const createNote = async (data) => {
    const date = new Date();
    try {
      const note = {
        id: uuid.v4(),
        userId: user.id,
        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        img: `https://image.pollinations.ai/prompt/${data.title}`,
        ...data,
      };

      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      let notes = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        notes = JSON.parse(fileContent);
      }

      notes.push(note);

      const jsonString = JSON.stringify(notes);
      await FileSystem.writeAsStringAsync(filePath, jsonString);
      EventEmitter.emit("noteState");
    } catch (e) {
      console.log(e);
    }
  };

  const editNote = async (data, callback) => {
    try {
      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const notes = JSON.parse(fileContent);

        const updatedNotes = notes.map((n) => (n.id === data.id ? data : n));

        const jsonString = JSON.stringify(updatedNotes);
        await FileSystem.writeAsStringAsync(filePath, jsonString);

        EventEmitter.emit("noteState");
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNote = async (noteId, callback) => {
    try {
      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const notes = JSON.parse(fileContent);

        const newNotes = notes.filter((note) => note.id !== noteId);

        if (newNotes.length < notes.length) {
          const jsonString = JSON.stringify(newNotes);
          await FileSystem.writeAsStringAsync(filePath, jsonString);

          EventEmitter.emit("noteState");
          callback();
        } else {
          alert("No es posible eliminar la nota");
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    allNotes,
    getNotesById,
    createNote,
    editNote,
    deleteNote,
  };
};
