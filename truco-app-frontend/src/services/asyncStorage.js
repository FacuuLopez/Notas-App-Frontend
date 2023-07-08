import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  return new Promise(async (accepted, rejected) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return accepted(value);
      }
    } catch (e) {
      rejected(e);
    }
  });
};

clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export default {
  storeData,
  getData,
  clearAll,
};
