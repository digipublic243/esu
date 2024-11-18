export type KeyValueObject = {
    [key: string]: string | number | boolean | object | any[] | object | any;
};

function isPlainObject(value: any): boolean {
    return typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Object]';
}

export function columnDisplayerAnalyser(data: KeyValueObject): { [key: string]: string } {
    let columns = Object.keys(data);
    const excludedColumn = ['updatedAt', 'updatedBy', 'createBy', 'meta', 'updateBy', 'sysUserId'];

    columns = columns.filter(column => !excludedColumn.includes(column));

    let columnToDisplay: { [key: string]: string } = {};

    columns.forEach(column => {
        if (column === 'childrens') {
            columnToDisplay['childrens'] = 'childrens';
            return;
        }

        const columnData = data[column];

        if (isPlainObject(columnData)) {
            if ('label' in columnData) {
                columnToDisplay[column] = `${column}.label`;
            }
            else if ('name' in columnData) {
                columnToDisplay[column] = `${column}.name`;
            }
            else if ('formatKey' in columnData) {
                columnToDisplay[column] = `${column}.formatKey`;
            }
            else {
                columnToDisplay[column] = column;
            }
        } else {
            columnToDisplay[column] = column;
        }
    });

    return columnToDisplay;
}
