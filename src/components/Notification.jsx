const Notification = ({ message }) => (
    message ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-center text-sm">{message}</div> : null
  );
  export default Notification;