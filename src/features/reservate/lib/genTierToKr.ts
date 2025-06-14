export const genTierToKr = (tier: string) => {
  switch (tier) {
    case 'bronze':
      return '브론즈';
    case 'silver':
      return '실버';
    case 'gold':
      return '골드';
    case 'platinum':
      return '플래티넘';
    case 'diamond':
      return '다이아몬드';
    case 'ascendant':
      return '초월자';
    case 'immortal':
      return '불멸';
    case 'radiant':
      return '레디언트';
    default:
      return '언랭';
  }
};
