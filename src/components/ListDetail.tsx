import React from "react";

type ListDetailProps = {
  item: any;
};

const ListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: user
}) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
