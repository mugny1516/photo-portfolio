export type Photo = {
  id: string;
  img: Image;
  takenAt: string;
};

type Image = {
  url: string;
  height: string;
  width: string;
};
