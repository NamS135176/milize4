export const renderUnit = (unit: string) => {
  switch (unit) {
    case '月払い':
      return unit.substring(0, 1);
    case '半年払い':
      return unit.substring(0, 2);
    case '年払い':
      return unit.substring(0, 1);
    case '一時金':
      return '一時払い';
  }
};
