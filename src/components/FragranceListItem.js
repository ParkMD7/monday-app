import { useState } from "react";
import {
  TextField,
  ListItem,
  ListItemAvatar,
  Button,
  Modal,
} from "monday-ui-react-core";

const FragranceListItem = ({ fragrance, onDeleteFragrance, onUpdateFragrance }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(fragrance.name);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdateFragrance = () => {
    handleToggleModal();
    onUpdateFragrance(fragrance, name);
  };

  const handleDeleteFragrance = () => {
    onDeleteFragrance(fragrance.id);
  };

  const renderModal = () => {
    return (
      <Modal
        onClose={handleToggleModal}
        title={`Edit ${fragrance.name}`}
        show={showModal}
      >
        <TextField
          placeholder="Enter Name of the Fragrance"
          title="Name"
          onChange={setName}
          value={name}
        />

        <Button className="updateFragranceButton" onClick={handleUpdateFragrance}>
          Update Fragrance
        </Button>
      </Modal>
    );
  };

  return (
    <ListItem size={ListItem.sizes.LARGE} className="fragranceListItem">
      <ListItemAvatar
        src={fragrance.image_url}
        avatarClassName="fragranceItemListAvatar"
      />
      <div className="fragranceListItemContent">
        <span className="fragranceListItemName">{fragrance.name}</span>
        <span className="fragranceListItemDescription">{fragrance.description}</span>
        <span className="fragranceListItemCategory">
          Category: {fragrance.category}
        </span>
      </div>
      <div>
        <Button
          onClick={handleToggleModal}
          color={Button.colors.POSITIVE}
          style={{ margin: "0.5em" }}
          size={Button.sizes.MEDIUM}
          kind={Button.kinds.SECONDARY}
        >
          Edit
        </Button>
        <Button
          onClick={handleDeleteFragrance}
          color={Button.colors.NEGATIVE}
          style={{ margin: "0.5em" }}
          size={Button.sizes.MEDIUM}
        >
          Delete
        </Button>
      </div>
      {showModal && renderModal()}
    </ListItem>
  );
};

export default FragranceListItem;
