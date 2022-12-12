// react
import { useState } from "react";
// mui
import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { SProps } from "../mui/interfaces";
import { TG } from "../mui/Utils";
// components

const onChangeUpdateText =
  (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setter(newValue);
  };
/** Validate and send the url for retrieval
 *
 * 1. Validate
 * 1. Submit
 * 1. Reset form
 */
const urlSubmit = (
  text: string,
  textSetter: React.Dispatch<React.SetStateAction<string>>,
  errorSetter: React.Dispatch<React.SetStateAction<string>>
) => {
  let validatedInput = text;
  // validate
  if (!text.includes("soundcloud.com/")) {
    validatedInput = "https://soundcloud.com/" + validatedInput;
  }
  // submit
  // fetch(text);
  if (false) {
    errorSetter("Error with url" + validatedInput);
    return;
  }
  // reset form
  textSetter("");
  errorSetter("");
};
/** Input field for song URL */
const SongInput: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [errorInput, setErrorInput] = useState<string>("");

  return (
    <Box position="relative" flexDirection="column">
      <TextField
        variant="filled"
        placeholder="https://soundcloud.com/<artist>/<track-name>"
        value={textInput}
        onChange={onChangeUpdateText(setTextInput)}
        color="secondary"
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter")
            urlSubmit(textInput, setTextInput, setErrorInput);
        }}
        fullWidth
        error={errorInput !== ""}
        helperText={errorInput}
        label="Soundcloud Song URL/slug"
      />
      <Button
        variant="contained"
        fullWidth
        disableRipple
        onClick={() => urlSubmit(textInput, setTextInput, setErrorInput)}
      >
        Submit
      </Button>
    </Box>
  );
};

const InfoItem: React.FC<{ categoryInfo: InfoGroup }> = ({ categoryInfo }) => {
  return (
    <Stack direction="column">
      <TG sx={{}}>{categoryInfo.title}</TG>
      <Divider orientation="horizontal" />
      <TG sx={{}}>{categoryInfo.data}</TG>
    </Stack>
  );
};
interface InfoGroup {
  title: string;
  data: string;
}
const categoryMap = new Map<string, InfoGroup>(
  Object.entries({
    bpm: { title: "BPM", data: "" },
    length: { title: "Length", data: "" },
    origGenre: { title: "Original Genre", data: "" },
    newGenre: { title: "New Genre", data: "" },
    releaseDt: { title: "Release Date", data: "" },
  })
);
const SongInfo: React.FC = () => {
  // create the list of elements
  const categoryElems: React.ReactElement<{ categoryInfo: InfoGroup }>[] = [];
  categoryMap.forEach((category, idx) => {
    categoryElems.push(<InfoItem categoryInfo={category} key={idx} />);
  });

  return (
    <Stack direction="row">
      <img id="img" src="" alt="" />
      <Stack direction="row" className="song-info">
        {categoryElems}
      </Stack>
    </Stack>
  );
};

const LoadedSong = () => {
  const songTitle = "";

  return (
    <Stack direction="column">
      <TG>{songTitle}</TG>
      <SongInfo />
      <Grid className="embed"></Grid>
    </Stack>
  );
};

/** Home: View component for home page
 */
const Home: React.FC<SProps> = () => {
  return (
    <Stack flexDirection="column" position="relative">
      <TG fontSize="50px" position="relative">
        Input a valid SoundCloud track URL/permalink
      </TG>
      <TG fontSize="20px" position="relative">
        i.e. "https://soundcloud.com/acct/song-name" or "acct/song-name"
      </TG>
      <SongInput />
      <LoadedSong />
    </Stack>
  );
};

export default Home;