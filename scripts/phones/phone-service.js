import HttpService from '../http-service.js'


const PhoneService = {
    getPhones() {
        return HttpService.sendRequest('phones/phones.json');
    },

    getPhone(phoneId) {
        return HttpService.sendRequest(`phones/${phoneId}.json`);
    },

    _sortPhones(field) {
        return this.getPhones().then((phones) => {
            return phones.sort((a, b) => {
                return a[field] < b[field] ? -1 : 1;
            });
        });
    },

    _filterPhones(query) {
        return this.getPhones().then((phones) => {
            query = query.toLowerCase();

            return phones.filter(phone => {
                return phone.name.toLowerCase().indexOf(query) !== -1;
            });
        });
    }
};
export default PhoneService;