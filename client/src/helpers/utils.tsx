export const getRandomRgb = (): string => {
    let rgbString = "";
    let arr: Array<string> = [];
    for(let i = 0; i < 3; i++){
        arr.push(Math.floor((Math.random() * 255)).toString());
    }
    
    rgbString = "rgb(" + arr.join(", ") + ")";
    return rgbString;
}

export const createDataSet = (data: any): object => {
    let labels = data?.labels ? Object.keys(data?.labels).map((value: string) => value) : null;
    const dataSet = data?.dataSet;

    let pricesArray: Array<object> = [];
    let toReturn:any = [];

    type CharDataSet = {
        label: string,
        data: object,
        fill: boolean,
        borderColor: string,
        tension: number,
    }

    let dataObj: CharDataSet = {
        label: "",
        data: [],
        fill: false,
        borderColor: "",
        tension: 0.1,
    };

    labels?.forEach((label: string) => {
        let temp = Object.keys(dataSet).map((val: any) => {
            if (dataSet[val]['competitor'] == label)
                return dataSet[val]['price'];
        });
        pricesArray.push(temp);
        temp = [];
    })

    pricesArray.forEach((value: object, key: number) => {
        if(labels && dataObj){
            dataObj.label = labels[key];
            dataObj.data = value;
            dataObj.borderColor = getRandomRgb();
        }
        toReturn.push(dataObj);
        dataObj = {
            label: "",
            data: [],
            fill: false,
            borderColor: "",
            tension: 0.1,
        }
    });

    return (new Object({
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
        datasets: toReturn
    }))
};

export const flattenObject = (obj: any) => {
    var toReturn:any = {};

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if ((typeof obj[i]) == 'object' && obj[i] !== null) {
            var flatObject:any = flattenObject(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
}