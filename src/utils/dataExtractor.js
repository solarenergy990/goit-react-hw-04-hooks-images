const dataExtractor = (pictures) => {
  //   console.log(pictures);
  return pictures.map(
    ({
      id: imageId,
      webformatURL: smallImg,
      largeImageURL: largeImg,
      tags: imgTag,
    }) => ({
      imageId,
      smallImg,
      largeImg,
      imgTag,
    })
  );
};

export default dataExtractor;
