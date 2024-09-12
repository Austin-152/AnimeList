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
  const effectKeys = Object.keys(effects) as Array<keyof typeof effects>; // 使用类型断言来告诉 TypeScript 这些键是有效的
  const randomIndex = Math.floor(Math.random() * effectKeys.length); // 随机生成一个索引
  const randomEffectKey = effectKeys[randomIndex]; // 随机选择一个效果的键
  return effects[randomEffectKey]; // 返回对应的效果URL
}

// 示例使用
export function Scene() {
  const effectUrl = getRandomEffect();
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src={effectUrl}></script>
    </div>
  );
}
