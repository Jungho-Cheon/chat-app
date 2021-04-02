export const calcTimeAgo = (insertDate: string): string => {
  const now = Date.now();
  const messageDate = Date.parse(insertDate) - 9 * 1000 * 60 * 60;
  const interval = now - messageDate;
  const units = {
    일: 1000 * 60 * 60 * 24,
    시간: 1000 * 60 * 60,
    분: 1000 * 60,
    초: 1000,
  };
  let ret = '';
  Object.entries(units).forEach(([unit, div]) => {
    if (!ret && Math.floor(interval / div) > 0) {
      ret = Math.floor(interval / div).toString() + unit + '전';
    }
  });
  if (!ret) return '방금전';
  return ret;
};

export const getCurrentDate = (): string =>
  new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString();
