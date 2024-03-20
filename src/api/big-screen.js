import request from "../utils/request";

//园区大屏-查询楼宇概况 收入和产业信息
export function infoApi() {
  return request({
    url: "/park/statistics/info",
    method: "get",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjA0ZDAwYzRmLWJkYTgtNDlhNC04OTg3LWQzZGRhY2U2OWEwZSJ9.a1-nSNqFJFmYhk21T-PoiLVEUS3pvOuUVr_KnWwBHthuIKuIO03jLz_oEecwXuqCDZv7whruifM1O7rXM6zFvw",
    },
  });
}
