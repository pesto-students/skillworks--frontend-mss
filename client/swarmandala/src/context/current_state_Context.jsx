import { react, useContext, createContext, useState, useEffect } from "react";

export const Current_context = createContext(null);
const Current_state = (props) => {
  const [current_state, set_current_state] = useState({
    prahar: null,
    song_id: null,
  });
  const update_prahar = (prahar) => {
    set_current_state({ ...current_state, prahar: prahar });
  };
  const update_song_id = (new_id) => {
    set_current_state({ ...current_state, song_id: new_id });
  };
  return (
    <Current_context.Provider
      value={{ current_state, update_prahar, update_song_id }}
    >
      {props.children}
    </Current_context.Provider>
  );
};
export default Current_state;
