import { login } from './modules/login';
import ChatList from '../qzui/views/ChatList.vue';
import ChatHome from '../qzui/views/ChatHome.vue';
import Home from '../qzui/views/Home.vue';
import Community from '../qzui/views/Community.vue';
import Chat from '../qzui/views/Chat.vue';
import FriendList from '../qzui/views/FriendList.vue';
import Friend from '../qzui/views/Friend.vue';
import GroupChat from '../qzui/views/GroupChat.vue';
import PublicSphereList from '../qzui/views/publicSphere/PublicList.vue';
import NameHeader from '../qzui/views/publicSphere/NameHeader.vue';
import SearchSphere from '../qzui/views/publicSphere/search.vue';
import Auth from '../qzui/views/publicSphere/Auth.vue';
import AuthorizationSet from '../qzui/views/publicSphere/AuthorizationSet.vue';
import ScanFocus from '../qzui/views/publicSphere/ScanFocus.vue';
import Help from '../qzui/views/Help.vue';
import AllQuestion from '../qzui/views/AllQuestion.vue';
import Feedback from '../qzui/views/Feedback.vue';
import TipOff from '../qzui/views/TipOff.vue';
import TipOffUser from '../qzui/views/TipoffUser.vue';
import FocusMe from '../qzui/views/FocusMe.vue';
import Posting from '../qzui/views/posting.vue';
import MyPublish from '../qzui/views/MyPublish.vue';
import Fans from '../qzui/views/Fans.vue';
import My from '../qzui/views/My.vue';
import EditUserInfo from '../qzui/views/my/EditInfo.vue';
import Know from '../qzui/views/Know.vue';
import UserInfo from '../qzui/views/UserInfo.vue';
import Calender from '../qzui/views/my/calender.vue';
import VoucherCenter from '../qzui/views/my/VoucherCenter.vue';
import Bill from '../qzui/views/my/Bill.vue';
import GroupSetting from '../qzui/views/groupSetting.vue';
import OtherInfo from '../qzui/views/OtherInfo.vue';
import SchoolAuth from '../qzui/views/schoolAuth.vue';
import IdAuth from '../qzui/views/IdAuth.vue';
import Settings from '../qzui/views/my/Settings.vue';

