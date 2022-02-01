import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import sampleFile from "../sample.json";

const SectionBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  paddingTop: 2,
  height: 120,
  padding: 0,
};

const SectionBoxSmall = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingTop: 2,
  maxWidth: 1000,
};

const ButtonBox = {
  padding: 4,
};

const Buttons = {
  minWidth: 110,
};

const TextFieldStyle = {
  minWidth: 500,
  display: "flex",
  flexDirection: "column",
};

const DisabledTextField = {
  minWidth: 750,
  display: "flex",
  flexDirection: "column",
};

const PageContainer = {
  backgroundColor: "#FFFFFF",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
};

const Home = () => {
  const text = sampleFile.sample;
  const [keywords, setKeywords] = useState("");
  const [inputFileText, setInputFileText] = useState(text);
  const [outputText, setOutputText] = useState(null);
  const [isKeywordError, setIsKeywordError] = useState(false);
  const [userEnteredText, setUserEnteredText] = useState("");

  const handleProcess = () => {
    console.log({ keywords, userEnteredText });
    const trimmedKeywords = keywords?.map((k) => k.trim()).filter((k) => k);

    console.log({ trimmedKeywords });
    if (trimmedKeywords && trimmedKeywords.length >= 1) {
      setIsKeywordError(false);
      const regex = new RegExp(trimmedKeywords?.join("|"), "gi");
      const censoredTextFile = inputFileText.replace(regex, "****");
      setOutputText(censoredTextFile);
    } else {
      setIsKeywordError(true);
    }
  };

  const uploadFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files?.[0], "utf-8");
    fileReader.onload = (e) => {
      setOutputText(null);
      setKeywords("");
      setInputFileText(e.target.result);
    };
  };

  const handleTextChange = (e) => {
    setUserEnteredText(e.target.value);
    const parsed = e.target.value.match(/\\?.|^$/g).reduce(
      (prev, curr) => {
        if (curr === '"') {
          prev.quote ^= 1;
        } else if (!prev.quote && curr === " ") {
          prev.a.push("");
        } else {
          prev.a[prev.a.length - 1] += curr.replace(/\\(.)/, "$1");
        }
        return prev;
      },
      { a: [""] }
    ).a;
    setKeywords(parsed);
  };

  return (
    <Box sx={{ ...PageContainer }}>
      <Box sx={{ ...SectionBox }}>
        <h1 style={{ color: "#5bc0be", fontFamily: "Roboto" }}>CIA Censoring</h1>
      </Box>

      <Box sx={{ ...SectionBox }}>
        <TextField
          variant="outlined"
          label="Enter words or phrases to censor and separate with commas"
          sx={{ ...TextFieldStyle }}
          helperText={isKeywordError ? "Please enter a valid alphabetical word(s) to censor" : ""}
          error={isKeywordError}
          onChange={handleTextChange}
          multiline
          size="small"
          value={userEnteredText}
        />
        <Box sx={{ ...ButtonBox }}>
          <Button sx={{ ...Buttons }} onClick={handleProcess} variant="contained" size="small">
            Process
          </Button>
        </Box>
      </Box>

      <Box sx={{ ...SectionBoxSmall }}>
        <TextField multiline sx={{ ...DisabledTextField }} disabled value={outputText ? outputText : inputFileText} />
      </Box>

      <Box sx={{ ...SectionBox }}>
        <Box sx={{ ...ButtonBox }}>
          <label htmlFor="contained-button-file">
            <input
              onChange={uploadFile}
              accept=".txt"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
            />
            <Button sx={{ ...Buttons }} variant="contained" component="span" size="small">
              Upload
            </Button>
          </label>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
