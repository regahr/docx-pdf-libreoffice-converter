export const formatCurrency = (amount) => `${new Intl.NumberFormat('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;

export default null;
