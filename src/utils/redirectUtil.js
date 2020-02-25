//@param o 调用者的指针 this；
//@param path 路径；
export const redirect = (o,path,blogId) => {
  let routeUrl = o.$router.resolve({
    path: path + `/${blogId}`,
  });
  window.open(routeUrl.href, '_blank');
}
