import { Loader } from "monday-ui-react-core";

const Loading = ({ message }) => {
  return (
    <div className="loader">
      <h2>{message}</h2>
      <Loader size={Loader.sizes.LARGE} />
    </div>
  );
};

export default Loading;
