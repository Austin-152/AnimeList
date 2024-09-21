import { useEffect, useState } from 'react';

// 定义效果的URL
const effects = {
  snow: 'https://api.vvhan.com/api/script/snow',
  yinghua: 'https://api.vvhan.com/api/script/yinghua',
  bolang: 'https://api.vvhan.com/api/script/bolang',
  meihua: 'https://api.vvhan.com/api/script/meihua',
  denglong: 'https://api.vvhan.com/article/denglong.html',
};

// 纯随机选择一个效果
export function getRandomEffect(): string {
  const effectKeys = Object.keys(effects) as Array<keyof typeof effects>;
  const randomIndex = Math.floor(Math.random() * effectKeys.length);
  const randomEffectKey = effectKeys[randomIndex];
  return effects[randomEffectKey];
}

// 示例使用
export function Scene() {
  const [isEffectVisible, setIsEffectVisible] = useState(true); // 控制效果的显示状态

  useEffect(() => {
    const effectUrl = getRandomEffect(); // 获取随机效果 URL
    const script = document.createElement('script');
    script.src = effectUrl;
    script.async = true;
    document.body.appendChild(script);

    // 设置定时器，在 10 秒后移除效果
    const timer = setTimeout(() => {
      document.body.removeChild(script); // 移除脚本
      setIsEffectVisible(false); // 设置效果不可见
    }, 10); // 10秒后执行

    // 清理函数：组件卸载或重新渲染时执行，确保脚本被移除
    return () => {
      clearTimeout(timer); // 清除定时器
      if (document.body.contains(script)) {
        document.body.removeChild(script); // 移除脚本
      }
    };
  }, []);

  // 当效果不可见时，不再渲染任何内容
  if (!isEffectVisible) {
    return null;
  }

  return <div></div>;
}
