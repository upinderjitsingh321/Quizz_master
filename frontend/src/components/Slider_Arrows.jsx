import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#000",
        fontSize: "30px",
        right: "-25px",
        position: "absolute",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#000",
        fontSize: "30px",
        left: "-25px",
        position: "absolute",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}
