type EndPoint = {
  method: string;
  url: string;
}

type EndPointMap = {
  [name: string]: EndPoint;
}

export const endPoints: EndPointMap = {
  'uploadToImgur': {
    method : 'POST',
    url : 'https://api.imgur.com/3/image'
  }
};