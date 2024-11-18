export class Utils {

    // this method select record from string as path. Ex : path = "province.country.name" from object : {province: {country: {name: "DRC"}}}
    getValueByPath(obj: Record<string, any>, path: string): any {
        const keys = path.split('.');
        return keys.reduce((acc, key) => {
            if (acc && typeof acc === 'object' && key in acc) {
                return acc[key];
            }
            return undefined;
        }, obj);
    }

}