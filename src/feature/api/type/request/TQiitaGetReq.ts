export type TGetReq = {
    perPage?: number; //１ページあたりの要素数(20~100,20)
    page?: number; //何ページ目か(1~100,1)
    query?: string;
  };