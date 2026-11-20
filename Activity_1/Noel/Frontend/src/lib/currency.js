export const formatPeso = (value) => new Intl.NumberFormat('en-PH', {
	style: 'currency',
	currency: 'PHP',
	maximumFractionDigits: 0,
}).format(Number(value) || 0);
