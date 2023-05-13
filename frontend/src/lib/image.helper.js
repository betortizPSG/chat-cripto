export const getUrlImage = (path) => {
  if (path) {
    return `${process.env.REACT_APP_API}api/messenger/image/${path}`;
  }
 
  return "/image-default.png";
};
