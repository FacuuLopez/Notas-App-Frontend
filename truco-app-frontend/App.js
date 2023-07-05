import { useEffect } from "react";
import { UserProvider } from "./src/context/UserProvider";
import * as ScreenOrientation from "expo-screen-orientation";
import Note from "./src/pages/Note/Note.page";
import UserForm from "./src/pages/UserForm/UserForm.page";
import NoteForm from "./src/pages/NoteForm/NoteForm.page";
import Overview from "./src/pages/Overview/Overview.page";
import UserProfile from "./src/pages/UserProfile/UserProfile.page";
import EditUser from "./src/pages/EditUser/EditUser.page";
import EditNote from "./src/pages/EditNote/EditNote";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function unlockOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    unlockOrientation();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}
        >
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
          <Stack.Screen name="note" component={Note} />
          <Stack.Screen name="noteForm" component={NoteForm} />
          <Stack.Screen name="overview" component={Overview} />
          <Stack.Screen name="profile" component={UserProfile} />
          <Stack.Screen name="editUser" component={EditUser} />
          <Stack.Screen name="editNote" component={EditNote} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
