import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import route from 'can-route';
import dev from 'can-util/js/dev/dev';
import 'can-stache/helpers/route';
import loader from '@loader';
import 'can-stache-bindings';
import PageList from './types/PageList';
import renderBody from './templates/body.stache';
import header from './templates/header.stache';
import footer from './templates/footer.stache';
import error from './templates/error.stache';
import config from '../config/config';
import './styles.less';

window.route = route;


import '../config/base';

export const AppViewModel = DefineMap.extend('AppViewModel', {
    seal: false
}, {
    header: {
        serialize: false,
        value () {
            return header;
        }
    },
    error: {
        serialize: false,
        value () {
            return error;
        }
    },
    footer: {
        serialize: false,
        value () {
            return footer;
        }
    },
    routes: {
        serialize: false,
        Type: DefineList,
        value: ['{page}']
    },
    pages: {
        Type: PageList,
        serialize: false
    },
    pagePromise: {
        serialize: false,
        get () {
            const page = this.page;
            return new Promise((resolve, reject) => {
                const props = this.pages.byId(page);
                if (props.path) {
                    loader.import(props.path).then((module) => {
                        this.pageData = module.default;
                        if (this.pageData.debug) {
                            window.app = this;
                        }
                        resolve(module.default);
                    });
                } else {
                    dev.warn('app::page not in given pages array');
                    reject(new Error('Page not found'));
                }
            });
        }
    },
    page: {
        type: 'string',
        value: 'list',
        get (page) {
            return this.pages.isValid(page) ? page : this.defaultPage || this.pages[0].id;
        },
        serialize (page) {
            return page;
        }
    },
    pageData: {
        value: {},
        Type: DefineMap,
        serialize: false
    },
    defaultPage: {type: 'string', serialize: false},
    /**
     * initializes the application and renders it on a dom node
     * @param  {DomElement} domNode The dom node to render this application
     */
    startup (domNode) {
        if (typeof domNode === 'string') {
            domNode = document.querySelector(domNode);
            if (!domNode) {
                throw new Error('app::could not locate domnode');
            }
        }


        // init routes
        const routes = this.routes;
        if (routes.length) {
            route.data = this;
            routes.forEach((r) => {
                route(r);
            });
            route.ready();
        }
            
        domNode.appendChild(renderBody(this));
    }
});


// start up a new app
var app = new AppViewModel(config);
app.startup(document.getElementById('app'));

export default app;