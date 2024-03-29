import { List } from "monday-ui-react-core";

import FragranceListItem from "./FragranceListItem";

const FragranceList = ({ fragrances, onDeleteFragrance, onUpdateFragrance }) => {
  if (!fragrances || !fragrances.length) {
    return <div>No Fragrances Yet! Create One</div>;
  }
  return (
    <List className="fragranceList">
      {fragrances.map((fragrance) => (
        <FragranceListItem
          key={fragrance.id}
          fragrance={fragrance}
          onUpdateFragrance={onUpdateFragrance}
          onDeleteFragrance={onDeleteFragrance}
        />
      ))}
    </List>
  );
};

export default FragranceList;
