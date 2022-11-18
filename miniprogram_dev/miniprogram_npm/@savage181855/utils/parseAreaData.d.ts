interface AreaData {
    province_list: {
        [index: string]: string;
    };
    city_list: {
        [index: string]: string;
    };
    county_list: {
        [index: string]: string;
    };
}
interface Item {
    value: string;
    label: string;
}
interface ProvinceOrCityItem extends Item {
    children: Item[];
}
/** 解析省市区列表数据，提供给uView组件使用 */
export declare function parseAreaListData(areaData: AreaData): ProvinceOrCityItem[];
export {};
