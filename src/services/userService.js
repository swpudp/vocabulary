import { httpPost } from '../tools/request';
import { setItem } from '../tools/storage';
import { message } from 'antd';

export function login(user) {
    httpPost('/api/User/Login', user).then(res => {
        if (!res.IsSuccess) {
            message.error(res.Message);
            return;
        }
        setItem("token", res.Data);
        window.location.href = '/home';
    });
}
