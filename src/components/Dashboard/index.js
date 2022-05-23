// Show all logged-in user posts and citations as well as other users.
// When user clicks on an IPFS title/link, it should take them to Reference page

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // run query to firebase to get all uploaded citations and make them clickable to reference (browse/:cid path)
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
