import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "react-query";

export const useNotes = (hardcoded) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: () =>
      fetch(`localhost:9000/api/user/${user.userId}/note`)
        .then((res) => res.json())
        .then((json) => JSON.parse(json))
        .then((notes) =>
          notes.forEach((note) => {
            note.date = new Date(note.date);
          })
        ),
  });

  let notes = hardcoded
    ? [
        {
          title: "Mi primera nota",
          description:
            "Lorem culpa consectetur deserunt ut Lorem et ipsum dolore est. Sint dolor id fugiat laboris esse enim amet incididunt veniam minim amet ut irure proident. Nulla culpa laborum consequat consectetur dolore commodo reprehenderit consectetur fugiat exercitation aute mollit. Commodo in nostrud sit amet aliquip veniam laborum id aute. Quis dolore nostrud amet qui nostrud pariatur elit non sint reprehenderit eiusmod nulla elit. Cillum eiusmod Lorem laboris ex esse officia id nostrud nisi. Deserunt sint minim ad nulla sit.",
          img: "http://unsplash.it/512/384",
          date: new Date("6/23/2023"),
          userId: user.userId,
        },
        {
          title: "Mi segunda nota",
          description:
            "Lorem culpa consectetur deserunt ut Lorem et ipsum dolore est. Sint dolor id fugiat laboris esse enim amet incididunt veniam minim amet ut irure proident. Nulla culpa laborum consequat consectetur dolore commodo reprehenderit consectetur fugiat exercitation aute mollit. Commodo in nostrud sit amet aliquip veniam laborum id aute. Quis dolore nostrud amet qui nostrud pariatur elit non sint reprehenderit eiusmod nulla elit. Cillum eiusmod Lorem laboris ex esse officia id nostrud nisi. Deserunt sint minim ad nulla sit.",
          img: "http://unsplash.it/512/384",
          date: new Date("6/24/2023"),
          userId: user.userId,
        },
        {
          title: "Mi tercer nota",
          description:
            "Lorem culpa consectetur deserunt ut Lorem et ipsum dolore est. Sint dolor id fugiat laboris esse enim amet incididunt veniam minim amet ut irure proident. Nulla culpa laborum consequat consectetur dolore commodo reprehenderit consectetur fugiat exercitation aute mollit. Commodo in nostrud sit amet aliquip veniam laborum id aute. Quis dolore nostrud amet qui nostrud pariatur elit non sint reprehenderit eiusmod nulla elit. Cillum eiusmod Lorem laboris ex esse officia id nostrud nisi. Deserunt sint minim ad nulla sit.",
          img: "http://unsplash.it/512/384",
          date: new Date("6/25/2023"),
          userId: user.userId,
        },
      ]
    : data;

  const createNote = hardcoded
    ? {
        mutate: (note) => (notes = [...notes, note]),
      }
    : useMutation(
        (note) =>
          fetch(`localhost:9000/api/user/${user.userId}/note`, {
            method: "POST",
            body: JSON.stringify(note),
          }),
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["notes"] }),
        }
      );

  return { notes, createNote };
};
