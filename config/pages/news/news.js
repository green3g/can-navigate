import admin from '../_admin';
import assign from 'can-util/js/assign/assign';

import Article from './Article';
import PersonBasic from './Person_Basic';
import PersonAdvanced from './Person_Advanced';


export default assign({
    views: [Article, PersonBasic, PersonAdvanced]
}, admin);
