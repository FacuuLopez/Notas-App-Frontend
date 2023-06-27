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

  const note = {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhln4-ygosRcYC8XLmLPuh_bxZXFH8xpD48w&usqp=CAU",
    title: "Titulo de la nota",
    description: "Descripcion de la nota",
  };

  return (
    <NativeRouter>
      <UserProvider>
        <Routes>
          <Route path={"/"} element={<Container />}>
            <Route index element={<Note note={note} />} />
            <Route path="login" element={<UserForm isRegister={false} />} />
            <Route path="register" element={<UserForm isRegister={true} />} />
            <Route path="overview" element={<Overview />} />
            <Route path="note" element={<Note note={note} />} />
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
