import { Application } from "@splinetool/runtime";
import { ref } from "vue";

export const user3dModel = () => {
  const ref3d = ref(null);

  const init3dModel = () => {
    let spline = new Application(ref3d.value);
    spline.load("https://fe-hmzs.itheima.net/scene.splinecode").then(() => {
      console.log("3D模型加载完毕");
    });
  };

  return {
    init3dModel,
  };
};
