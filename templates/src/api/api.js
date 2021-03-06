import axios from 'axios';
import { Message  } from 'element-ui';
import VueRouter from 'vue-router'
import routes from '../routes'

axios.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded'};
axios.defaults.transformRequest=[function (data) {
    if(!data)
        data={};
    if(!data.oauth)
        data.oauth=localStorage.getItem('isautologin')?(localStorage.getItem("xtit_oauth") || ""):(sessionStorage.getItem("xtit_oauth") || "");
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}];
let base = 'http://xtp.xtits.cn/xtp-api';
let mesapi='http://ipmes.xtits.cn/ipmes-api';

export const getAllIcons =()=>{
    return [
        'fa fa-address-book',
        'fa fa-address-book-o',
        'fa fa-address-card',
        'fa fa-address-card-o',
        'fa fa-adjust',
        'fa fa-american-sign-language-interpreting',
        'fa fa-anchor',
        'fa fa-archive',
        'fa fa-area-chart',
        'fa fa-arrows',
        'fa fa-arrows-h',
        'fa fa-arrows-v',
        'fa fa-asl-interpreting',
        'fa fa-assistive-listening-systems',
        'fa fa-asterisk',
        'fa fa-at',
        'fa fa-audio-description',
        'fa fa-automobile',
        'fa fa-balance-scale',
        'fa fa-ban',
        'fa fa-bank',
        'fa fa-bar-chart',
        'fa fa-bar-chart-o',
        'fa fa-barcode',
        'fa fa-bars',
        'fa fa-bathtub',
        'fa fa-bath',
        'fa fa-beer',
        'fa fa-tag',
        'fa fa-user-o',
        'fa fa-user-o',
        'fa fa-thermometer-quarter',
        'fa fa-meetup',
        'fa fa-battery-full',
        'fa fa-video-camera',
        'fa fa-university',
        'fa fa-tv',
        'fa fa-tree',
        'fa fa-suitcase',
        'fa fa-trophy',
        'fa fa-umbrella',
        'fa fa-sticky-note',
        'fa fa-wifi',
        'fa fa-user-secret',
        'fa fa-tachometer',
        'fa fa-sliders',
        'fa fa-ship',
        'fa fa-shield',
        'fa fa-shopping-bag',
        'fa fa-server',
        'fa fa-share-alt-square',
        'fa fa-phone-square',
        'fa fa-mortar-board',
        'fa fa-paw',
        'fa fa-object-ungroup',
        'fa fa-map-marker',
        'fa fa-map-signs',
        'fa fa-legal',
        'fa fa-language',
        'fa fa-line-chart',
        'fa fa-industry',
        'fa fa-hotel',
        'fa fa-book',
        'fa fa-bookmark',
        'fa fa-braille',
        'fa fa-bug',
        'fa fa-calculator',
        'fa fa-calendar',
        'fa fa-camera',
        'fa fa-camera-retro',
        'fa fa-cart-plus',
        'fa fa-clock-o',
        'fa fa-coffee',
        'fa fa-cog',
        'fa fa-cogs',
        'fa fa-cloud',
        'fa fa-code-fork',
        'fa fa-comments',
        'fa fa-credit-card',
        'fa fa-database',
        'fa fa-edit',
        'fa fa-envelope',
        'fa fa-external-link',
        'fa fa-eyedropper',
        'fa fa-fax',
        'fa fa-eye',
        'fa fa-flag-checkered',
        'fa fa-fire',
        'fa fa-folder',
        'fa fa-flask',
        'fa fa-gamepad',
        'fa fa-gavel',
        'fa fa-graduation-cap',
        'fa fa-heartbeat',
        'fa fa-hdd-o',
        'fa fa-pie-chart',
        'fa fa-power-off',
        'fa fa-qrcode',
        'fa fa-random',
        'fa fa-road',
        'fa fa-recycle',
        'fa fa-shopping-basket',
        'fa fa-sitemap',
        'fa fa-tags',
        'fa fa-tasks',
        'fa fa-tablet',
        'fa fa-ticket',
        'fa fa-television',
        'fa fa-terminal',
        'fa fa-university',
        'fa fa-users',
        'fa fa-warning',
        'fa fa-cny',
        'fa fa-dollar',
        'fa fa-delicious',
        'fa fa-usb',
        'fa fa-wechat',
        'fa fa-weibo',
        'fa fa-windows',
        'fa fa-hospital-o',
        'fa fa-medkit'
    ];
}
export const requestLogin = params => {return axios.post(`${mesapi}/user/loginUser`, params);};
export const getUserList=params=>{return axios.post(`${mesapi}/user/listUser`,params);}
export const addUserInfo=params=>{return axios.post(`${mesapi}/user/insertUser`,{data:JSON.stringify(params)});}
export const editUserInfo=params=>{return axios.post(`${mesapi}/user/updateUser`,{data:JSON.stringify(params)});}
export const deleteUserInfo=params=>{return axios.post(`${mesapi}/user/deleteUser`,params);}
export const getUserInfo=params=>{return axios.post(`${mesapi}/user/getUser`,params);}
export const editUserPassword=(params,oldpwd)=>{return axios.post(`${mesapi}/user/updateUserPassword`,{data:JSON.stringify(params),password:oldpwd});}
export const updateUserResetPassword=params=>{return axios.post(`${mesapi}/user/updateUserResetPassword`,params);}

