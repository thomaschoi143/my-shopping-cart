export const calculateTotal = (cart, currency) => {
    let total = 0;
    Object.keys(cart).forEach((name) => {
        total += cart[name].price * cart[name].quantity;
    });
    return getPriceDisplay(total, currency);
};

export const filterItems = (searchTerm, items) => {
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
};

const calculatePrice = (price, currency) => {
    switch(currency){
        case 'EUR':
            return price * 0.86;
        case 'CAD':
            return price * 1.33;
        default:
            return price;
    }
};

const getCurrencySymbol = (currency) => {
    switch(currency){
        case 'USD':
        case 'CAD':
            return '$';
        case 'EUR':
            return '€';
        default:
            return '';
    }
};

export const getPriceDisplay = (price, currency) => `${getCurrencySymbol(currency)}${calculatePrice(price, currency).toFixed(2)} ${currency}`;