const routes = [
    ...login, // 登录
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: false,
            title: '首页',
        },
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
        meta: {
            requiresAuth: false,
            title: '聊天',
        },
    },
    {
        path: '/friendlist',
        name: 'FriendList',
        component: FriendList,
        meta: {
            requiresAuth: false,
            title: '好友列表',
        },
    },
    {
        path: '/chatList',
        name: 'chatList',
        component: ChatList,
        meta: {
            requiresAuth: false,
            title: '聊天室列表',
        },
    },
    {
        path: '/chatHome',
        name: 'chatHome',
        component: ChatHome,
        meta: {
            requiresAuth: false,
            title: '聊天室',
        },
    },
    {
        path: '/friend',
        name: 'Friend',
        component: Friend,
        meta: {
            requiresAuth: false,
            title: '朋友圈',
        },
    },
    {
        path: '/groupChat',
        name: 'GroupChat',
        component: GroupChat,
        meta: {
            requiresAuth: false,
            title: '发起群聊',
        },
    },
    {
        path: '/community',
        name: 'Community',
        component: Community,
        meta: {
            requiresAuth: false,
            title: '社区',
        },
    },
    {
        path: '/publicSphere/list',
        name: 'publicSphere',
        component: PublicSphereList,
        meta: {
            requiresAuth: false,
            title: '公域群',
        },
    },
    {
        path: '/publicSphere/nameHeader',
        name: 'nameHeader',
        component: NameHeader,
        meta: {
            requiresAuth: false,
            title: '名称和头像',
        },
    },
    {
        path: '/publicSphere/search',
        name: 'SearchSphere',
        component: SearchSphere,
        meta: {
            requiresAuth: false,
            title: '找人',
        },
    },
    {
        path: '/publicSphere/auth',
        name: 'publicSphereAuth',
        component: Auth,
        meta: {
            requiresAuth: false,
            title: '实名认证',
        },
    },
    {
        path: '/publicSphere/authorizationSet',
        name: 'authorizationSet',
        component: AuthorizationSet,
        meta: {
            requiresAuth: false,
            title: '实名认证',
        },
    },
    {
        path: '/publicSphere/scanFocus',
        name: 'scanFocus',
        component: ScanFocus,
        meta: {
            requiresAuth: false,
            title: '扫码关注',
        },
    },
    {
        path: '/help',
        name: 'help',
        component: Help,
        meta: {
            requiresAuth: false,
            title: '帮助和反馈',
        },
    },
    {
        path: '/allquestion',
        name: 'allquestion',
        component: AllQuestion,
        meta: {
            requiresAuth: false,
            title: '全部问题',
        },
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: Feedback,
        meta: {
            requiresAuth: false,
            title: '意见反馈',
        },
    },
    {
        path: '/tipoff',
        name: 'tipoff',
        component: TipOff,
        meta: {
            requiresAuth: false,
            title: '举报身份',
        },
    },
    {
        path: '/tipOffUser',
        name: 'TipOffUser',
        component: TipOffUser,
        meta: {
            requiresAuth: false,
            title: '举报用户',
        },
    },
    {
        path: '/focusme',
        name: 'focusme',
        component: FocusMe,
        meta: {
            requiresAuth: false,
            title: '关注我',
        },
    },
    {
        path: '/posting',
        name: 'posting',
        component: Posting,
        meta: {
            requiresAuth: false,
            title: '发帖',
        },
    },
    {
        path: '/myPublish',
        name: 'myPublish',
        component: MyPublish,
        meta: {
            requiresAuth: false,
            title: '我的发布',
        },
    },
    {
        path: '/fans',
        name: 'Fans',
        component: Fans,
        meta: {
            requiresAuth: false,
            title: '我的粉丝',
        },
    },
    {
        path: '/know',
        name: 'know',
        component: Know,
        meta: {
            requiresAuth: false,
            title: '可能认识的人',
        },
    },
    {
        path: '/my',
        name: 'My',
        component: My,
        meta: {
            requiresAuth: false,
            title: '我的',
        },
    },
    {
        path: '/my/calender',
        name: 'Calender',
        component: Calender,
        meta: {
            requiresAuth: false,
            title: '日历',
        },
    },

    {
        path: '/my/settings',
        name: 'mySettings',
        component: Settings,
        meta: {
            requiresAuth: false,
            title: '设置',
        },
    },
    {
        path: '/my/editUserInfo',
        name: 'EditUserInfo',
        component: EditUserInfo,
        meta: {
            requiresAuth: false,
            title: '编辑用户信息',
        },
    },
    {
        path: '/my/voucherCenter',
        name: 'VoucherCenter',
        component: VoucherCenter,
        meta: {
            requiresAuth: false,
            title: '充值',
        },
    },

    {
        path: '/my/bill',
        name: 'Bill',
        component: Bill,
        meta: {
            requiresAuth: false,
            title: '账单',
        },
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        component: UserInfo,
        meta: {
            requiresAuth: false,
            title: '用户信息',
        },
    },
    {
        path: '/otherInfo',
        name: 'OtherInfo',
        component: OtherInfo,
        meta: {
            requiresAuth: false,
            title: '他人信息',
        },
    },
    {
        path: '/groupSetting',
        name: 'GroupSetting',
        component: GroupSetting,
        meta: {
            requiresAuth: false,
            title: '群设置',
        },
    },
    {
        path: '/schoolAuth',
        name: 'SchoolAuth',
        component: SchoolAuth,
        meta: {
            requiresAuth: false,
            title: '学校认证',
        },
    },
    {
        path: '/idAuth',
        name: 'IdAuth',
        component: IdAuth,
        meta: {
            requiresAuth: false,
            title: '实名认证',
        },
    },
];

export default routes;