export const getUserMenuList=params=>{return axios.post(`${base}/menu/listMenuByUserId`, params);};
export const getMenuList=params=>{return axios.post(`${base}/menu/listMenu`, params);};
export const addMenuInfo=params=>{return axios.post(`${base}/menu/insertMenu`,{data:JSON.stringify(params)});}
export const editMenuInfo=params=>{return axios.post(`${base}/menu/updateMenu`,{data:JSON.stringify(params)});}
export const deleteMenuInfo=params=>{return axios.post(`${base}/menu/deleteMenu`,params);}
export const updateUserMenu=params=>{return axios.post(`${base}/userMenu/updateUserMenu`,params);}
export const listUserMenu=params=>{return axios.post(`${base}/userMenu/listUserMenu`,params);}

export const getAppList=params=>{return axios.post(`${base}/app/listApp`,params);}
export const addAppInfo=params=>{return axios.post(`${base}/app/insertApp`,{data:JSON.stringify(params)});}
export const editAppInfo=params=>{return axios.post(`${base}/app/updateApp`,{data:JSON.stringify(params)});}
export const deleteAppInfo=params=>{return axios.post(`${base}/app/deleteApp`,params);}

export const getRoleList=params=>{return axios.post(`${base}/role/listRole`,params);}
export const addRoleInfo=params=>{return axios.post(`${base}/role/insertRole`,{data:JSON.stringify(params)});}
export const editRoleInfo=params=>{return axios.post(`${base}/role/updateRole`,{data:JSON.stringify(params)});}
export const deleteRoleInfo=params=>{return axios.post(`${base}/role/deleteRole`,params);}
export const updateRoleMenu=params=>{return axios.post(`${base}/roleMenu/updateRoleMenu`,params);}
export const getRoleMenuList=params=>{return axios.post(`${base}/roleMenu/listRoleMenu`,params);}
export const getUserRoleList=params=>{return axios.post(`${base}/roleUser/listRoleUser`,params);}
export const updateRoleUser=params=>{return axios.post(`${base}/roleUser/updateRoleUser`,params);}

/*
 系统配置*/
export const SystemConfigAPI={
    getSysConfigList(params){
        return axios.post(`${base}/sysConfig/listErrorCode`,params);
    }
}

const router = new VueRouter({
    routes
})
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        Message({
            showClose: true,
            message: '与服务器连接错误,请检查服务器并刷新页面',
            type: 'error',
            duration: 0
        });
        sessionStorage.clear();
        localStorage.clear();
        router.push('/login')
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

