// 定义效果的URL
const effects = {
  snow: 'https://api.vvhan.com/api/script/snow',
  yinghua: 'https://api.vvhan.com/api/script/yinghua',
  bolang: 'https://api.vvhan.com/api/script/bolang',
  meihua: 'https://api.vvhan.com/api/script/meihua',
  denglong: 'https://api.vvhan.com/article/denglong.html',
};

// 根据月份和日期来选择对应的效果
export function getEffectByDate(date: Date): string {
  const month = date.getMonth() + 1; // 获取月份 (1-12)
  const day = date.getDate(); // 获取日期 (1-31)

  // 根据月份和日期选择效果
  if (month === 12 || month === 1) {
    return effects.snow; // 冬季返回雪花效果
  } else if (month === 3 || month === 4) {
    return effects.yinghua; // 春季返回樱花效果
  } else if (month >= 6 && month <= 8) {
    return effects.bolang; // 夏季返回波浪效果
  } else if (month === 9 || month === 10) {
    return effects.meihua; // 秋季返回梅花效果
  } else if (month === 2 && day === 15) {
    return effects.denglong; // 特定日期返回灯笼效果
  } else {
    // 默认返回雪花效果
    return effects.snow;
  }
}

// 示例使用
export function Scene() {
    const effectUrl = getEffectByDate(new Date());
    return (
        <div>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={effectUrl}></script>
        </div>
    );
}
