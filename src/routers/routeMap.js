import WordIndex from "../pages/word";
import Login from "../pages/user/login";
import PageNotFound from "../pages/layout/pageNotFound";
import {
    HomeOutlined,
    UnorderedListOutlined,
    PicLeftOutlined,
    PicRightOutlined,
    PicCenterOutlined,
    ProfileOutlined,
    GatewayOutlined
} from '@ant-design/icons';
import HomeIndex from "../pages/home";
import PrefixIndex from "../pages/prefix";
import SuffixIndex from "../pages/suffix";
import StemIndex from "../pages/stem";
import PartIndex from "../pages/part";
import PhraseIndex from "../pages/phrase";

export const authRouters = [
    {
        path: '/',
        component: HomeIndex,
        show: false,
        title: '首页',
        icon: HomeOutlined,
        exact: true
    },
    {
        path: '/home',
        component: HomeIndex,
        show: true,
        title: '首页',
        icon: HomeOutlined
    },
    {
        path: '/word',
        component: WordIndex,
        show: true,
        title: '单词管理',
        icon: UnorderedListOutlined
    },
    {
        path: '/phrase',
        component: PhraseIndex,
        show: true,
        title: '短语管理',
        icon: GatewayOutlined
    },
    {
        path: '/prefix',
        component: PrefixIndex,
        show: true,
        title: '前缀管理',
        icon: PicLeftOutlined
    },
    {
        path: '/suffix',
        component: SuffixIndex,
        show: true,
        title: '后缀管理',
        icon: PicRightOutlined
    },
    {
        path: '/stem',
        component: StemIndex,
        show: true,
        title: '词根管理',
        icon: PicCenterOutlined
    },
    {
        path: '/part',
        component: PartIndex,
        show: true,
        title: '词性管理',
        icon: ProfileOutlined
    }
]

export const commonRouters = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: PageNotFound
    }
]
