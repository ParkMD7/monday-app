import { useState } from "react";
import { Flex, TextField, Button } from "monday-ui-react-core";

import Loading from "./Loading";
import Error from "./Error";

import { createFragrance } from "../api";

const FragranceForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleResetFormValues = () => {
    setName("");
    setDescription("");
    setCategory("");
    setImage("");
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fragrance = await createFragrance(name, description, category, image);
      handleResetFormValues();
      onSubmit(fragrance)
    } catch (e) {
      setErrorMsg("Error while creating fragrance. Please reload and try again.")
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Creating Order..." />;
  }
  return (
    <Flex
      wrap
      direction={Flex.directions.COLUMN}
      align={Flex.align.START}
      gap={Flex.gaps.MEDIUM}
      className="fragranceForm"
    >
      <TextField
        placeholder="Enter Name of the Fragrance"
        title="Name"
        onChange={setName}
        value={name}
      />
      <TextField
        placeholder="Enter Description of the Fragrance"
        title="Description"
        onChange={setDescription}
        value={description}
      />
      <TextField
        placeholder="Enter Category or Type of Fragrance"
        title="Category"
        onChange={setCategory}
        value={category}
      />
      <TextField
        placeholder="Add Image URL of Fragrance"
        title="Image"
        onChange={setImage}
        value={image}
      />
      {errorMsg && <Error message={errorMsg} />}
      <Button
        className="submitButton"
        style={{ textAlign: "left" }}
        onClick={handleSubmit}
      >
        Create Fragrance
      </Button>
    </Flex>
  );
};

export default FragranceForm;
