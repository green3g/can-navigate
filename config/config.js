export default {
    routes: [
        '{page}',
        '{page}/{view}/{section}',
        '{page}/{view}/{section}/{id}'
    ],
    page: 'home',
    pages: [{
        path: 'can-navigate/config/pages/home/home',
        title: 'Home',
        iconClass: 'fa fa-home',
        id: 'home'
    }, {
        path: 'can-navigate/config/pages/news/news',
        title: 'News Manager',
        iconClass: 'fa fa-news',
        id: 'news'
    }]
};