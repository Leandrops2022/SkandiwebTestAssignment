import { errorMessage } from '../../Utils/messages.js';

export default function validateInput(obj) {
    const validations = {
        sku: /^[a-zA-Z0-9-]+$/,
        name: /^[a-zA-Z0-9- ]+$/,
        float: /^\d{1,6}(\.\d{1,2})?$/,
        int: /^\d{1,11}/
    };

    for (const key in obj) {
        switch (key) {
            case 'weight':
            case 'price':
                if (!validations.float.test(obj[key])) {
                    return { [key]: errorMessage.float };
                }
                break;
            case 'size':
            case 'height':
            case 'width':
            case 'length':
                if (!validations.int.test(obj[key])) {
                    return { [key]: errorMessage };
                }
                break;
            case 'name':
            case 'sku':
                if (!validations[key].test(obj[key])) {
                    return { [key]: errorMessage[key] };
                }
                break;
            default:
                return true;
        }
    }
}