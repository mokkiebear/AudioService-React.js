import React from "react";

const Like = props => {
  let classes = " fa-heart clickable icon-button";
  if (!props.liked) classes = "far" + classes;
  else classes = "fas" + classes;

  return (
    <span>
      <i className={classes} style={{ color: "red" }} onClick={props.onClick} />
      <span style={{ marginLeft: "8px", fontWeight: "bold" }}>
        {props.audio.likes}
      </span>
    </span>
  );
};

export default Like;
