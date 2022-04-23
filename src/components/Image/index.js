import "../Image/image.scss";

const Image = ({ height, width, src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      height={height || ""}
      width={width || ""}
      className={className}
      {...props}
    />
  );
};
export default Image;
