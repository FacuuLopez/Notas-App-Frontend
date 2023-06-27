import { useEffect } from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import { UserProvider } from "./src/context/UserProvider";
import * as ScreenOrientation from "expo-screen-orientation";
import Container from "./src/components/Container/Container.component";
import Note from "./src/pages/Note/Note.page";
import UserForm from "./src/pages/UserForm/UserForm.page";
import NoteForm from "./src/pages/NoteForm/NoteForm.page";
import Overview from "./src/pages/Overview/Overview.page";
import UserProfile from "./src/pages/UserProfile/UserProfile.page";
import EditUser from "./src/pages/EditUser/EditUser.page";
import EditNote from "./src/pages/EditNote/EditNote";

export default function App() {
  useEffect(() => {
    async function unlockOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    unlockOrientation();
  }, []);

  return (
    <NativeRouter>
      <UserProvider>
        <Routes>
          <Route path={"/"} element={<Container />}>
            <Route index element={<UserForm isRegister={true} />} />
            <Route path="login" element={<UserForm isRegister={false} />} />
            <Route path="register" element={<UserForm isRegister={true} />} />
            <Route path="overview" element={<Overview />} />
            <Route path="note" element={<Note />} />
            <Route path="createNote" element={<NoteForm />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="editUser" element={<EditUser />} />
            <Route path="editNote" element={<EditNote />} />
          </Route>
        </Routes>
      </UserProvider>
    </NativeRouter>
  );
}
