import { useState } from "react";
import Editor from "@monaco-editor/react";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import {
  Autocomplete,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Alert,
  AlertTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface Props {
  activeOption: string | null;
  setActiveOption: (option: string | null) => void;
  // setHasUnsavedChanges: (value: boolean) => void;
  onCancel: () => void;
}

const ImportClusters = ({
  activeOption,
  setActiveOption,
  // setHasUnsavedChanges,
  onCancel,
}: Props) => {
  const [fileType, setFileType] = useState<"yaml">("yaml");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { theme } = useContext(ThemeContext);
  const [option, setOption] = useState("")
  const [labels, setLabels] = useState<string[]>([]);
  //const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    clusterName: "",
    Region: "",
    value: "",
    node: "",
  });

  const handleFileUpload = async () => {
  };

  console.log(error);

  const handleCancel = () => {
    setSelectedFile(null); // Clear file selection
    setError("");          // Clear error messages
    setActiveOption(null);  // Close the modal
  };


  return (
    <Dialog open={!!activeOption} onClose={onCancel} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ color: theme === "dark" ? "white" : "black", bgcolor: theme === "dark" ? "#1F2937" : "background.paper" }}>Import Cluster</DialogTitle>
      <DialogContent sx={{ bgcolor: theme === "dark" ? "#1F2937" : "background.paper" }} >
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={activeOption}
            onChange={(_event, newValue) => setActiveOption(newValue)}
            sx={{
              ".Mui-selected": {
                backgroundColor: "#E3F2FD", // Light blue for selected tab
                borderRadius: "5px 5px 0 0",
              },
             }}             
          >
            <Tab sx={{ color: theme === "dark" ? "white" : "black" }} label="YAML paste" value="option1" />
            <Tab sx={{ color: theme === "dark" ? "white" : "black" }} label="Kubeconfig" value="option2" />
            <Tab sx={{ color: theme === "dark" ? "white" : "black" }} label="API/URL" value="option3" />
            <Tab sx={{ color: theme === "dark" ? "white" : "black" }} label="Manual" value="option4" />
          </Tabs>

          <Box
            sx={{
              mt: 2,
            }}
          >
            {activeOption === "option1" && (
              <Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Info</AlertTitle>
                  Paste a YAML file.
                </Alert>

                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}
                >
                  <InputLabel>File Type</InputLabel>
                  <Select
                    sx={{
                      bgcolor: theme === "dark" ? "#1F2937" : "background.paper",
                      color: theme === "dark" ? "white" : "black",
                    }}
                    value={fileType}
                    onChange={(e) => {
                      setFileType(e.target.value as "yaml");
                      setEditorContent(""); // Clear the editor content on file type change
                    }}
                    label="File Type"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: theme === "dark" ? "#1F2937" : "background.paper",
                        },
                      },
                    }}
                  >
                    <MenuItem sx={{ color: theme === "dark" ? "white" : "black" }} value="yaml">
                      YAML
                    </MenuItem>
                  </Select>
                </FormControl>


                <Editor
                  height="400px"
                  language={fileType}
                  value={editorContent}
                  theme={theme === "dark" ? "light" : "vs-dark"} // Switch themes dynamically
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                  onChange={(value) => setEditorContent(value || "")}
                />

                <DialogActions>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button
                    variant="contained"
                    disabled={!editorContent}
                    sx={{ boxShadow: 2 }}
                  >
                    Upload
                  </Button>
                </DialogActions>

              </Box>
            )}

            {activeOption === "option2" && (
              <Box sx={{ color: theme === "dark" ? "white" : "black" }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Info</AlertTitle>
                  Select a kubeconfig file to import cluster.
                </Alert>

                <Box sx={{ mt: 2, border: 2, borderColor: "grey.500", borderRadius: 1, p: 2 }}>
                  <Box
                    sx={{
                      border: 2,
                      borderColor: "grey.500",
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      p: 2,
                      textAlign: "center",
                    }}
                  >
                    <Button variant="contained" component="label"
                      sx={{ boxShadow: 2 }}>
                      Select Kubeconfig file
                      <input
                        type="file"
                        hidden
                        accept=".kube/config, .yaml,.yml"
                        onClick={(e) => (e.currentTarget.value = "")} // Ensure new file selection triggers event
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setSelectedFile(file);
                          // setHasUnsavedChanges(true);
                        }}
                      />
                    </Button>
                  </Box>
                  {selectedFile && (
                    <Box sx={{ mt: 2 }}>
                      Selected file: <strong>{selectedFile.name}</strong>
                    </Box>
                  )}
                </Box>

                <DialogActions>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={handleFileUpload}
                    disabled={!selectedFile}
                    sx={{ boxShadow: 2 }}
                  >
                    Upload & Import
                  </Button>
                </DialogActions>
              </Box>
            )}
            {activeOption === "option3" && (
              <Box
                className={theme === "dark" ? "bg-gray-800 text-white" : "text-black"}
                p={2}
                borderRadius={2}
              >
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Info</AlertTitle>
                  Enter API/URL to import cluster.
                </Alert>

                <TextField
                  fullWidth
                  label="API/URL"
                  value={formData.clusterName}
                  onChange={(e) =>
                    setFormData({ ...formData, clusterName: e.target.value })
                  }
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}
                />

                <DialogActions>
                  <Button onClick={handleCancel} sx={{ color: theme === "dark" ? "white" : "black" }}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ boxShadow: 2 }}>Import</Button>
                </DialogActions>
              </Box>
            )}
            {activeOption === "option4" && (
              <Box className={theme === "dark" ? "bg-gray-800 text-white" : "text-black"} p={2} borderRadius={2}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Info</AlertTitle>
                  Fill out the form to create a deployment.
                </Alert>
                <TextField
                  fullWidth
                  label="Cluster Name"
                  value={formData.clusterName}
                  onChange={(e) =>
                    setFormData({ ...formData, clusterName: e.target.value })
                  }
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}
                />
                <FormControl fullWidth
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}>
                  <InputLabel>Cluster Set</InputLabel>
                  <Select
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    label="Cluster Set"
                  >
                    <MenuItem value="option1">Cluster Set 1</MenuItem>
                    <MenuItem value="option2">Cluster Set 2</MenuItem>
                    <MenuItem value="option3">Cluster Set 3</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Number of Nodes"
                  value={formData.node}
                  onChange={(e) =>
                    setFormData({ ...formData, node: e.target.value })
                  }
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Region"
                  value={formData.clusterName}
                  onChange={(e) =>
                    setFormData({ ...formData, clusterName: e.target.value })
                  }
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]} // No predefined options, allows custom tags
                  value={labels}
                  onChange={(_, newValue) => setLabels(newValue)}
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => <TextField {...params} label="Labels" placeholder="Add Labels" />}
                  sx={{
                    mb: 2,
                    input: { color: theme === "dark" ? "white" : "black" },
                    label: { color: theme === "dark" ? "white" : "black" },
                    fieldset: {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme === "dark" ? "white" : "black",
                    },
                  }}
                />
                <DialogActions>
                  <Button onClick={handleCancel} sx={{ color: theme === "dark" ? "white" : "black" }}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ boxShadow: 2 }} >Import</Button>
                </DialogActions>
              </Box>
            )}

          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default ImportClusters;