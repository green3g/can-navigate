import 'can-admin/components/data-admin/data-admin';
import 'can-admin/app/crud.less';
import renderAdmin from '../templates/admin.stache';


export default {
    render: renderAdmin,
    // admin pages can have multiple views so we need
    // a method to get a admin view by id
    getAdminView (id) {
        return this.views.filter((view) => {
            return view.id === id;
        })[0] || this.views[0];
    }
};