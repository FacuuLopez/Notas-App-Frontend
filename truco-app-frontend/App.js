import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userContext, { defaultUser } from "./src/context/userContext";
import * as ScreenOrientation from "expo-screen-orientation";
import Storage from "./src/services/asyncStorage";
import {
  Overview,
  Note,
  NoteForm,
  UserProfile,
  EditUser,
  EditNote,
  UserForm,
} from "./src/pages/index";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(defaultUser);

  async function unlockOrientation() {
    await ScreenOrientation.unlockAsync();
  }

  useEffect(() => {
    unlockOrientation();
    Storage.getData("authData")
      .then((data) => JSON.parse(data))
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (user.id) {
      Storage.storeData("authData", JSON.stringify(user));
    } else {
      Storage.clearAll();
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user.id ? (
            <>
              <Stack.Screen name="overview" component={Overview} />
              <Stack.Screen name="note" component={Note} />
              <Stack.Screen name="noteForm" component={NoteForm} />
              <Stack.Screen name="profile" component={UserProfile} />
              <Stack.Screen name="editUser" component={EditUser} />
              <Stack.Screen name="editNote" component={EditNote} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="login"
                component={UserForm}
                initialParams={{ isRegister: false }}
              />
              <Stack.Screen
                name="register"
                component={UserForm}
                initialParams={{ isRegister: true }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}
