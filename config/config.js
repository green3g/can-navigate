export default {
    routes: [
        '{page}',
        '{page}/{view}/{section}',
        '{page}/{view}/{section}/{objectId}'
    ],
    defaultPage: 'home',
    page: 'home',
    view: 'articles',
    section: 'list',
    objectId: '',
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