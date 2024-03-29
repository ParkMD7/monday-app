import { useState } from "react";
import { Flex, TextField, Dropdown, Button } from "monday-ui-react-core";

import Loading from "./Loading";
import Error from "./Error";

const boardId = process.env.REACT_APP_BOARD_ID;

const OrderForm = ({ monday, fragranceOptions }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [fragrances, setfragrances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const options = fragranceOptions.map((fragrance) => {
    return {
      value: fragrance.name,
      label: fragrance.name,
      leftAvatar: fragrance.image_url,
    };
  });

  const canSubmitForm = firstName && lastName && quantity && !!fragrances.length;

  const handleCheckedFieldsOnBlur = () => {
    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const checkForSubmissionErrors = () => {
    if (parseInt(quantity) < 1) {
      return "Quantity must be at least 1";
    }

    if (fragrances.length !== 3) {
      return "Must select three fragrences";
    }
  };

  const handleResetFormValues = () => {
    setFirstName("");
    setLastName("");
    setQuantity("1");
    setfragrances([]);
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    const hasPreSubmitErrors = checkForSubmissionErrors();
    if (hasPreSubmitErrors) {
      setErrorMsg(hasPreSubmitErrors);
      return;
    }
    try {
      setLoading(true);

      const variables = {
        boardId: boardId,
        groupId: "topics",
        itemName: `Order for ${firstName} ${lastName}`,
        columnValues: JSON.stringify({
          text8: quantity,
          dropdown: {
            labels: [fragrances[0].label, fragrances[1].label, fragrances[2].label],
          },
        }),
      };

      const query = `mutation create_item ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) { 
        create_item (
            board_id: $boardId,
            group_id: $groupId,
            create_labels_if_missing: true,
            item_name: $itemName, 
            column_values: $columnValues
        ) 
        { 
            id
        } 
    }`;

      await monday.api(query, { variables });

      handleResetFormValues();
    } catch (e) {
      setErrorMsg("Error while creating order. Please reload and try again.");
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
    >
      <Flex
        className="orderFormInputsWrapper"
        direction={Flex.directions.ROW}
        align={Flex.align.START}
        gap={Flex.gaps.SMALL}
      >
        <TextField
          placeholder="Enter Customer First Name"
          title="First Name"
          onChange={setFirstName}
          value={firstName}
        />
        <TextField
          placeholder="Enter Customer Last Name"
          title="Last Name"
          onChange={setLastName}
          value={lastName}
        />
        <TextField
          placeholder="1"
          title="Quantity"
          type="NUMBER"
          onChange={setQuantity}
          onBlur={handleCheckedFieldsOnBlur}
          value={quantity}
        />
      </Flex>
      <Dropdown
        placeholder="Select Three Fragrences"
        options={options}
        multi
        multiline
        className="formDropdown"
        onChange={setfragrances}
        value={fragrances}
        onBlur={handleCheckedFieldsOnBlur}
      />
      {errorMsg && <Error message={errorMsg} />}
      <Button
        className="submitButton"
        style={{ textAlign: "left" }}
        onClick={handleSubmit}
        disabled={!canSubmitForm}
      >
        Start Order
      </Button>
    </Flex>
  );
};

export default OrderForm;
